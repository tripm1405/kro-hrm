import React, { Fragment } from 'react';
import { useKQuery } from '~core/common/hooks/useKQuery';
import { ITranslate } from '~app/manager/translates/translate.type';
import TranslateConstant from '~app/manager/translates/translate.constant';
import ApiUtil from '~common/utils/api.util';
import TranslateApi from '~app/manager/translates/translate.api';
import KLoadingLayout from '~core/common/components/KLayout/KLoading.Layout';
import TranslateSentenceForm from '~app/manager/translates/components/Translate.SentenceForm';

interface IProps {
  id: string;
}

const TranslateExpandRow: React.FC<IProps> = (props) => {
  const { data: res, isFetching } = useKQuery<ITranslate>({
    queryKey: [TranslateConstant.QueryKey.DETAIL, props.id],
    queryFn: () => {
      return ApiUtil.request({
        url: TranslateApi.genGetById(props.id),
      });
    },
  });

  return (
    <KLoadingLayout isLoading={isFetching}>
      {res?.result?.sentences?.map(sentence => {
        return (
          <Fragment key={sentence.id}>
            <TranslateSentenceForm {...sentence} />
          </Fragment>
        )
      })}
    </KLoadingLayout>
  );
};

export default TranslateExpandRow;