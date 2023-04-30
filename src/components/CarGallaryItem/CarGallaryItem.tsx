import { Col, Modal } from "antd";

import { DeleteOutlined, ExclamationCircleFilled } from '@ant-design/icons';

import classes from './CarGalleryItem.module.css';

import { ISoldAuto } from "../../pages/Transport/store/transportApi";
import { deleteCarFromDatabase } from "../../api/mileageCardApi";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { autoFilterSliceActions } from "../../pages/Transport/store/autoFilterSlice";

const { confirm } = Modal;

interface ICarGallaryItem {
  car: ISoldAuto;
  listUUID: string;
}

const CarGallaryItem: React.FC<ICarGallaryItem> = ({
  car,
  listUUID,
}) => {
  const dispatch = useAppDispatch();
  const { setTriggerToRefetchCars } = autoFilterSliceActions;

  const daysOnSold = Math.ceil((Date.parse(car.removedAt) - Date.parse(car.publishedAt)) / 1000 / 60 / 60 / 24);

  const showConfirmDeleteModal = () => {
    confirm({
      title: 'Are you sure delete this car?',
      icon: <ExclamationCircleFilled />,
      content: 'Your actions will lead to the removal of this car from the database',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteCarRequest();
      },
    });
  }

  const deleteCarRequest = async () => {
    const config = {
      uuid: listUUID,
      carId: car.id,
    };

    try {
      await deleteCarFromDatabase(config).then(() => {
        dispatch(setTriggerToRefetchCars(true));
      });

    } catch (error) {
      
    } finally {

    }
  }

  return (
    <Col className={classes.card}>
      <img src={'http://localhost:5000/' + car?.photos[0] + '.jpg'} alt="photo" />
      <Col className={classes.description}>
        <Col className={classes.priceBlock}>
          <Col className={classes.price}>
            <a target="_blank" href={car.publicUrl}>
              <span className={classes.price_byn}>{car?.data.price?.byn?.amount} p.</span>
              <span className={classes.price_usd}>~{car?.data.price?.usd?.amount} $</span>
            </a>
          </Col>
          <Col className={classes.basket}>
            <DeleteOutlined onClick={showConfirmDeleteModal} size={1.5} />
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
