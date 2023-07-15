import { Carousel, Col, Image, Row, Spin } from "antd"
import { useMemo } from 'react';
import { get } from "lodash";

import classes from './Vehicle.module.css';

import GreenButton from "../../../components/Button/GreenButton";

import { useParams } from "react-router-dom";
import { useGetVehicleQuery } from "../../../pages/Vehicle/store/vehicleApi";

const contentStyle: React.CSSProperties = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const Vehicle = () => {
  const { uuid } = useParams();
  const { data, isLoading } = useGetVehicleQuery(uuid)

  const photos = useMemo(() => {
    if (data) {
      return get(data, ['data', 'avbyPhotosLinks'], []);
    }
    return [];
  }, [data])

  return (
    <Row className={classes.vehicle}>
      <Col className={classes.banner}>
        <a href="/" target='_blank'>
          <h1 className={classes.bannerTitle}>Checking the vehicle history by vin</h1>
          <GreenButton className={classes.bannerBtn}>
            Let's try
          </GreenButton>
        </a>
      </Col>
      {isLoading
        ? (
          <Row className={classes.spinner}>
            <Spin />
          </Row>
        )
        : (
          <Row style={{ width: '100%'}}>
            {/* <Carousel style={{ width: '100%' }} autoplay>
              {photos.map((photosLink: string) => (
                <div>
                  <Image style={contentStyle} key={photosLink} src={photosLink} />
                </div>
              ))}
            </Carousel> */}
          </Row>
        )}
    </Row>
  )
}

export default Vehicle;