import React from 'react';
import { IKComponentWithChildrenProps } from '~core/common/types/component.type';

interface IProps extends IKComponentWithChildrenProps{
  isLoading: boolean;
}

const KLoadingLayout: React.FC<IProps> = ({ children, ...props }) => {
  if (props.isLoading) {
    return <>Loading...</>
  }

  return <>{children}</>;
};

export default KLoadingLayout;