// task_form
// TaskForm

import { Form, Input, Button, Select, DatePicker, Card, Row, Col,  } from 'antd';
import React from 'react';
import TaskBreakdown from './task_creation/task_breakdown';
import TaskTrip from './task_creation/task_trip';
import TaskRequirements from './task_creation/task_requirements';
import request from 'umi-request';
import './task_creation/new-task.css';

const { RangePicker } = DatePicker;


let tag = [{ label: 'Urgent', value: 'urgent' }, 
           { label: 'Recurring', value: 'recurring' },
           { label: 'No Tag', value: 'no tag' },]

const formItemLayout = { labelCol: { span: 6 }, labelAlign: "right",  };


class NewTask extends React.Component {
  formRef = React.createRef();
  rangeConfig = { rules: [ { type: 'array', required: true, message: 'Please select date!', }, ], };

  onChange(value) {console.log(`selected ${value}`);}

  onReset = () => {this.formRef.current.resetFields();};

  onFinish = (values) => { 

    const rangeValue = values['task_duration'];
    const value = { ...values, 'task_duration': [rangeValue[0].format('YYYY-MM-DD'), 
                                              rangeValue[1].format('YYYY-MM-DD')],};

    
                                    
    console.log(value)
    request('https://arete-server.herokuapp.com/api/activity_save', {method: 'post', data: {value},})
    .then(function(response) {console.log(response);})
    .catch(function(error) {console.log(error);});
                         
    this.onReset()                      
                          };

  


  render() {
    return (
      <Form {...formItemLayout} ref={this.formRef} name="avtivity_form" onFinish={this.onFinish}>
        <br></br>
        <Card title=" Task Detail">
        <Row align="middle" justify="center" >
          <Col flex="25px"></Col>
          <Col flex='auto'>

        <Form.Item name="tag_selection"  rules={[ { required: true, message: 'Please select task tag!', type: 'array', }, ]} >
            <Select className = 'tag' mode="multiple" placeholder="Please select task tag" options={tag} style={{ maxWidth: 300}}>

            </Select>

        </Form.Item>

        <Form.Item name="task_duration" {...this.rangeConfig}>
            <RangePicker />
          </Form.Item>
            <Form.Item name="task_title" rules={[ { required: true, }, ]} >
                  <Input placeholder="Activity Title"/>
            </Form.Item>
            <Form.Item name="initial_information">
                  <Input.TextArea placeholder="Activity Description"/>
            </Form.Item>
            <Form.Item name="objective">
                  <Input.TextArea placeholder="Activity Objective"/>
            </Form.Item>
   
            </Col>
          <Col flex='auto'></Col>
          </Row>
           <br />
          <Form.Item >
            <TaskRequirements />
          </Form.Item>

          <Form.Item >
            <TaskBreakdown />
          </Form.Item>

          <Form.Item >
            <TaskTrip />
          </Form.Item>
          <Row gutter={[16, 16]}>
          <Col span={12}> 
          </Col>
          <Col span={12}> 
          </Col>
            </Row>

        <br></br>
        <Form.Item>
        <Row align="middle" justify="center" >
          <Col flex='auto'></Col>
          <Col flex='none'>
            <Form.Item>
              <Button type="primary" htmlType="submit"> Submit </Button>
            </Form.Item>
          </Col>
          <Col flex="50px"></Col>
        </Row>
        </Form.Item>
        </Card>
      </Form>
    );
  }
}
export default NewTask;