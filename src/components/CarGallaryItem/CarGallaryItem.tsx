import { Col, Modal } from "antd";
import { useMemo } from "react";
import { DeleteOutlined, ExclamationCircleFilled } from '@ant-design/icons';

import classes from './CarGalleryItem.module.css';

import { ISoldAuto } from "../../pages/Transport/store/transportApi";
import { deleteCarFromDatabase } from "../../api/mileageCardApi";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { autoFilterSliceActions } from "../../pages/Transport/store/autoFilterSlice";

const { confirm } = Modal;

interface ICarGallaryItem {
  car: ISoldAuto;
}

const CarGallaryItem: React.FC<ICarGallaryItem> = ({
  car,
}) => {
  const dispatch = useAppDispatch();
  const { setTriggerToRefetchCars } = autoFilterSliceActions;

  console.log(car);

  const deleteCarRequest = async () => {
    try {
      await deleteCarFromDatabase(car.uuid).then(() => {
        dispatch(setTriggerToRefetchCars(true));
      });
    } catch (error) {
      console.log(error);
    }
  }

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

  const carAdditionalInfo = useMemo(() => {
    const daysOnSold = Math.ceil((
      Date.parse(car?.data.removedAt) - Date.parse(car?.data.publishedAt)
    ) / 1000 / 60 / 60 / 24);

    let carPhotoLink = '';

    if (car?.photos.length) {
      carPhotoLink =  'http://localhost:5000/' + car?.photos[0] + '.jpg'
    }
    carPhotoLink = car.data?.avbyPhotosLinks?.[0]

    return {
      daysOnSold,
      carPhotoLink,
    };
  }, [car])

  return (
    <Col className={classes.card}>
      <img src={carAdditionalInfo.carPhotoLink} alt="photo" />
      <Col className={classes.description}>
        <Col className={classes.priceBlock}>
          <Col className={classes.price}>
            <a target="_blank" href={car?.data.publicUrl}>
              <span className={classes.price_byn}>{car?.data.price?.byn?.amount} p.</span>
              <span className={classes.price_usd}>~{car?.data.price?.usd?.amount} $</span>
            </a>
          </Col>
          <Col className={classes.basket}>
            <DeleteOutlined onClick={showConfirmDeleteModal} size={1.5} />
          </Col>
        </Col>
        <Col>
          Продано за {carAdditionalInfo.daysOnSold} дня, {new Date(Date.parse(car?.data.removedAt)).toDateString()}
        </Col>
      </Col>
    </Col>
  )
}
export default CarGallaryItem;
