import React, { useMemo } from 'react';
import KPageLayout from '~core/common/components/KLayout/KPage.Layout';
import { Form, Input } from 'antd';
import nameof from 'ts-nameof.macro';
import RouterPath from '~common/providers/router/router-path';
import TranslateApi from '~app/manager/translates/translate.api';
import { ITranslate } from '~app/manager/translates/translate.type';
import CategoryConstant from '~app/manager/categories/category.constant';
import { ISentence } from '~app/manager/sentences/sentence.type';
import KCreateForm from '~core/common/components/KForm/KCreate.Form';
import useCategoryByOffsetQuery from '~app/manager/categories/apis/category.by-offset.api';
import { useTranslateContext } from '~common/providers/translate/translate.context';
import TranslateCode from '~common/providers/translate/translate.code';
import KLoadingLayout from '~core/common/components/KLayout/KLoading.Layout';
import { useNavigate } from 'react-router-dom';

const TranslateCreatePage = () => {
  const navigate = useNavigate();
  const { translate } = useTranslateContext();

  const { data: categoriesRes, isFetching } = useCategoryByOffsetQuery({
    request: {
      params: {
        root: {
          code: CategoryConstant.Code.LANGUAGE_TYPE,
        }
      }
    }
  });

  const categories = useMemo(() => categoriesRes?.result?.items, [categoriesRes]);

  return (
    <KLoadingLayout isLoading={isFetching}>
      <KPageLayout heading={<>{translate(TranslateCode.Translate.Create_Heading)}</>}>
        <KCreateForm
          initialValues={{
            sentences: categories?.map(category => {
              return {
                typeId: category.id,
              };
            }),
          } as ITranslate}
          submit={{
            api: TranslateApi.genCreate(),
            formatValues: (values) => {
              return {
                ...values,
                sentences: values.sentences.filter((sentence: ISentence) => sentence.content),
              }
            },
            onSuccess: () => {
              navigate(RouterPath.Manager.genTranslateList());
            },
          }}
        >
          <Form.Item
            name={nameof.full<ITranslate>((e) => e.code)}
            label={<>{translate(TranslateCode.Translate.Code)}</>}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.List name={nameof.full<ITranslate>((e) => e.sentences)}>
            {(fields) => fields.map(field => (
              <Form.Item
                name={[field.name, nameof.full<ISentence>((e) => e.content)]}
                label={<>{categories?.[field.name].name}</>}
                key={categories?.[field.name].code}
              >
                <Input />
              </Form.Item>
            ))}
          </Form.List>
        </KCreateForm>
      </KPageLayout>
    </KLoadingLayout>
  );
};

export default TranslateCreatePage;