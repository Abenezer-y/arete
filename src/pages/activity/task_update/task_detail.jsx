// task


//TaskDetail

import React, { useState } from 'react';
import {Card, Col, Row } from 'antd';



const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}: <span>{content}</span></p>
  </div>
);

const layout = { labelCol: {span: 4,}, wrapperCol: { span: 26, }, };
                 
const tabList = [ {key: 'tab1', tab: 'tab1',}, {key: 'tab2', tab: 'tab2',},];
const contentList = { tab1: <p>content2</p>, tab2: <p>content2</p>, };
const tabListNoTitle = [{key: 'article', tab: 'article',}, {key: 'app', tab: 'app',}, {key: 'project', tab: 'project',}, ];


const TaskDetail = () => {

  const [key, setSelectionKey] = useState('tab1');
  const [noTitleKey, setSelectionTitleKey] = useState('app');

  const onTabChange = (key, type) => { console.log(key, type); setSelectionKey({ [type]: key });};

  return (
    <div>
        <br />
        <Card title="Task Detail">
          <Row>
            <Col span={10}> <DescriptionItem title="Full Name" content="Lily" /> </Col>
            <Col span={10}> <DescriptionItem title="Account" content="AntDesign@example.com" /> </Col>
          </Row>
          <Row>
            <Col>
              <DescriptionItem title="Description" content="rowSelection object indicates the need for row selection" />
            </Col>
          </Row>
          <Row>
            <Col > <DescriptionItem title="Objective" content="Lily" /> </Col>
          </Row>
        </Card>
        <br></br>
        <Card title="Requirements">
        <Row>
          <Col> <DescriptionItem title="Reqirement 01" content="Lily" /> </Col>
        </Row>
        <Row>
          <Col> <DescriptionItem title="Reqirement 02" content="AntDesign@example.com" /> </Col>
        </Row>
        </Card>
        <br></br>
        <Card title="Procedures">
        <Row>
          <Col> <DescriptionItem title="Step 01" content="Lily" /> </Col>
        </Row>
        <Row>
          <Col> <DescriptionItem title="Step 02" content="AntDesign@example.com" /> </Col>
        </Row>
        </Card>
        <br></br>

        <Card style={{ width: '100%' }} tabList={tabList} activeTabKey={key}
          onTabChange={key => {onTabChange(key, 'key'); }} >
          {contentList[key]}
        </Card> 
    </div>
  );
};

export default TaskDetail;