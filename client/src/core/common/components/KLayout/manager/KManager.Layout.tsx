import { Breadcrumb, Layout, Menu } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { ItemType } from 'antd/es/menu/interface';
import './k-manager.scss';

interface IProps {
  logo?: React.ReactNode;
  sider?: {
    items?: ItemType[],
  }
  language?: React.ReactNode;
}

const KManagerLayout: React.FC<IProps> = (props) => {
  console.log('KManagerLayout');
  return (
    <Layout className={'k-manager-layout'}>
      <Layout.Header className={'k-header'}>
        <div className={'k-logo'}>{props.logo}</div>
        <div className={'k-nav-bar'}>
          <div>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['2']}
              items={[]}
              style={{ flex: 1, minWidth: 0 }}
            />
          </div>
          <div>
            {props.language}
          </div>
        </div>
      </Layout.Header>
      <Layout style={{ overflow: 'hidden', }}>
        <Layout.Sider width={200} style={{ overflow: 'hidden', }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0, backgroundColor: '#ffffff', }}
            items={props.sider?.items}
          />
        </Layout.Sider>
        <Layout style={{ padding: '0 24px 24px', overflow: 'hidden', }}>
          <Breadcrumb
            items={[]}
            style={{ margin: '16px 0' }}
          />
          <Layout.Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              backgroundColor: '#ffffff',
              overflowY: 'auto',
            }}
          >
            <Outlet />
          </Layout.Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default React.memo(KManagerLayout);