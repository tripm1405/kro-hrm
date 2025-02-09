import React from 'react';
import KButton, { IKButtonProps } from '~core/common/components/KButton/KButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

interface IProps extends IKButtonProps {}

const KButtonDelete: React.FC<IProps> = ({ children, ...props }) => {
  return (
    <KButton
      color={'danger'}
      icon={<FontAwesomeIcon icon={faTrash} />}
      {...props}
    >
      {children}
    </KButton>
  );
};

export default KButtonDelete;