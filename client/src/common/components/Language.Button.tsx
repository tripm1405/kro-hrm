import React from 'react';
import { faLanguage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Dropdown } from 'antd';
import { useCDispatch, useCSelector } from '~common/redux/hook';
import { LanguageActions, selectLanguage } from '~common/redux/language/language.slice';

const LanguageButton = () => {
  const language = useCSelector(selectLanguage);
  const dispatch = useCDispatch();

  return (
    <Dropdown
      trigger={['click']}
      menu={{
        items: language.items.map(language => {
          return {
            key: language.code,
            label: language.name,
          };
        }),
        onClick: (item) => {
          dispatch(LanguageActions.setCurrent(item.key));
        },
        selectedKeys: language.current ? [language.current] : [],
      }}
    >
      <Button
        icon={<FontAwesomeIcon icon={faLanguage} color={'white'} />}
        type={'text'}
      />
    </Dropdown>
  );
};

export default LanguageButton;
