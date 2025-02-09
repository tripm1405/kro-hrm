import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import ApiUtil from '~common/utils/api.util';
import { Flex } from 'antd';
import KByOffsetTable from '~core/by-offset/KByOffset.Table';
import TranslateApi from '~app/manager/translates/translate.api';
import TranslateConstant from '~app/manager/translates/translate.constant';
import { ITranslate } from '~app/manager/translates/translate.type';
import KPageLayout from '~core/common/components/KLayout/KPage.Layout';
import RouterPath from '~common/providers/router/router-path';
import { useTranslateContext } from '~common/providers/translate/translate.context';
import TranslateCode from '~common/providers/translate/translate.code';
import nameof from 'ts-nameof.macro';
import { KApiMethod } from '~core/common/types/api/api.type';
import TranslateExpandRow from '~app/manager/translates/components/Translate.ExpandRow';
import {
  KButtonCreate,
  KButtonDelete,
  KButtonDetail,
} from '~core/common/components/KButton';
import TranslateCodeFilterDropdown from '~app/manager/translates/components/Translate.Code.FilterDropdown';

const TranslateListPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { translate } = useTranslateContext();

  const del = useCallback(
    async (id: string) => {
      const res = await ApiUtil.request({
        method: KApiMethod.DELETE,
        url: TranslateApi.genDel(id),
      });

      if (!res?.success) {
        return;
      }

      await queryClient.invalidateQueries({
        queryKey: [TranslateConstant.QueryKey.BY_OFFSET],
      });
    },
    [queryClient]
  );

  return (
    <KPageLayout
      heading={<>{translate(TranslateCode.Translate.List_Heading)}</>}
    >
      <KByOffsetTable<ITranslate>
        ListTopAction={[
          <KButtonCreate
            onClick={() => {
              navigate(RouterPath.Manager.genTranslateCreate());
            }}
          />
        ]}
        query={{
          queryKey: [TranslateConstant.QueryKey.BY_OFFSET],
          request: {
            url: TranslateApi.genGetByOffset(),
          },
        }}
        columns={[
          {
            title: translate(TranslateCode.Translate.Code),
            dataIndex: nameof<ITranslate>((e) => e.code),
            key: nameof<ITranslate>((e) => e.code),
            filterDropdown: TranslateCodeFilterDropdown,
          },
          {
            key: 'action',
            fixed: 'right',
            width: 80,
            render: (value) => (
              <Flex gap="small">
                <KButtonDetail
                  onClick={async () => {
                    navigate(RouterPath.Manager.genTranslateDetail(value.id));
                  }}
                />
                <KButtonDelete
                  onClick={async () => {
                    await del(value.id);
                  }}
                />
              </Flex>
            ),
          },
        ]}
        expandable={{
          expandedRowRender: (record) => {
            return <TranslateExpandRow id={record.id} />;
          },
        }}
      />
    </KPageLayout>
  );
};

export default TranslateListPage;
