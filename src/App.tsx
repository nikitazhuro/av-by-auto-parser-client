import React, { useState, useEffect } from 'react';
import { Breadcrumb, Layout, theme, Spin, Row } from 'antd';
import { useLocation } from 'react-router-dom';

import AppRouter from './components/AppRouter';
import SideMenu from './components/SideMenu';


const { Header, Content, Footer } = Layout;

function App() {
  const { token: { colorBgContainer } } = theme.useToken();

  const location = useLocation();

  const [selectedRoute, setSelectedRoute] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true);


  const changeRoute = (route: string) => {    
    setIsLoading(false);
    setSelectedRoute(route)
  }

  useEffect(() => {    
    if (location.pathname.includes('/transport/mileage-auto')) {
      changeRoute('Mileage auto')
    } else {
      changeRoute('Home')
    }
  }, [])

  if (isLoading) {
    return (
      <Row style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Spin size="large" spinning />
      </Row>
    )
  };

  return (
    <Layout hasSider style={{ minHeight: '100vh' }}>
      <SideMenu
        selectedRoute={selectedRoute}
        setSelectedRoute={setSelectedRoute}
      />
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '16px' }}>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer, height: '100%' }}>
            <AppRouter />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
