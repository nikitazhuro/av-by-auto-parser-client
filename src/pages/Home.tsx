import { Col, Row } from 'antd';

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
        color: '#fff',
        fontSize: '52px',
        fontWeight: '700',
        textTransform: 'uppercase',
        fontFamily: "Bebas Neue Bold",
      }}>
        auto parser
      </Col>
    </Row>
  )
}

export default Home;
