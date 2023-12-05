import { Col, Row } from "antd";
import { useEffect, useState } from "react";

import classes from './phoneNumbersRoot.module.css';

import PhoneNumbersTable from "./PhoneNumbersTable";

import { fetchPhoneNumbers } from "../../../api/phoneNumbers";

const PhoneNumbersRoot = () => {
  const [numbersData, setNumbersData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getPhoneNumbersRequest = async () => {
    setIsLoading(true);

    const data = await fetchPhoneNumbers();

    console.log(data);

    setNumbersData(data);
    setIsLoading(false);
  }

  const getPhoneNumbers = async () => {
    await getPhoneNumbersRequest();
  }

  useEffect(() => {
    getPhoneNumbers();
  }, [])

  return (
    <Row style={{ width: '100%' }}>
      <Col className={classes.filterHeader}>
        <h1 className={classes.carsFilterTitle}>
          Sales numbers
        </h1>
        <span className={classes.carsFilterDescription}>
          List of mileage cars with owners number from our database
        </span>
      </Col>
      <PhoneNumbersTable data={numbersData} isLoading={isLoading} />
    </Row>
  )
}

export default PhoneNumbersRoot;
