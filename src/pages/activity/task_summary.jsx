import React , {useState, useEffect} from 'react';
import { Table, Tabs, Layout, } from 'antd';
import request from 'umi-request';
import NewTask from './new_task';
// import TaskDetail from './task_update/task_detail';
import { Link } from 'react-router-dom';

// import {columns, data} from './income/income_summary';
const { TabPane } = Tabs;
const {Content } = Layout;
const backend_server = process.env.REACT_APP_BACKEND_URI

export default function TaskSummary() {
  const [tasks, setTasks] = useState([])
  const failureCallback = (error) => {
      console.error("Error: " + error);}

  useEffect( ()=>{     
        try {
          request.get(`${backend_server}activities`, { getResponse: true }).then((data)=>{setTasks(data.data)}).catch(failureCallback);
        } catch (error) {
          failureCallback({ error });
        }
        }, [])

 
  const columns = [
    {title: 'Tag', dataIndex: 'tag', align: 'center', fixed: 'left', width: 50, },
    {title: 'Title', dataIndex: 'title',  fixed: 'left', width: 150, 
      render: ( text, record, index) => <Link to={`/detail/${record.key}`} >{text}</Link>},
    {title: 'Assigned', dataIndex: 'date_1', align: 'center', width: 90  },
    {title: 'Deadline', dataIndex: 'date_2', align: 'center', width: 90 },
    {title: 'Description', dataIndex: 'description', width: 200,},
    {title: 'Objective', dataIndex: 'objective', width: 200,},
  ];

      
    return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ margin: '0 16px' }}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Task Summary"  key="1">
            <Table title={() => 'Activity Summary'} columns={columns} rowKey={record =>record.id} 
                   dataSource={tasks} bordered scroll={{ x: 1200, y: 1200 }} size= 'default'/>
          </TabPane>
          <TabPane tab="New Task" key="2">
            <NewTask/>
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
    );
}
