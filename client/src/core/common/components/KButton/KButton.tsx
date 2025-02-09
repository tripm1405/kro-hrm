import React from 'react';
import { Button } from 'antd';
import { ButtonProps } from 'antd/es/button/button';

export interface IKButtonProps extends ButtonProps {}

const KButton: React.FC<IKButtonProps> = ({children, ...props}) => {
  return (
    <Button
      size={'small'}
      variant={'solid'}
      type="primary"
      color={'primary'}
      {...props}
    >
      {children}
    </Button>
  );
};

export default KButton;