import { Button, Col, Input, Modal, Row, Select } from "antd"
import { FilterOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";

import './FilterModalAnt.css'
import classes from './Filter.module.css';

import { useGetCarsFilterActions } from "../../../../pages/VehiclesSold/store/autoFilterSlice";
import ApInput from "../../../../components/Input/ApInput";
import ApSelect from "../../../../components/Select/ApSelect";

const engine_type = [
  { label: 'бензин', value: 'бензин' },
  { label: 'бензин (пропан-бутан)', value: 'бензин (пропан-бутан)' },
  { label: 'бензин (метан)', value: 'бензин (метан)' },
  { label: 'бензин (гибрид)', value: 'бензин (гибрид)' },
  { label: 'дизель', value: 'дизель' },
  { label: 'дизель (гибрид)', value: 'дизель (гибрид)' },
  { label: 'электро', value: 'электро' }
];

const transmission = [
  { label: 'автомат', value: 'автомат' },
  { label: 'механика', value: 'механика' },
];

const body_type = [
  { label: 'внедорожник 3 дв.', value: 'внедорожник 3 дв.' },
  { label: 'внедорожник 5 дв.', value: 'внедорожник 5 дв.' },
  { label: 'кабриолет', value: 'кабриолет' },
  { label: 'купе', value: 'купе' },
  { label: 'легковой фургон', value: 'легковой фургон' },
  { label: 'лимузин', value: 'лимузин' },
  { label: 'лифтбек', value: 'лифтбек' },
  { label: 'минивэн', value: 'минивэн' },
  { label: 'пикап', value: 'пикап' },
  { label: 'родстер', value: 'родстер' },
  { label: 'седан', value: 'седан' },
  { label: 'универсал', value: 'универсал' },
  { label: 'хэтчбек 3 дв.', value: 'хэтчбек 3 дв.' },
  { label: 'хэтчбек 5 дв.', value: 'хэтчбек 5 дв.' },
]

const drive_type = [
  { label: 'передний привод', value: 'передний привод' },
  { label: 'задний привод', value: 'задний привод' },
  { label: 'подключаемый полный привод', value: 'подключаемый полный привод' },
  { label: 'постоянный полный привод', value: 'постоянный полный привод' },
]

const defaultFilterState = {
  price_from: '',
  price_to: '',
  mileage_from: '',
  mileage_to: '',
  engine_from: '',
  engine_to: '',
  engine_type: [],
  transmission_type: '',
  body_type: [],
  drive_type: [],
  interior_material: '',
  color: '',
  year_from: '',
  year_to: '',
}

const Filter = () => {
  const { setFilterConfig, clearFilterConfig } = useGetCarsFilterActions();
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [engineOptions, setEngineOptions] = useState([
    { value: 1.0, label: '1.0' },
    { value: 1.1, label: '1.1' },
    { value: 1.2, label: '1.2' },
    { value: 1.3, label: '1.3' },
    { value: 1.4, label: '1.4' },
    { value: 1.5, label: '1.5' },
    { value: 1.6, label: '1.6' },
    { value: 1.7, label: '1.7' },
    { value: 1.8, label: '1.8' },
    { value: 1.9, label: '1.9' },
    { value: 2.0, label: '2.0' },
    { value: 2.1, label: '2.1' },
    { value: 2.2, label: '2.2' },
    { value: 2.3, label: '2.3' },
    { value: 2.4, label: '2.4' },
    { value: 2.5, label: '2.5' },
    { value: 2.6, label: '2.6' },
    { value: 2.7, label: '2.7' },
    { value: 2.8, label: '2.8' },
    { value: 2.9, label: '2.9' },
    { value: 3.0, label: '3.0' },
    { value: 3.1, label: '3.1' },
    { value: 3.2, label: '3.2' },
    { value: 3.3, label: '3.3' },
    { value: 3.4, label: '3.4' },
    { value: 3.5, label: '3.5' },
    { value: 3.6, label: '3.6' },
    { value: 3.7, label: '3.7' },
    { value: 3.8, label: '3.8' },
    { value: 3.9, label: '3.9' },
    { value: 4.0, label: '4.0' },
    { value: 4.1, label: '4.1' },
    { value: 4.2, label: '4.2' },
    { value: 4.3, label: '4.3' },
    { value: 4.4, label: '4.4' },
    { value: 4.5, label: '4.5' },
    { value: 4.6, label: '4.6' },
    { value: 4.7, label: '4.7' },
    { value: 4.8, label: '4.8' },
    { value: 4.9, label: '4.9' },
    { value: 5.0, label: '5.0' },
    { value: 5.1, label: '5.1' },
    { value: 5.2, label: '5.2' },
    { value: 5.3, label: '5.3' },
    { value: 5.4, label: '5.4' },
    { value: 5.5, label: '5.5' },
    { value: 5.6, label: '5.6' },
    { value: 5.7, label: '5.7' },
    { value: 5.8, label: '5.8' },
    { value: 5.9, label: '5.9' },
    { value: 6.0, label: '6.0' },
    { value: 6.1, label: '6.1' },
    { value: 6.2, label: '6.2' },
    { value: 6.3, label: '6.3' },
    { value: 6.4, label: '6.4' },
    { value: 6.5, label: '6.5' },
    { value: 6.6, label: '6.6' },
    { value: 6.7, label: '6.7' },
    { value: 6.8, label: '6.8' },
    { value: 6.9, label: '6.9' },
    { value: 7.0, label: '7.0' },
    { value: 7.1, label: '7.1' },
    { value: 7.2, label: '7.2' },
    { value: 7.3, label: '7.3' },
    { value: 7.4, label: '7.4' },
    { value: 7.5, label: '7.5' },
    { value: 7.6, label: '7.6' },
    { value: 7.7, label: '7.7' },
    { value: 7.8, label: '7.8' },
    { value: 7.9, label: '7.9' },
    { value: 8.0, label: '8.0' },
    { value: 8.1, label: '8.1' },
    { value: 8.2, label: '8.2' },
    { value: 8.3, label: '8.3' },
    { value: 8.4, label: '8.4' },
    { value: 8.5, label: '8.5' },
    { value: 8.6, label: '8.6' },
    { value: 8.7, label: '8.7' },
    { value: 8.8, label: '8.8' },
    { value: 8.9, label: '8.9' },
    { value: 9.0, label: '9.0' },
  ])
  
  const [filterState, setFilterState] = useState(defaultFilterState)

  const openFilterHandler = () => {
    setIsOpenFilter(true);
  }

  const closeFilterHandler = () => {
    setIsOpenFilter(false);
  }

  const onChangeFilterState = (field: string) => (e: any) => {
    setFilterState((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const onChangeSelect = (field: string) => (value: any) => {
    setFilterState((prev) => ({ ...prev, [field]: value }))
  }

  const searchCars = async () => {
    setFilterConfig(filterState);

    closeFilterHandler()
  }

  const clearFiler = () => {
    clearFilterConfig();
    setFilterState(defaultFilterState);

    closeFilterHandler();
  }

  return (
    <>
      <Col onClick={openFilterHandler} className={classes.filter}>
        <FilterOutlined />
        <span className={classes.filterPreviewBtn}>Filters</span>
      </Col>
      <Modal
        title={
          <Col className={classes.filter__title}>
            Filters
          </Col>
        }
        className="filterModal"
        open={isOpenFilter}
        onCancel={closeFilterHandler}
        destroyOnClose
        onOk={closeFilterHandler}
        width={430}
        footer={(
          <Row style={{ display: 'flex' }}>
            <Col style={{ width: '30%', paddingRight: '0.25rem' }}>
              <Button className={classes.modalSubmit} onClick={clearFiler}>
                Clear
              </Button>
            </Col>
            <Col style={{ width: '70%', paddingLeft: '0.25rem' }}>
              <Button className={classes.modalSubmit} onClick={searchCars}>
                Search
              </Button>
            </Col>
          </Row>
        )}
      >
        <Col className={classes.priceBlock}>
          <Col className={classes.filterItem_title}>
            Price
          </Col>
          <Col style={{ display: 'flex' }}>
            <Col style={{
              width: '50%',
              paddingRight: '0.25rem'
            }}>
              <ApInput
                allowClear
                className={classes.filterInput}
                placeholder="Enter min price"
                value={filterState.price_from}
                onChange={onChangeFilterState('price_from')}
              />
            </Col>
            <Col style={{
              width: '50%',
              paddingLeft: '0.25rem'
            }}>
              <ApInput
                allowClear
                className={classes.filterInput}
                placeholder="Enter max price"
                value={filterState.price_to}
                onChange={onChangeFilterState('price_to')}
              />
            </Col>
          </Col>
        </Col>
        <Col className={classes.priceBlock}>
          <Col className={classes.filterItem_title}>
            Mileage
          </Col>
          <Col style={{ display: "flex" }}>
            <Col style={{
              width: '50%',
              paddingRight: '0.25rem'
            }}>
              <ApInput
                allowClear
                className={classes.filterInput}
                placeholder="Enter min mileage"
                value={filterState.mileage_from}
                onChange={onChangeFilterState('mileage_from')}
              />
            </Col>
            <Col style={{
              width: '50%',
              paddingLeft: '0.25rem'
            }}>
              <ApInput
                allowClear
                className={classes.filterInput}
                placeholder="Enter max mileage"
                value={filterState.mileage_to}
                onChange={onChangeFilterState('mileage_to')}
              />
            </Col>
          </Col>
        </Col>
        <Col className={classes.priceBlock}>
          <Col className={classes.filterItem_title}>
            Engine
          </Col>
          <Col style={{ display: 'flex' }}>
            <ApSelect
              style={{ marginRight: "0.25rem" }}
              className={classes.shortSelect}
              allowClear
              placeholder="Engine, from"
              onChange={onChangeSelect('engine_from')}
              options={engineOptions}
            />
            <ApSelect
              style={{ marginLeft: "0.25rem" }}
              className={classes.shortSelect}
              allowClear
              placeholder="Engine, to"
              onChange={onChangeSelect('engine_to')}
              options={engineOptions}
            />
          </Col>
          <ApSelect
            style={{
              width: "100%"
            }}
            placeholder="Engine type"
            mode="multiple"
            value={filterState.engine_type}
            onChange={onChangeSelect('engine_type')}
            options={engine_type}
            allowClear
          />
        </Col>
        <Col className={classes.priceBlock}>
          <Col className={classes.filterItem_title}>
            Other
          </Col>
          <ApSelect
            className={classes.longSelect}
            allowClear
            placeholder="Transmission"
            onChange={onChangeSelect('transmission_type')}
            options={transmission}
          />
          <ApSelect
            className={classes.longSelect}
            mode="multiple"
            allowClear
            placeholder="Body type"
            value={filterState.body_type}
            onChange={onChangeSelect('body_type')}
            options={body_type}
          />
          <ApSelect
            className={classes.longSelect}
            mode="multiple"
            allowClear
            placeholder="Drive type"
            value={filterState.drive_type}
            onChange={onChangeSelect('drive_type')}
            options={drive_type}
          />
        </Col>
        <Col className={classes.priceBlock}>
          <Col className={classes.filterItem_title}>
            Year
          </Col>
          <Col style={{ display: 'flex' }}>
            <Col style={{
              width: '50%',
              paddingRight: '0.25rem'
            }}>
              <ApInput
                allowClear
                className={classes.filterInput}
                placeholder="Enter year from"
                value={filterState.year_from}
                onChange={onChangeFilterState('year_from')}
              />
            </Col>
            <Col style={{
              width: '50%',
              paddingLeft: '0.25rem'
            }}>
              <ApInput
                allowClear
                className={classes.filterInput}
                placeholder="Enter year to"
                value={filterState.year_to}
                onChange={onChangeFilterState('year_to')}
              />
            </Col>
          </Col>
        </Col>
      </Modal>
    </>
  )
}

export default Filter;