import { useState, useEffect } from 'react';
import { Layout, Spin, Row } from 'antd';
import { useLocation } from 'react-router-dom';

import AppRouter from './components/AppRouter';
import SideMenu from './components/Sidebar/Sidebar';

function App() {
  const location = useLocation();

  const [selectedRoute, setSelectedRoute] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);


  const changeRoute = (route: string) => {
    setIsLoading(false);
    setSelectedRoute(route)
  }

  useEffect(() => {
    if (location.pathname.includes('/vehicles-sold/mileage-auto')) {
      changeRoute('Mileage auto')
    } else if (location.pathname.includes('/auction')) {
      changeRoute('Auction')
    } else if (location.pathname.includes('/marketplace')) {
      changeRoute('Marketplace')
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
        backgroundColor: '#121224',
      }}>
        <Spin size="large" spinning />
      </Row>
    )
  };

  return (
    <Layout hasSider style={{ minHeight: '100vh', backgroundColor: '#121224' }}>
      <SideMenu
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        selectedRoute={selectedRoute}
        setSelectedRoute={setSelectedRoute}
      />
      <Layout
        className="site-layout"
        style={{
          marginLeft: collapsed ? 80 : 200,
          transition: 'all 0.3s ease',
          backgroundColor: '#121224',
        }}>
        <AppRouter />
      </Layout>
    </Layout>
  );
}

export default App;
