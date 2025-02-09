import React from 'react';
import { FilterDropdownProps } from 'antd/es/table/interface';
import { KButtonRefresh, KButtonSearch } from '~core/common/components/KButton';
import { IKComponentWithChildrenProps } from '~core/common/types/component.type';

export interface KTableFilterDropdownProps
  extends FilterDropdownProps,
    IKComponentWithChildrenProps {
  onSubmit: () => void;
}

const KTableFilterDropdown: React.FC<KTableFilterDropdownProps> = ({
  onSubmit,
  children,
  ...props
}) => {
  return (
    <div style={{ padding: 8 }}>
      <div>{children}</div>
      <div style={{ margin: '8px 0 0 0', display: 'flex', gap: 8 }}>
        <KButtonRefresh
          onClick={() => {
            props.clearFilters?.();
          }}
        />
        <KButtonSearch onClick={onSubmit} />
      </div>
    </div>
  );
};

export default KTableFilterDropdown;
