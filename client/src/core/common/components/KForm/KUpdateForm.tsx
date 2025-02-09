import React, {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
} from 'react';
import { IKQueryProps, useKQuery } from '~core/common/hooks/useKQuery';
import KForm, { IKFormProps } from '~core/common/components/KForm/K.Form';
import { IKApiRequest, KApiMethod } from '~core/common/types/api/api.type';
import ApiUtil from '~common/utils/api.util';
import FormUtil from '~core/common/utils/form.util';
import { Form } from 'antd';

export interface IKUpdateFormRef<TData extends Record<string, any>> {
  data?: TData;
}

interface IQueryProps<TData extends Record<string, any>>
  extends Omit<IKQueryProps<TData>, 'queryFn'> {
  request: Pick<IKApiRequest, 'url'>;
}

export interface IKUpdateFormProps<TData extends Record<string, any>>
  extends IKFormProps<TData> {
  query: IQueryProps<TData>;
  formatGetValues?: (data: TData) => Record<string, any>;
  submit?: {
    api: string;
    formatValues?: (data: TData) => Record<string, any>;
    onSuccess?: (data: any) => void;
  };
}

const KUpdateForm = <TData extends Record<string, any>>(
  {
    children,
    query: { request, ...query },
    ...props
  }: IKUpdateFormProps<TData>,
  ref: ForwardedRef<IKUpdateFormRef<TData>>
) => {
  const [form] = Form.useForm<TData>(props?.form);
  const { data: res } = useKQuery<TData>({
    queryFn: () => {
      return ApiUtil.request(request);
    },
    ...query,
  });

  const submit = useCallback(
    async (values: TData) => {
      if (!props.submit) {
        return;
      }

      const formData = FormUtil.convertObjToFormData({
        data: props.submit?.formatValues?.(values) ?? values,
      });

      const res = await ApiUtil.request({
        method: KApiMethod.PUT,
        url: props.submit.api,
        data: formData,
      });

      if (!res?.success) {
        return;
      }

      props.submit?.onSuccess?.(res.result);
    },
    [props]
  );

  useEffect(() => {
    const data = res?.result ?? {};
    form?.setFieldsValue(
      props.formatGetValues ? props.formatGetValues(data as TData) : data
    );
  }, [form, props, res]);

  React.useImperativeHandle(
    ref,
    () => ({
      data: res?.result,
    }),
    [res]
  );

  return (
    <KForm<TData> form={form} onFinish={submit} {...props}>
      {children}
    </KForm>
  );
};

const KUpdateFormForwardRef = forwardRef(KUpdateForm) as <
  TData extends Record<string, any>,
>(
  props: IKUpdateFormProps<TData> & { ref?: React.Ref<IKUpdateFormRef<TData>> }
) => React.ReactElement;

export default KUpdateFormForwardRef;
