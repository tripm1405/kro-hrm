import React, { useCallback } from 'react';
import KForm from '~core/common/components/KForm/K.Form';
import { Form, FormProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import FormUtil from '~core/common/utils/form.util';
import ApiUtil from '~common/utils/api.util';
import { KApiMethod } from '~core/common/types/api/api.type';

export interface IKCreateFormProps<TData> extends FormProps {
  formatGetValues?: (data: TData) => Record<string, any>;
  submit?: {
    api: string;
    formatValues?: (data: TData) => TData;
    onSuccess?: (data: any) => void;
  };
  children?: React.ReactNode;
}

const KCreateForm = <TData extends Record<string, any>>({
  children,
  ...props
}: IKCreateFormProps<TData>) => {
  const [form] = Form.useForm<TData>(props?.form);

  const submit = useCallback(
    async (values: TData) => {
      if (!props.submit) {
        return;
      }

      const formData = FormUtil.convertObjToFormData({
        data: props.submit?.formatValues?.(values) ?? values,
      });

      const res = await ApiUtil.request({
        method: KApiMethod.POST,
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

  return (
    <KForm form={form} onFinish={submit} {...props}>
      {children}
    </KForm>
  );
};

export default KCreateForm;
