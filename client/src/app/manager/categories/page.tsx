import React from 'react';
import CategoryByOffsetTable from '~app/manager/categories/components/Category.ByOffsetTable';
import KPageLayout from '~core/common/components/KLayout/KPage.Layout';
import TranslateCode from '~common/providers/translate/translate.code';
import { useTranslateContext } from '~common/providers/translate/translate.context';

const CategoryListPage = () => {
  const { translate } = useTranslateContext();

  return (
    <KPageLayout
      heading={<>{translate(TranslateCode.Category.List_Heading)}</>}
    >
      <CategoryByOffsetTable />
    </KPageLayout>
  );
};

export default CategoryListPage;
