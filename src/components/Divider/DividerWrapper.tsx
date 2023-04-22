import React from 'react'
import { Col, Divider } from 'antd';
import { UpOutlined, DownOutlined } from '@ant-design/icons';

import classes from './DividerWrapper.module.css';

interface IDividerWrapper {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

const DividerWrapper: React.FC<IDividerWrapper> = ({
  state,
  setState,
}) => {

  const onChangeShowAllBrands = () => {
    setState((prev) => !prev);
  }
  return (
    <Divider className={classes.divider}>
    <span onClick={onChangeShowAllBrands}>
      {state
        ? (
          <Col className={classes.moreContentBtn}>
            {'Hide more'}
            <UpOutlined style={{ marginLeft: '0.25rem' }} />
          </Col>

        )
        : (
          <Col className={classes.moreContentBtn}>
            {'Show more'}
            <DownOutlined style={{ marginLeft: '0.25rem' }} />
          </Col>
        )}
    </span>
  </Divider>
  )
}

export default DividerWrapper;
