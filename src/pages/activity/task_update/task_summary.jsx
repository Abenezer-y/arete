// task_summary

// task_table
// TaskTable

import React, { useState } from 'react';
import { Table, Radio, Divider, Card, Col, Row, Form, Input, } from 'antd';


const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}: <span>{content}</span></p>
    
  </div>
);

const layout = { labelCol: {span: 4,}, wrapperCol: { span: 26, }, };
const columns = [ { title: 'Name', dataIndex: 'name', render: (text) => <a>{text}</a>, },
                  { title: 'Age', dataIndex: 'age', },
                  { title: 'Address', dataIndex: 'address', }, ];

const data = [ { key: '1', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park', },
               { key: '2', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park', },
               { key: '3', name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park', },
               { key: '4', name: 'Disabled User', age: 99, address: 'Sidney No. 1 Lake Park', }, ]; 
  // rowSelection object indicates the need for row selection

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
             console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);},

  getCheckboxProps: (record) => ({ disabled: record.name === 'Disabled User', name: record.name, }),
    // Column configuration not to be checked
};


const TaskList = () => {

  const [selectionType, setSelectionType] = useState('radio');


  return (
    <div>
        
      <Radio.Group onChange={({ target: { value } }) => {setSelectionType(value);}} value={selectionType}>
        <Radio value="checkbox">Checkbox</Radio>
        <Radio value="radio">radio</Radio>
      </Radio.Group>

      <Divider />

      <Table rowSelection={{type: selectionType, ...rowSelection,}} columns={columns} dataSource={data}/>
       
    </div>
  );
};

export default TaskList;