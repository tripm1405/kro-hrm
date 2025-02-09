import { lazy } from 'react';

const CategoryListPage = lazy(
  () => import('~app/manager/categories/page')
);
const CategoryCreatePage = lazy(
  () => import('~app/manager/categories/create/page')
);
const CategoryDetailPage = lazy(() => import('~app/manager/categories/[id]/page'));

const TranslateListPage = lazy(
  () => import('~app/manager/translates/page')
);
const TranslateCreatePage = lazy(
  () => import('~app/manager/translates/create/page')
);
const TranslateDetailPage = lazy(() => import('~app/manager/translates/[id]/page'));

const NotFound = lazy(() => import('~core/common/pages/NotFound'));

const elements = {
  CategoryListPage: CategoryListPage,
  CategoryCreatePage: CategoryCreatePage,
  CategoryDetailPage: CategoryDetailPage,
  TranslateListPage: TranslateListPage,
  TranslateCreatePage: TranslateCreatePage,
  TranslateDetailPage: TranslateDetailPage,
  NotFound: NotFound,
};

export default elements;