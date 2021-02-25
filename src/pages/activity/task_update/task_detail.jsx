// task
//TaskDetail

import React from 'react';
import {Card, Table, Typography, Form } from 'antd';

const {Text} = Typography;

const modalFormlayout = { labelCol: { span: 9 }, wrapperCol: { span: 24 },};

const requirements = [
  {title: 'Req #', dataIndex: 'req_num', align: 'center', },
  {title: 'Requierment', dataIndex: 'requirement', align: 'center' },
];

const procedures = [
  {title: 'Step #', dataIndex: 'acc_num', align: 'center', },
  {title: 'Description', dataIndex: 'procedure_procedure' },
  {title: 'Cost', dataIndex: 'procedure_cost', align: 'right', },
  {title: 'Hrs', dataIndex: 'procedure_hrs', align: 'right',  },
  {title: 'Mins', dataIndex: 'procedure_mins', align: 'right' },
  ];

const trips = [
  {title: 'Trip #', dataIndex: 'acc_num', align: 'center', },
  {title: 'Location', dataIndex: 'trip_location' },
  {title: 'Cost', dataIndex: 'trip_cost', align: 'right', },
  {title: 'Hrs', dataIndex: 'trip_hrs', align: 'right',  },
  {title: 'Mins', dataIndex: 'trip_mins', align: 'right' },
  ];

const TaskDetail = () => {
  // const failureCallback = (error) => {
  //   console.error("Error: " + error);}

  // dataSource={table_values}
  // useEffect( ()=>{     
  // try {
  //   request.get('https://arete-server.herokuapp.com/api/activities', { getResponse: true }).then((data)=>{setTasks(data.data)}).catch(failureCallback);
  // } catch (error) {
  //   failureCallback({ error });
  // }
  // }, [])

  // Text>Title</Text
  return (
        <Card>
          <Card title="Task Detail">
          <Form layout="horizontal" name="userForm" labelAlign="right"  {...modalFormlayout}>
              <Form.Item name="vendor" label="Title">
                  <Text>Title</Text>
              </Form.Item>
              <Form.Item name="objective" label="Objective">
                  <Text>Title</Text>
              </Form.Item>
              <Form.Item name="description" label="Description">
                  <Text>Title</Text>
              </Form.Item>
              <Form.Item name="deadline" label="Deadland">
                  <Text>Title</Text>
              </Form.Item>
            </Form>
          </Card>
          <br></br>
          <Card title="Requirements">
              <Table columns={requirements} />
          </Card>
          <br></br>
          <Card title="Travel Information">
              <Table columns={trips} />
          </Card> 
          <br></br>
          <Card title="Procedures">
              <Table columns={procedures} />
          </Card> 
        </Card>
  );
};

export default TaskDetail;