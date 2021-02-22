import React , {useState, useEffect} from 'react';
import { Table, Tabs, Card, Layout, } from 'antd';
import request from 'umi-request';
import NewTask from './new_task';
// import {columns, data} from './income/income_summary';
const { TabPane } = Tabs;

const {Content } = Layout;

const columns = [
  {title: 'Tag', dataIndex: 'tag', align: 'center',  },
  {title: 'Title', dataIndex: 'title', align: 'center',  },
  {title: 'Assigned', dataIndex: 'date_1', align: 'center',  },
  {title: 'Deadline', dataIndex: 'date_2', align: 'center' },
  {title: 'Description', dataIndex: 'description',},
  {title: 'Objective', dataIndex: 'objective',},
];



export default function TaskSummary() {
  const [tasks, setTasks] = useState([])

  const failureCallback = (error) => {
      console.error("Error: " + error);}


  useEffect( ()=>{     
  try {
    request.get('https://arete-server.herokuapp.com/api/activities', { getResponse: true }).then((data)=>{setTasks(data.data)}).catch(failureCallback);
  } catch (error) {
    failureCallback({ error });
  }
  }, [])
    
      
    return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ margin: '0 16px' }}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Task Summary"  key="1">
              <Card>
              </Card>
              <Table columns={columns} dataSource={tasks} bordered title={() => 'Header'} footer={() => 'Footer'} />
          </TabPane>
          <TabPane tab="New Task" key="2">
            <NewTask/>
          </TabPane>
          <TabPane tab="Task Update" key="3">
                <Card>
               </Card>
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
    );
}