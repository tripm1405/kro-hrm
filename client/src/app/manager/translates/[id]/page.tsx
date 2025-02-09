import React, { useMemo } from 'react';
import KPageLayout from '~core/common/components/KLayout/KPage.Layout';
import KUpdateForm from '~core/common/components/KForm/KUpdateForm';
import { Form, Input } from 'antd';
import nameof from 'ts-nameof.macro';
import { ITranslate } from '~app/manager/translates/translate.type';
import { ISentence } from '~app/manager/sentences/sentence.type';
import CategoryConstant from '~app/manager/categories/category.constant';
import TranslateConstant from '~app/manager/translates/translate.constant';
import TranslateApi from '~app/manager/translates/translate.api';
import RouterPath from '~common/providers/router/router-path';
import TranslateCode from '~common/providers/translate/translate.code';
import { useTranslateContext } from '~common/providers/translate/translate.context';
import useCategoryByOffsetQuery from '~app/manager/categories/apis/category.by-offset.api';
import useKParams from '~core/common/hooks/useKParams';
import { useNavigate } from 'react-router-dom';

const TranslateDetailPage = () => {
  const navigate = useNavigate();
  const { translate } = useTranslateContext();
  const { id } = useKParams<{ id: string }>({
    id: '',
  });

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

  if (isFetching) {
    return (
      <>Loading...</>
    )
  }

  return (
    <KPageLayout heading={<>{translate(TranslateCode.Translate.Detail_Heading)}</>}>
      <KUpdateForm<ITranslate>
        query={{
          queryKey: [TranslateConstant.QueryKey.DETAIL, id],
          request: {
            url: TranslateApi.genGetById(id),
          },
        }}
        formatGetValues={(data) => {
          const clone: ITranslate = structuredClone(data);
          clone.sentences = categories?.map(category => {
            const sentence = clone?.sentences?.find(sentence => sentence.typeId === category.id);

            return {
              ...sentence,
              typeId: category.id,
            } as ISentence;
          }) ?? [];
          return clone;
        }}
        submit={{
          api: TranslateApi.genUpdate(id),
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
      </KUpdateForm>
    </KPageLayout>
  );
};

export default TranslateDetailPage;