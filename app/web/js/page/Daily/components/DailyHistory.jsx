import React from 'react';
import moment from 'moment';
import { Card, Table } from 'antd';
import { EXPLORER_URL, DAILY, CHAIN } from '../../../constant/constant';

export default function renderDailyHistory(props) {

  const {dailyAwardHistory} = props;

  const columns = [
    {
      title: 'Award Id',
      dataIndex: 'award_id',
      key: 'award_id',
      textWrap: 'word-break',
      fixed: 'left',
      width: 200,
      render: text => <a target='_blank' href={`${EXPLORER_URL}/tx/${text}`}>{text}</a>
    },
    {
      title: 'Tx Id',
      dataIndex: 'tx_id',
      key: 'tx_id',
      textWrap: 'word-break',
      width: 200,
      render: (text, record) => {
        let chainId = record.chain_id || 'AELF';
        return <a target='_blank' href={`${CHAIN[chainId].EXPLORER_URL}/tx/${text}`}>{text}</a>
      }
    },
    {
      title: 'type',
      dataIndex: 'type',
      width: 100,
      key: 'type',
    },
    {
      title: 'chain',
      dataIndex: 'chain_id',
      width: 64,
      key: 'chain_id',
    },
    {
      title: 'Award',
      width: 100,
      render: () => <div>{DAILY.AMOUNT / (10 ** DAILY.DECIMAL)} {DAILY.SYMBOL}</div>,
    },
    {
      title: 'Award Time',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
      render: text => <div>{ moment.utc(text).local().format('YYYY-MM-DD HH:mm') }</div>,
    },
    {
      title: 'Round End Time',
      dataIndex: 'end_time',
      key: 'end_time',
      width: 150,
      render: text => <div>{ moment.utc(text * 1000).local().format('YYYY-MM-DD HH:mm') }</div>,
    }
  ];

  return (
    <Card
      className='hover-cursor-auto'
      hoverable
      title='History'>
      <div className='section-content swap-flex-wrap overflow-x-scroll'>
        <span>Time is local time</span>
        <Table
          dataSource={dailyAwardHistory}
          columns={columns}
          pagination={false}
          rowKey='id'
          scroll={{x: 1024}}
        />
      </div>
    </Card>
  );
}
