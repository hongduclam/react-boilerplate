import React, { useState } from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import ProLayout, {
  PageContainer,
  SettingDrawer,
} from '@ant-design/pro-layout';
import defaultSettings from '@ant-design/pro-layout/es/defaultSettings';
import defaultProps from './defaultProps';

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  const [settings, setSetting] = useState({
    ...defaultSettings,
    title: 'Yocto ERP',
  });
  const [pathname, setPathname] = useState('/dashboard');
  return (
    <div
      id="test-pro-layout"
      style={{
        transform: 'rotate(0)',
        overflowX: 'hidden',
      }}
    >
      <ProLayout
        {...defaultProps}
        style={{
          maxHeight: '100vh',
        }}
        location={{
          pathname,
        }}
        menuItemRender={(item, dom) => (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
          <a
            onClick={() => {
              setPathname(item.path || '/dashboard');
            }}
          >
            {dom}
          </a>
        )}
        rightContentRender={() => (
          <div>
            <Avatar shape="square" size="small" icon={<UserOutlined />} />
          </div>
        )}
        {...settings}
      >
        <PageContainer footer="Yocto ERP 2020">{children}</PageContainer>
      </ProLayout>
      <SettingDrawer
        getContainer={() => document.getElementById('test-pro-layout')}
        settings={settings}
        onSettingChange={changeSetting => setSetting(changeSetting)}
      />
    </div>
  );
};

export default Layout;
