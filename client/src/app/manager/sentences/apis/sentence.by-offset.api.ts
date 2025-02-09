import SentenceConstant from '~app/manager/sentences/sentence.constant';
import ApiUtil from '~common/utils/api.util';
import SentenceApi from '~app/manager/sentences/apis/sentence.api';
import useKByOffsetQuery, {
  IKByOffsetQueryProps,
} from '~core/by-offset/useKByOffsetQuery';
import {
  IKGetByOffsetApiRequest,
  IKByOffsetApiRequestParams,
} from '~core/by-offset/k-by-offset.api.type';
import { ISentence } from '~app/manager/sentences/sentence.type';
import { ICategory } from '~app/manager/categories/category.type';

interface IKSentenceByOffsetApiRequestParams
  extends IKByOffsetApiRequestParams {
  type: Partial<Pick<ICategory, 'code'>>;
}

interface IRequestSentenceByOffsetProps
  extends Omit<
    IKGetByOffsetApiRequest<ISentence, IKSentenceByOffsetApiRequestParams>,
    'url'
  > {}

function requestSentenceByOffset(props: IRequestSentenceByOffsetProps) {
  return ApiUtil.getByOffset({
    url: SentenceApi.genGetByOffset(),
    ...props,
  });
}

export interface ISentenceByOffsetQueryProps
  extends IKByOffsetQueryProps<ISentence> {
  request: IRequestSentenceByOffsetProps;
}

export default function useSentenceByOffsetQuery({
  request,
  ...props
}: Omit<ISentenceByOffsetQueryProps, 'queryKey' | 'queryFn'>) {
  return useKByOffsetQuery<ISentence>({
    queryKey: [SentenceConstant.QueryKey.ByOffset, request.params],
    queryFn: () => {
      return requestSentenceByOffset(request);
    },
    ...props,
  });
}
