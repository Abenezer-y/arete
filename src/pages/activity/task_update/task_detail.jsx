// task
//TaskDetail

import React, {useEffect, useState} from 'react';
import {Card, Table, Typography, Form } from 'antd';
import request from 'umi-request';
const {Text} = Typography;

const modalFormlayout = { labelCol: { span: 9 }, wrapperCol: { span: 24 },};

const requirements = [
  {title: 'Req #', dataIndex: 'key', align: 'center', },
  {title: 'Requierment', dataIndex: 'requirement' },
];

const procedures = [
  {title: 'Step #', dataIndex: 'key', align: 'center', },
  {title: 'Description', dataIndex: 'procedure_procedure' },
  {title: 'Cost', dataIndex: 'procedure_cost', align: 'right', },
  {title: 'Hrs', dataIndex: 'procedure_hrs', align: 'right',  },
  {title: 'Mins', dataIndex: 'procedure_mins', align: 'right' },
  ];

const trips = [
  {title: 'Trip #', dataIndex: 'key', align: 'center', },
  {title: 'Location', dataIndex: 'trip_location' },
  {title: 'Cost', dataIndex: 'trip_cost', align: 'right', },
  {title: 'Hrs', dataIndex: 'trip_hrs', align: 'right',  },
  {title: 'Mins', dataIndex: 'trip_mins', align: 'right' },
  ];

const TaskDetail = () => {
  
  const [task, setTask] = useState([])
  const [requirement, setRequirement] = useState([])
  const [step, setStep] = useState([])
  const [trip, setTrip] = useState([])
  // const [updates, setUpdates] = useState([])

  const failureCallback = (error) => {
    console.error("Error: " + error);}

  const successCallback = (data) => {
    const all_data = data.data

    setTask(all_data[0].acivity)
    setStep(all_data[1].procedure)
    setTrip(all_data[2].trip)
    setRequirement(all_data[3].requirement)
  }
  // dataSource={requirement}
  useEffect( ()=>{   
  const task_address = window.location.href
  const task_id = task_address.charAt(task_address.length-1)
  try {
    request(`https://arete-server.herokuapp.com/api/activity/${task_id}`, {method: 'get', getResponse: true }).then(successCallback).catch(failureCallback);
  } catch (error) {
    failureCallback({ error });
  }
  }, [])

  // Text>Title</Text
  return (
        <Card>
          <Card title="Task Detail">
          <Form layout="horizontal" name="userForm" labelAlign="right"  {...modalFormlayout}>
              <Form.Item name="vendor" label="Title">
                  <Text>{task.title}</Text>
              </Form.Item>
              <Form.Item name="objective" label="Objective">
                  <Text>{task.objective}</Text>
              </Form.Item>
              <Form.Item name="description" label="Description">
                  <Text>{task.description}</Text>
              </Form.Item>
              <Form.Item name="deadline" label="Deadland">
                  <Text>{task.date_2}</Text>
              </Form.Item>
            </Form>
          </Card>
          <br></br>
          <Card title="Procedures">
              <Table columns={procedures} dataSource={step} pagination={{ position: ['none'] }}/>
          </Card> 
          <br></br>
          <Card title="Requirements">
              <Table columns={requirements} dataSource={requirement}/>
          </Card>
          <br></br>
          <Card title="Travel Information">
              <Table columns={trips} dataSource={trip}/>
          </Card> 

        </Card>
  );
};

export default TaskDetail;