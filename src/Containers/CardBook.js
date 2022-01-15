import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import { Card } from 'antd';
import {LeftOutlined} from '@ant-design/icons';
import ManyCards from './ManyCards.js';
import Test from "./Test.js"
import instance from '../instance.js';

function CardBook(props) {

    const {bid} = useParams();
    const {navigate} =props;
    const [book, setBook] =useState({});

    useEffect(() => {
      const getBookNameById =async(id) =>
      {
        const {data: {message, data}} =await instance.get("/api/getBookNameById", {params: {id}});
        setBook(data);
      };

      getBookNameById(bid);
    });

    const tabList = [
        {
          key: 'tab1',
          tab: 'Words',
        },
        {
          key: 'tab2',
          tab: 'Test',
          disabled: !book.num_of_card
        },
      ];

      const contentList = {
        tab1: <ManyCards cardBookId = {bid}/>,
        tab2: <Test bookId ={bid}/>,
      };



  const [activeTabKey1, setActiveTabKey1] = useState('tab1');

  const onTab1Change = key => {
    setActiveTabKey1(key);
  };

  return (
    <div style={{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
}}>
    
      <Card
        style={{ width: '100%' }}
        title={<span style ={{fontSize: 36, marginBottom: 30}}><LeftOutlined style ={{fontSize: 28}} onClick ={() => navigate(-1)}/> {book.name}</span>}
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={key => {
          onTab1Change(key);
        }}
      >
        {contentList[activeTabKey1]}
      </Card>

    </div>
  );
};

export default CardBook;