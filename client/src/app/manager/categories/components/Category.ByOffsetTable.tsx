import React, { useCallback } from 'react';
import { ICategory } from '~app/manager/categories/category.type';
import CategoryConstant from '~app/manager/categories/category.constant';
import CategoryApi from '~app/manager/categories/apis/category.api';
import { Flex } from 'antd';
import RouterPath from '~common/providers/router/router-path';
import KByOffsetTable from '~core/by-offset/KByOffset.Table';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import ApiUtil from '~common/utils/api.util';
import axios from 'axios';
import { IKByOffsetApiRequestParams } from '~core/by-offset/k-by-offset.api.type';
import { useTranslateContext } from '~common/providers/translate/translate.context';
import { KApiMethod } from '~core/common/types/api/api.type';
import {
  KButtonCreate,
  KButtonDelete,
  KButtonDetail,
} from '~core/common/components/KButton';
import getCategoryTableColumns from '~app/manager/categories/configs/category.table-columns';

interface IRequestParams
  extends IKByOffsetApiRequestParams,
    Pick<ICategory, 'rootId'> {}

interface IProps {
  createParams?: IRequestParams;
  requestParams?: IRequestParams;
}

const CategoryByOffsetTable: React.FC<IProps> = (props) => {
  const { translate } = useTranslateContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const del = useCallback(
    async (id: string) => {
      const res = await ApiUtil.request({
        method: KApiMethod.DELETE,
        url: CategoryApi.genDel(id),
      });

      if (!res?.success) {
        return;
      }

      await queryClient.invalidateQueries({
        queryKey: [CategoryConstant.QueryKey.BY_OFFSET],
      });
    },
    [queryClient]
  );

  return (
    <KByOffsetTable<ICategory>
      query={{
        queryKey: [CategoryConstant.QueryKey.BY_OFFSET],
        request: {
          url: CategoryApi.genGetByOffset(),
          params: props.requestParams,
        },
      }}
      ListTopAction={[
        <KButtonCreate
          onClick={() => {
            navigate(
              axios.getUri({
                url: RouterPath.Manager.genCategoryCreate(),
                params: props.createParams,
              }),
              {
                relative: 'path',
              }
            );
          }}
        />
      ]}
      columns={getCategoryTableColumns({
        translate: translate,
        Action: (value) => (
          <Flex gap="small">
            <KButtonDetail
              onClick={async () => {
                navigate(RouterPath.Manager.genCategoryDetail(value.id));
              }}
            />
            <KButtonDelete
              onClick={async () => {
                await del(value.id);
              }}
            />
          </Flex>
        )
      })}
    />
  );
};

export default CategoryByOffsetTable;
