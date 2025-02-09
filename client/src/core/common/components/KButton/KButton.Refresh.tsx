import React from 'react';
import KButton, { IKButtonProps } from '~core/common/components/KButton/KButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';

interface IProps extends IKButtonProps {}

const KButtonRefresh: React.FC<IProps> = ({ children, ...props }) => {
  return (
    <KButton icon={<FontAwesomeIcon icon={faRotateLeft} />} {...props}>
      {children}
    </KButton>
  );
};

export default KButtonRefresh;