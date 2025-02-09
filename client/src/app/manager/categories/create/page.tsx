import React from 'react';
import { Form, Input, Switch } from 'antd';
import nameof from 'ts-nameof.macro';
import RouterPath from '~common/providers/router/router-path';
import { ICategory } from '~app/manager/categories/category.type';
import CategoryApi from '~app/manager/categories/apis/category.api';
import KPageLayout from '~core/common/components/KLayout/KPage.Layout';
import TranslateCode from '~common/providers/translate/translate.code';
import { useTranslateContext } from '~common/providers/translate/translate.context';
import KCreateForm, { IKCreateFormProps } from '~core/common/components/KForm/KCreate.Form';
import useKSearchParams from '~core/common/hooks/useKSearchParams';
import { useNavigate } from 'react-router-dom';

const CategoryCreatePage = () => {
  const navigate = useNavigate();
  const { translate } = useTranslateContext();
  const { searchParams } = useKSearchParams<{ rootId?: string }>();

  const submitProps: IKCreateFormProps<ICategory>['submit'] = {
    api: CategoryApi.genCreate(),
    formatValues: (values) => {
      return {
        ...values,
        rootId: searchParams.rootId,
      };
    },
    onSuccess: () => {
      navigate(searchParams.rootId
        ? RouterPath.Manager.genCategoryDetail(searchParams.rootId)
        : RouterPath.Manager.genCategoryList());
    },
  };

  return (
    <KPageLayout
      heading={<>{translate(TranslateCode.Category.Create_Heading)}</>}
    >
      <KCreateForm<ICategory>
        initialValues={
          {
            isDefault: false,
          } as ICategory
        }
        submit={submitProps}
      >
        <Form.Item
          name={nameof.full<ICategory>((e) => e.code)}
          label={<>{translate(TranslateCode.Category.Code)}</>}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={nameof.full<ICategory>((e) => e.name)}
          label={<>{translate(TranslateCode.Category.Name)}</>}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={nameof.full<ICategory>((e) => e.description)}
          label={<>{translate(TranslateCode.Category.Description)}</>}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={nameof.full<ICategory>((e) => e.isDefault)}
          label={<>{translate(TranslateCode.Category.IsDefault)}</>}
        >
          <Switch />
        </Form.Item>
      </KCreateForm>
    </KPageLayout>
  );
};

export default CategoryCreatePage;
