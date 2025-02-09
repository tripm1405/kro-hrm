import React, { useState } from 'react';
import { Flex } from 'antd';
import useKByOffsetQuery, {
  IKByOffsetQueryProps,
} from '~core/by-offset/useKByOffsetQuery';
import ApiUtil from '~common/utils/api.util';
import KTable, { IKTableProps } from '~core/common/components/KTable/KTable';
import { SorterResult } from 'antd/es/table/interface';
import { IKIdEntity } from '~core/common/types/entity.type';
import {
  IKByOffsetApiRequestFilterParams,
  IKByOffsetApiRequestFilterParamsType,
  IKByOffsetApiRequestOrderByParamsType,
  IKByOffsetApiRequestParams,
  IKGetByOffsetApiRequest,
} from '~core/by-offset/k-by-offset.api.type';

interface IQueryProps<TData>
  extends Omit<IKByOffsetQueryProps<TData>, 'queryFn'> {
  request: IKGetByOffsetApiRequest<TData>;
}

export interface IKByOffsetTableProps<TData extends IKIdEntity = IKIdEntity>
  extends IKTableProps {
  initParams?: IKByOffsetApiRequestParams;
  sourceKey?: (item: TData) => any;
  ListTopAction?: React.ReactNode[];
  query: IQueryProps<TData>;
}

const KByOffsetTable = <TData extends IKIdEntity>({
  initParams,
  sourceKey,
  ListTopAction,
  query: { queryKey, request, ...query },
  columns,
  ...props
}: IKByOffsetTableProps<TData>) => {
  const [params, setParams] = useState<IKByOffsetApiRequestParams>({
    page: 1,
    size: 10,
    ...initParams,
  });

  const { data: res } = useKByOffsetQuery<TData>({
    queryKey: [
      ...queryKey,
      {
        ...request?.params,
        ...params,
      },
    ],
    queryFn: () =>
      ApiUtil.getByOffset({
        ...request,
        params: {
          ...request.params,
          ...params,
        },
      }),
    ...query,
  });

  return (
    <div>
      {ListTopAction && (
        <Flex
          gap={'small'}
          style={{
            flexDirection: 'row-reverse',
            margin: '8px 0',
          }}
        >
          {ListTopAction.map((Action, index) => (
            <React.Fragment key={index}>
              {Action}
            </React.Fragment>
          ))}
        </Flex>
      )}

      <KTable
        style={{ width: '100%' }}
        dataSource={res?.result?.items.map((item) => {
          return {
            ...item,
            key: sourceKey?.(item) ?? item.id,
          };
        })}
        pagination={{
          size: 'small',
          current: res?.result?.page,
          pageSize: res?.result?.size,
          total: res?.result?.total,
        }}
        onPaginate={(props) => {
          setParams({
            ...params,
            page: props.current,
            size: props.pageSize,
          });
        }}
        onSort={(props) => {
          type SorterResultType = SorterResult<TData> & {
            order: 'descend' | 'ascend';
          };

          setParams({
            ...params,
            sort: props
              ?.reduce((result, curr) => {
                return curr.order
                  ? [...result, curr as SorterResultType]
                  : result;
              }, [] as SorterResultType[])
              ?.sort((e1, e2) => {
                return (
                  ((e1?.column?.sorter as { multiple: number })?.multiple ??
                    0) -
                  ((e2?.column?.sorter as { multiple: number })?.multiple ?? 0)
                );
              })
              ?.map((e) => {
                return {
                  property: String(e.field),
                  type: ((order) => {
                    switch (order) {
                      case 'ascend':
                        return IKByOffsetApiRequestOrderByParamsType.Ascending;
                      default:
                      case 'descend':
                        return IKByOffsetApiRequestOrderByParamsType.Descending;
                    }
                  })(e.order),
                };
              }),
          });
        }}
        onFilter={(props) => {
          setParams({
            ...params,
            listFilter: Object.keys(props).map((key) => {
              return {
                property: key,
                type: IKByOffsetApiRequestFilterParamsType.In_Str_AllWithOrder,
                data: String(props[key]?.[0]).trim().split(/\s+/),
              } as IKByOffsetApiRequestFilterParams;
            }),
          });
        }}
        columns={columns?.map((column, index) => {
          if (column.key === 'action') return column;
          return {
            sorter: {
              multiple: index,
            },
            ...column,
          };
        })}
        {...props}
      />
    </div>
  );
};

export default KByOffsetTable;
