import TranslateCode from '~common/providers/translate/translate.code';
import nameof from 'ts-nameof.macro';
import { ICategory } from '~app/manager/categories/category.type';
import { IKByOffsetTableProps } from '~core/by-offset/KByOffset.Table';
import { ColumnType } from 'antd/es/table';

interface IProps {
  translate: (code: string) => string;
  Action: ColumnType['render'];
}

function getCategoryTableColumns(props: IProps): IKByOffsetTableProps['columns'] {
  return [
    {
      title: props.translate(TranslateCode.Category.Name),
      dataIndex: nameof.full<ICategory>((e) => e.name),
      key: nameof.full<ICategory>((e) => e.name),
    },
    {
      key: 'action',
      fixed: 'right',
      width: 80,
      render: props.Action,
    },
  ]
}

export default getCategoryTableColumns;