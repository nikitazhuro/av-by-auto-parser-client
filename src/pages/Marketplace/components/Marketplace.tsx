import { Col, Row } from 'antd';
import axios from 'axios';

const Marketplace = () => {
  const hand = async () => {
    fetch('http://localhost:5000/server')
    .then((response: any) => {
      const reader = response.body.getReader();
      return new ReadableStream({
        start(controller) {
          return pump();
          function pump() {
            return reader.read().then(({ done, value }: any) => {
              // When no more data needs to be consumed, close the stream
              if (done) {
                console.log('done');
                controller.close();
                return;
              }
              console.log(value);
              controller.enqueue(value);
              return pump();
            });
          }
        },
      });
    })
    // Create a new response out of the stream
    .then((stream) => new Response(stream))
    // Create an object URL for the response
    .then((response) => response.blob())
    .then((blob) => URL.createObjectURL(blob))
    // Update image
    .then((url) => console.log(url))
  }
  return (
    <Row style={{
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100%',
    }}>
      <h1>
        Marketplace
        <button onClick={hand}>
          wadawdwa
        </button>
      </h1>
    </Row>
  )
}

export default Marketplace;