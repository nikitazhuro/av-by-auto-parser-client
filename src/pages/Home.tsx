import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Row style={{
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100%',
    }}>
      <Col style={{
        color: '#1677ff',
        fontSize: '52px',
        fontWeight: '600'
      }}>
        Av.by auto parser
      </Col>
    </Row>
  )
}

export default Home;
