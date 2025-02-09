import React from 'react';
import KButton, { IKButtonProps } from '~core/common/components/KButton/KButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

interface IProps extends IKButtonProps {}

const KButtonSearch: React.FC<IProps> = ({ children, ...props }) => {
  return (
    <KButton icon={<FontAwesomeIcon icon={faMagnifyingGlass} />} {...props}>
      {children}
    </KButton>
  );
};

export default KButtonSearch;
