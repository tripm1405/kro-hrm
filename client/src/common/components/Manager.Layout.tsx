import React, { useEffect } from 'react';
import KManagerLayout from '~core/common/components/KLayout/manager/KManager.Layout';
import { ItemType } from 'antd/es/menu/interface';
import { useNavigate } from 'react-router-dom';
import RouterPath from '~common/providers/router/router-path';
import TranslateCode from '~common/providers/translate/translate.code';
import LanguageButton from '~common/components/Language.Button';
import { useTranslateContext } from '~common/providers/translate/translate.context';

const ManagerLayout = () => {
  console.log('ManagerLayout');
  const navigate = useNavigate();
  const { translate } = useTranslateContext();

  useEffect(() => {
    console.log('navigate');
  }, [navigate]);

  const siderItems: ItemType[] = [
    {
      key: 'Category',
      label: translate(TranslateCode.Category.Sider_Label),
      onClick: () => navigate(RouterPath.Manager.genCategoryList()),
    },
    {
      key: 'Translate',
      label: translate(TranslateCode.Translate.Sider_Label),
      onClick: () => navigate(RouterPath.Manager.genTranslateList()),
    },
  ];

  return (
    <KManagerLayout
      logo={
        <img
          src={'/logo.png'}
          style={{ height: '100%', padding: 8, }}
          alt="logo"
        />
      }
      sider={{ items: siderItems }}
      language={<LanguageButton />}
    />
  );
};

export default ManagerLayout;