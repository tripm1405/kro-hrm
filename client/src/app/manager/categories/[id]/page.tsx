import React, { useRef } from 'react';
import { Divider, Form, Input, Switch } from 'antd';
import nameof from 'ts-nameof.macro';
import CategoryByOffsetTable from '~app/manager/categories/components/Category.ByOffsetTable';
import { ICategory } from '~app/manager/categories/category.type';
import KUpdateForm, {
  IKUpdateFormProps,
  IKUpdateFormRef,
} from '~core/common/components/KForm/KUpdateForm';
import CategoryConstant from '~app/manager/categories/category.constant';
import CategoryApi from '~app/manager/categories/apis/category.api';
import KPageLayout from '~core/common/components/KLayout/KPage.Layout';
import TranslateCode from '~common/providers/translate/translate.code';
import { useTranslateContext } from '~common/providers/translate/translate.context';
import useKParams from '~core/common/hooks/useKParams';
import RouterPath from '~common/providers/router/router-path';
import { useNavigate } from 'react-router-dom';

const CategoryDetailPage = () => {
  const navigate = useNavigate();
  const { translate } = useTranslateContext();
  const { id } = useKParams<{ id: string }>({
    id: '',
  });
  const formRef = useRef<IKUpdateFormRef<ICategory>>(null);

  const submitProps: IKUpdateFormProps<ICategory>['submit'] = {
    api: CategoryApi.genPatchUpdate(id),
    onSuccess: () => {
      const rootId = formRef.current?.data?.rootId;
      navigate(
        rootId
          ? RouterPath.Manager.genCategoryDetail(rootId)
          : RouterPath.Manager.genCategoryList()
      );
    },
  };

  return (
    <KPageLayout
      heading={<>{translate(TranslateCode.Category.Detail_Heading)}</>}
    >
      <KUpdateForm<ICategory>
        ref={formRef}
        query={{
          queryKey: [CategoryConstant.QueryKey.DETAIL, id],
          request: {
            url: CategoryApi.genGetById(id),
          },
        }}
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
      </KUpdateForm>
      <Divider orientation="left">
        {translate(TranslateCode.Category.List_Heading)}
      </Divider>
      <CategoryByOffsetTable
        createParams={{ rootId: id }}
        requestParams={{ rootId: id }}
      />
    </KPageLayout>
  );
};

export default CategoryDetailPage;
