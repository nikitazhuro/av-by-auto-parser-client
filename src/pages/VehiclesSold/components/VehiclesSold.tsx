import { Layout } from 'antd';

import AutoFilter from '../../../modules/AutoFilter';
import MileageCars from '../../../modules/MileageCars';

const { Content } = Layout;

const VehiclesSold = () => {
  return (
    <Content style={{ margin: '24px', position: 'relative' }}>
      <AutoFilter />
      <MileageCars />
    </Content>
  )
}

export default VehiclesSold;