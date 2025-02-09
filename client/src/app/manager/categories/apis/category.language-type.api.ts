import CategoryConstant from '~app/manager/categories/category.constant';
import useCategoryByOffsetQuery from '~app/manager/categories/apis/category.by-offset.api';

export default function useCategoryLanguageTypeQuery() {
  return useCategoryByOffsetQuery({
    request: {
      params: {
        root: {
          code: CategoryConstant.Code.LANGUAGE_TYPE,
        },
      },
    },
  });
}
