import React, { useState } from 'react'
import { Layout, Menu, MenuProps } from "antd";
import { CarOutlined, HomeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Home', 'Home', <HomeOutlined />),
  getItem('Transport', 'Transport', <CarOutlined />, [
    getItem('Mileage auto', 'Mileage auto'),
  ]),
];


interface ISideMenu {
  selectedRoute: string;
  setSelectedRoute: React.Dispatch<React.SetStateAction<string>>
}

const SideMenu: React.FC<ISideMenu> = ({
  selectedRoute,
  setSelectedRoute,
}) => {
  const router = useNavigate();

  const [collapsed, setCollapsed] = useState(false);

  const onChangeMenu: MenuProps['onClick'] = ({ key }) => {    
    switch (key) {
      case 'Home':
        setSelectedRoute('Home');
        router('/');
        return
      case 'Mileage auto':
        setSelectedRoute('Mileage auto');
        router('/transport/mileage-auto');
        return
      default:
        setSelectedRoute('Home');
        router('/');
        return
    }
  };

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <div style={{ fontSize: '34px', color: 'white', display: 'flex', justifyContent: 'center', padding: '16px' }}>Logo</div>
      <Menu defaultOpenKeys={['Transport']} onClick={onChangeMenu} theme="dark" selectedKeys={[selectedRoute]} mode="inline" items={items} />
    </Sider>
  )
}

export default SideMenu;
