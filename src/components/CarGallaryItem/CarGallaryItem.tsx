import { Col } from "antd";

import { DeleteOutlined } from '@ant-design/icons';

import classes from './CarGalleryItem.module.css';

import { ISoldAuto } from "../../pages/Transport/store/transportApi";

interface ICarGallaryItem {
  car: ISoldAuto;
}

const CarGallaryItem: React.FC<ICarGallaryItem> = ({
  car,
}) => {

  const daysOnSold = Math.ceil((Date.parse(car.removedAt) - Date.parse(car.publishedAt)) / 1000 / 60 / 60 / 24)

  return (
    <Col className={classes.card}>
      <img src={car?.photos[0]?.medium?.url} alt="photo" />
      <Col className={classes.description}>
        <Col className={classes.priceBlock}>
          <Col className={classes.price}>
            <a target="_blank" href={car.publicUrl}>
              <span className={classes.price_byn}>{car.price?.byn?.amount} p.</span>
              <span className={classes.price_usd}>~{car.price?.usd?.amount} $</span>
            </a>
          </Col>
          <Col className={classes.basket}>
            <DeleteOutlined size={1.5} />
          </Col>
        </Col>
        <Col>
          Продано за {daysOnSold} дня, {new Date(Date.parse(car.removedAt)).toDateString()}
        </Col>
      </Col>
    </Col>
  )
}
export default CarGallaryItem;
