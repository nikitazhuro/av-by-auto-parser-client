import React, { useState, useEffect } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import AppRouter from './components/AppRouter';
import { useNavigate, useLocation } from 'react-router-dom';

const { Header, Content, Sider, Footer } = Layout;

const menuItems = ['Main', 'Transport'];

const items1: MenuProps['items'] = menuItems.map((key) => ({
  key,
  label: `${key}`,
}));

const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,

      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  },
);
function App() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const router = useNavigate();
  const location = useLocation();

  const [selectedRoutes, setSelectedRoutes] = useState([''])

  const onClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case 'Main':
        return router('/')
      case 'Transport':
        return router('/transport')
      default: return router('/')
    }
  };

  useEffect(() => {
    switch (location.pathname) {
      case '/transport':
        setSelectedRoutes(['Transport'])
        break;
      default: setSelectedRoutes(['Main'])
    }
  }, [location.pathname])

  return (
    <Layout style={{ height: '100vh'}}>
      <Header className="header">
        <div className="logo" />
        <Menu onClick={onClick} theme="dark" mode="horizontal" selectedKeys={selectedRoutes} items={items1} />
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Layout style={{ padding: '24px 0', margin: '24px 0', height: '100%', background: colorBgContainer }}>
          <Sider style={{ background: colorBgContainer }} width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
              items={items2}
            />
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <AppRouter />
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
    </Layout>
  );
}

export default App;
