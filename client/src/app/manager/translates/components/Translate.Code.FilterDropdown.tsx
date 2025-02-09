import React from 'react';
import KTableFilterDropdown from '~core/common/components/KTable/KTable.FilterDropdown';
import { Input } from 'antd';
import { FilterDropdownProps } from 'antd/es/table/interface';

interface Props extends FilterDropdownProps {}

const TranslateCodeFilterDropdown: React.FC<Props> = (props) => {
  return (
    <KTableFilterDropdown
      {...props}
      onSubmit={() => {
        props.confirm();
        props.close();
      }}
    >
      <Input
        size={'small'}
        value={props.selectedKeys[0]}
        onChange={(e) =>
          props.setSelectedKeys(e.target.value ? [e.target.value] : [])
        }
      />
    </KTableFilterDropdown>
  );
};

export default TranslateCodeFilterDropdown;