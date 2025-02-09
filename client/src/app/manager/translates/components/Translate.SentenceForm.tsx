import React, { useCallback, useMemo } from 'react';
import { Form, Input } from 'antd';
import nameof from 'ts-nameof.macro';
import { ISentence } from '~app/manager/sentences/sentence.type';
import useCategoryByOffsetQuery from '~app/manager/categories/apis/category.by-offset.api';
import CategoryConstant from '~app/manager/categories/category.constant';
import ApiUtil from '~common/utils/api.util';
import { KApiMethod } from '~core/common/types/api/api.type';
import SentenceApi from '~app/manager/sentences/apis/sentence.api';
import KLoadingLayout from '~core/common/components/KLayout/KLoading.Layout';
import FormUtil from '~core/common/utils/form.util';

interface Props extends ISentence {}

const TranslateSentenceForm: React.FC<Props> = (props) => {
  const [form] = Form.useForm();

  const { data: categoriesRes, isFetching } =
    useCategoryByOffsetQuery({
      request: {
        params: {
          root: {
            code: CategoryConstant.Code.LANGUAGE_TYPE,
          },
        },
      },
    });

  const categories = useMemo(
    () => categoriesRes?.result?.items,
    [categoriesRes]
  );

  const submit = useCallback(async (values: ISentence) => {
    await ApiUtil.request({
      method: KApiMethod.PUT,
      url: SentenceApi.genUpdate(props.id),
      data: FormUtil.convertObjToFormData({
        data: values,
      }),
    });
  }, [props.id]);

  return (
    <KLoadingLayout isLoading={isFetching}>
      <Form form={form} onFinish={submit} initialValues={props}>
        <Form.Item
          name={nameof.full<ISentence>((e) => e.content)}
          label={<>{categories?.find((e) => e.id === props.typeId)?.name}</>}
        >
          <Input
            onBlur={() => {
              form?.submit();
            }}
          />
        </Form.Item>
      </Form>
    </KLoadingLayout>
  );
};

export default TranslateSentenceForm;
