import React from 'react';
import KButton, { IKButtonProps } from '~core/common/components/KButton/KButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';

interface IProps extends IKButtonProps {}

const KButtonDetail: React.FC<IProps> = ({ children, ...props }) => {
  return (
    <KButton icon={<FontAwesomeIcon icon={faArrowRightToBracket} />} {...props}>
      {children}
    </KButton>
  );
};

export default KButtonDetail;
