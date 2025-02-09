import React from 'react';
import KButton, { IKButtonProps } from '~core/common/components/KButton/KButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface IProps extends IKButtonProps {}

const KButtonCreate: React.FC<IProps> = ({ children, ...props }) => {
  return (
    <KButton
      style={{ background: 'green' }}
      icon={<FontAwesomeIcon icon={faPlus} color={'white'} />}
      {...props}
    >
      {children}
    </KButton>
  );
};

export default KButtonCreate;
