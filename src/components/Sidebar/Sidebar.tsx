import React from 'react'
import { Layout, Menu, MenuProps } from "antd";
import { CarOutlined, HomeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import classes from './Sidebar.module.css';
import { ReactComponent as Marketplace } from '../../assets/icons/marketplace.svg';
import { ReactComponent as Auction } from '../../assets/icons/auction.svg';

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
  getItem('Vehicles sold', 'Vehicles sold', <CarOutlined />, [
    getItem('Mileage auto', 'Mileage auto'),
  ]),
  getItem('Marketplace', 'Marketplace', <Marketplace />),
  getItem('Auction', 'Auction', <Auction />),
];


interface ISideMenu {
  selectedRoute: string;
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedRoute: React.Dispatch<React.SetStateAction<string>>
}

const SideMenu: React.FC<ISideMenu> = ({
  collapsed,
  setCollapsed,
  selectedRoute,
  setSelectedRoute,
}) => {
  const router = useNavigate();

  const onChangeMenu: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case 'Home':
        setSelectedRoute('Home');
        router('/');
        return
      case 'Mileage auto':
        setSelectedRoute('Mileage auto');
        router('/vehicles-sold/mileage-auto');
        return
      case 'Marketplace':
        setSelectedRoute('Marketplace');
        router('/marketplace');
        return
      case 'Auction':
          setSelectedRoute('Auction');
          router('/auction');
          return
      default:
        setSelectedRoute('Home');
        router('/');
        return
    }
  };

  const onChangeCollapsed = (value: boolean) => {
    setCollapsed(value);
  }

  return (
    <Sider
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
      }}
      collapsible
      collapsed={collapsed}
      onCollapse={onChangeCollapsed}
    >
      <h1 onClick={() => router('/')} className={classes.logo}>auto parser</h1>
      <Menu
        defaultOpenKeys={['Vehicles sold']}
        onClick={onChangeMenu}
        theme="dark"
        selectedKeys={[selectedRoute]}
        mode="inline"
        items={items}
      />
    </Sider>
  )
}

export default SideMenu;
