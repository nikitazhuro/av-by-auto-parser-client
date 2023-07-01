import { Layout } from 'antd';

import AutoFilter from '../../../modules/AutoFilter';
import MileageCars from '../../../modules/MileageCars';

const { Content } = Layout;

const Transport = () => {

  return (
    <Content style={{ margin: '24px' }}>
      <AutoFilter />
      <MileageCars />
    </Content>
  )
}

export default Transport;