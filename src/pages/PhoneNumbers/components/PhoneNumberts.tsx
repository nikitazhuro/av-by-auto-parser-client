import { Row } from 'antd';
import PhoneNumbersRoot from '../../../modules/PhoneNumbers';
import { Content } from 'antd/es/layout/layout';

const PhoneNumbers = () => {

  return (
    <Content style={{ margin: '24px', position: 'relative' }}>
      <PhoneNumbersRoot />
    </Content>
  )
}

export default PhoneNumbers;