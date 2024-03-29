import { Col, Image, Row, Table } from "antd"
import dayjs from "dayjs";
import { get } from 'lodash';
import { useNavigate } from "react-router-dom";

import classes from './MileageCarsTable.module.css';

interface ICustomTable {
  data: Array<any>;
  isLoading: boolean;
}

const MileageCarsTable: React.FC<ICustomTable> = ({
  data,
  isLoading,
}) => {
  const router = useNavigate();

  const columns = [
    {
      title: 'Image',
      dataIndex: 'Image',
      key: 'Image',
      render: (_: any, row: any) => {
        return (
          <Image
            width={200}
            style={{
              objectFit: "cover"
            }}
            height={100}
            src={row.photos.length
              ? `${row.data?.avbyPhotosLinks?.[0]}`
              : `${row.data?.avbyPhotosLinks?.[0]}`
            }
            fallback="data:image/png;base64,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"
          />
        )
      },
    },
    {
      title: 'Dates',
      dataIndex: ['data', 'publishedAt'],
      key: 'publishedAt',
      sorter: (a: any, b: any) => {
        const rmA = get(a, ['data', 'removedAt'], new Date())
        const rmB = get(b, ['data', 'removedAt'], new Date())

        if (new Date(rmA).valueOf() < new Date(rmB).valueOf()) {
          return -1;
        }
        return 1
      },

      render: (_: any, row: any) => {
        const published = get(row, ['data', 'publishedAt'], null);
        const removed = get(row, ['data', 'removedAt'], null);
        
        return (
          <Row className={classes.datesColumn}>
            <Col>
              Rm - {removed ? dayjs(removed).format('YYYY-MM-DD, HH:mm') : 'No data'}
            </Col>
            <Col>
              Pub - {published ? dayjs(published).format('YYYY-MM-DD, HH:mm') : 'No data'}
            </Col>
          </Row>
        )
      }
    },
    {
      title: 'Price',
      dataIndex: ['data', 'price', 'usd', 'amount'],
      key: 'price',
      sorter: (a: any, b: any) => {
        const priceA = get(a, ['data', 'price', 'usd', 'amount'], 0)
        const priceB = get(b, ['data', 'price', 'usd', 'amount'], 0)

        if (priceA < priceB) {
          return -1;
        }
        return 1
      },
      render: (cell: any, row: any) => {
        return (
          <span>
            {cell} $
          </span>
        )
      },
    },
    {
      title: 'Mileage (km)',
      dataIndex: 'mileage_km',
      key: 'mileage_km',
      sorter: (a: any, b: any) => +a.mileage_km - +b.mileage_km,
    },
    {
      title: 'Days on sold',
      dataIndex: 'address',
      key: 'address',
      sorter: (a: any, b: any) => {
        const daysOnSoldA = Math.ceil((
          Date.parse(a?.data.removedAt) - Date.parse(a?.data.publishedAt)
        ) / 1000 / 60 / 60 / 24);
        const daysOnSoldB = Math.ceil((
          Date.parse(b?.data.removedAt) - Date.parse(b?.data.publishedAt)
        ) / 1000 / 60 / 60 / 24);
        if (daysOnSoldA < daysOnSoldB) {
          return -1;
        }
        return 1
      },
      render: (_: any, row: any) => {
        const daysOnSold = Math.ceil((
          Date.parse(row?.data.removedAt) - Date.parse(row?.data.publishedAt)
        ) / 1000 / 60 / 60 / 24);

        return <div>{daysOnSold}</div>
      }
    },
    {
      title: 'Engine',
      dataIndex: ['data', 'properties', 'engine_capacity'],
      key: 'engine_capacity',
      sorter: (a: any, b: any) => {
        get(a, ['data', 'properties', 'engine_capacity', 'value'], 0)
        const engineA = +get(a, ['data', 'properties', 'engine_capacity', 'value'], 0)
        const engineB = +get(b, ['data', 'properties', 'engine_capacity', 'value'], 0)
        if (engineA < engineB) {
          return -1;
        }
        return 1
      },
      render: (cell: any,) => {
        return <div>{cell?.value || 'No data'}</div>
      }
    },
    {
      title: 'Engine type',
      dataIndex: ['data', 'properties', 'engine_type'],
      key: 'engine_type',
      render: (cell: any) => {
        return <div>{cell?.value || 'No data'}</div>
      }
    },
    {
      title: 'Transmission',
      dataIndex: ['data', 'properties', 'transmission_type'],
      key: 'transmission_type',
      render: (cell: any) => {
        return <div>{cell?.value || 'No data'}</div>
      }
    },
    {
      title: 'Body type',
      dataIndex: ['data', 'properties', 'body_type'],
      key: 'body_type',
      render: (cell: any) => {
        return <div>{cell?.value || 'No data'}</div>
      }
    },
    {
      title: 'Drive type',
      dataIndex: ['data', 'properties', 'drive_type'],
      key: 'drive_type',
      render: (cell: any) => {
        return <div>{cell?.value || 'No data'}</div>
      }
    },
    {
      title: 'Color',
      dataIndex: ['data', 'properties', 'color'],
      key: 'color',
      render: (cell: any) => {
        return <div>{cell?.value || 'No data'}</div>
      }
    },
    {
      title: 'Interior material',
      dataIndex: ['data', 'properties', 'interior_material'],
      key: 'interior_material',
      render: (cell: any) => {
        return <div>{cell?.value || 'No data'}</div>
      }
    },
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year',
      sorter: (a: any, b: any) => +a.year - +b.year,
    },
    {
      title: 'Actions',
      key: 'action',
      dataIndex: ['data', 'publicUrl'],
      render: (cell: string) => (
        <Col className={classes.links}>
          <a href={cell} target="_blank">
            AV.by
          </a>
        </Col>
      ),
    },
  ];

  const onRow = (record: any) => {
    return {
      onClick: () => {
        router(record.uuid)
      },
    };
  };

  return (
    <Table
      loading={isLoading}
      size="small"
      style={{
        height: '100%',
        overflow: 'auto',
      }}
      columns={columns}
      dataSource={data}
      onRow={onRow}
    />
  )
}

export default MileageCarsTable;