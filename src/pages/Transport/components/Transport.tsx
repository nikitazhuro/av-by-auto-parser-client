import { Layout, theme } from 'antd';
import { useState } from 'react';
import AutoFilter from '../../../modules/AutoFilter';
import MileageCars from '../../../modules/MileageCars';

const { Content } = Layout;

const Transport = () => {
  const { token: { colorBgContainer } } = theme.useToken();

  return (
    <Content style={{ margin: '24px' }}>
      <AutoFilter />
      <MileageCars />
      {/* <div
        style={{
          padding: 24,
          minHeight: 360,
          backgroundColor: "#33323D",
          height: 'calc(100vh - 146px)',
          marginTop: '0.5rem',
        }}>
        <MileageCars />
      </div> */}
    </Content>
  )
}

export default Transport;