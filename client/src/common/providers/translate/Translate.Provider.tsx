import React, { useEffect, useMemo } from 'react';
import { ISentence } from '~app/manager/sentences/sentence.type';
import { ITranslate } from '~app/manager/translates/translate.type';
import { useCDispatch, useCSelector } from '~common/redux/hook';
import { LanguageActions, selectLanguage } from '~common/redux/language/language.slice';
import useCategoryLanguageTypeQuery from '~app/manager/categories/apis/category.language-type.api';
import useSentenceByOffsetQuery from '~app/manager/sentences/apis/sentence.by-offset.api';
import { IKComponentWithChildrenProps } from '~core/common/types/component.type';
import { TranslateContext } from './translate.context';
import KLoadingLayout from '~core/common/components/KLayout/KLoading.Layout';

type SentenceMappingType = Record<ITranslate['code'], ISentence['content']>;

const TranslateProvider: React.FC<IKComponentWithChildrenProps> = ({ children }) => {
  const language = useCSelector(selectLanguage);
  const dispatch = useCDispatch();

  const languageDefault = language?.items?.find(e => e.isDefault)?.code;

  const { data: categoryLanguageTypeData, isLoading: isCategoryLanguageTypeLoading } = useCategoryLanguageTypeQuery();
  const { data: sentenceCurrentByOffsetData, isLoading: isSentenceCurrentByOffsetLoading } = useSentenceByOffsetQuery({
    request: {
      params: {
        type: {
          code: language.current,
        },
      },
    },
    enabled: Boolean(language.current),
  });
  const { data: sentenceDefaultByOffsetData, isLoading: isSentenceDefaultByOffsetLoading } = useSentenceByOffsetQuery({
    request: {
      params: {
        type: {
          code: languageDefault,
        },
      },
    },
    enabled: Boolean(languageDefault),
  });

  const sentenceMapping = useMemo(() => {
    const listSentenceCurrent = sentenceCurrentByOffsetData?.result?.items;
    const getContent = (sentence: ISentence) => {
      return listSentenceCurrent?.find(e => e.root.code === sentence.root.code)?.content ?? sentence.content;
    };

    return sentenceDefaultByOffsetData?.result?.items
      .reduce((result, curr) => {
        return {
          ...result,
          [curr.root.code]: getContent(curr),
        };
      }, {} as SentenceMappingType);
  }, [sentenceDefaultByOffsetData, sentenceCurrentByOffsetData]);

  useEffect(() => {
    if (!categoryLanguageTypeData) return;

    dispatch(LanguageActions.setCurrent(categoryLanguageTypeData?.result?.items.find(language => language.isDefault)?.code));
    dispatch(LanguageActions.setItems(categoryLanguageTypeData?.result?.items ?? []));
  }, [categoryLanguageTypeData, dispatch]);

  return (
    <TranslateContext.Provider
      value={{
        translate: (code) => sentenceMapping?.[code] ?? code,
      }}
    >
      <KLoadingLayout
        isLoading={isSentenceCurrentByOffsetLoading || isCategoryLanguageTypeLoading || isSentenceDefaultByOffsetLoading}
        children={children} />
    </TranslateContext.Provider>
  );
};

export default TranslateProvider;
