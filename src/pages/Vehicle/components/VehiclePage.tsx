import { Layout } from 'antd';
import Vehicle from "../../../modules/Vehicle/components/Vehicle";

const { Content } = Layout;

const VehiclePage = () => {
  return (
    <Content style={{ margin: '24px', position: 'relative' }}>
      <Vehicle />
    </Content>
  )
}

export default VehiclePage;