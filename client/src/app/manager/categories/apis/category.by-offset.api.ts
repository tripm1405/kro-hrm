import { ICategory } from '~app/manager/categories/category.type';
import CategoryConstant from '~app/manager/categories/category.constant';
import ApiUtil from '~common/utils/api.util';
import CategoryApi from '~app/manager/categories/apis/category.api';
import useKByOffsetQuery, { IKByOffsetQueryProps } from '~core/by-offset/useKByOffsetQuery';
import {
  IKGetByOffsetApiRequest,
  IKByOffsetApiRequestParams,
} from '~core/by-offset/k-by-offset.api.type';

interface IKCategoryByOffsetApiRequestParams
  extends IKByOffsetApiRequestParams {
  root: {
    code: keyof typeof CategoryConstant.Code;
  };
}

interface IRequestCategoryByOffsetProps
  extends Omit<
    IKGetByOffsetApiRequest<ICategory, IKCategoryByOffsetApiRequestParams>,
    'url'
  > {}

function requestCategoryByOffset(props: IRequestCategoryByOffsetProps) {
  return ApiUtil.getByOffset({
    url: CategoryApi.genGetByOffset(),
    ...props,
  });
}

export interface ICategoryByOffsetQueryProps
  extends IKByOffsetQueryProps<ICategory> {
  request: IRequestCategoryByOffsetProps;
}

export default function useCategoryByOffsetQuery({
  request,
  ...props
}: Omit<ICategoryByOffsetQueryProps, 'queryKey' | 'queryFn'>) {
  return useKByOffsetQuery<ICategory>({
    queryKey: [CategoryConstant.QueryKey.BY_OFFSET, request.params],
    queryFn: () => {
      return requestCategoryByOffset(request);
    },
    ...props,
  });
}
