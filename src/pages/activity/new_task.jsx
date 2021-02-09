// task_form
// TaskForm

import { Form, Input, Button, Select, DatePicker, Card, Row, Col } from 'antd';
import React from 'react';
import TaskBreakdown from './task_creation/task_breakdown';
import TaskTrip from './task_creation/task_trip';
import TaskRequirements from './task_creation/task_requirements';
// import request from 'umi-request';

const { RangePicker } = DatePicker;
const { Option } = Select;

let report_to = [{ label: 'Abenezer', value: 'Abenezer' }, 
                { label: 'Chan', value: 'Chan' },
                { label: 'Shuga', value: 'Shuga' },
                { label: 'William', value: 'William' },
                { label: 'Mikias', value: 'Mikias' }]

const formItemLayout = { labelCol: { span: 7 }, labelAlign: "right", wrapperCol: { span: 30, }, };


class NewTask extends React.Component {
  formRef = React.createRef();
  rangeConfig = { rules: [ { type: 'array', required: true, message: 'Please select date!', }, ], };

  onChange(value) {console.log(`selected ${value}`);}



  onFinish = (values) => { 

    const rangeValue = values['task_duration'];
    const value = { ...values, 'task_duration': [rangeValue[0].format('YYYY-MM-DD'), 
                                              rangeValue[1].format('YYYY-MM-DD')],};

    this.onUpload(value)
    
    
                                    
    
    // request('http://127.0.0.1:5000/activity_save', {method: 'post', data: {value},})
    // .then(function(response) {console.log(response);})
    // .catch(function(error) {console.log(error);});
                         
                          
                          };

  onReset = () => {this.formRef.current.resetFields();};


  render() {
    return (
      <Form {...formItemLayout} ref={this.formRef} name="avtivity_form" onFinish={this.onFinish}>
        <br></br>
        <Card title=" Task Detail">
        <Form.Item name="report_to" label="Report back to">
            <Select showSearch   placeholder="Report back to" optionFilterProp="children"
                        onChange={this.onChange} options={report_to}>
            </Select>
        </Form.Item>
        <Form.Item name="tag_selection" label="Tag"  
            rules={[ { required: true, message: 'Please select task tag!', type: 'array', }, ]} >

            <Select mode="multiple" placeholder="Please select task tag">
                <Option value="red">Urgent</Option>
                <Option value="green">Repetative</Option>
                <Option value="blue">Regular</Option>
            </Select>

        </Form.Item>

        <Form.Item name="task_duration" label="Assignment and Delivery date" {...this.rangeConfig}>
            <RangePicker />
          </Form.Item>
            <Form.Item name="task_title" label="Regarding" rules={[ { required: true, }, ]} >
                    <Input />
            </Form.Item>
            <Form.Item name="initial_information" label="Current Information">
                  <Input.TextArea />
            </Form.Item>
            <Form.Item name="objective" label="Objective">
                  <Input.TextArea />
            </Form.Item>
          </Card>
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
          <Button type="primary" htmlType="submit"> Submit </Button>
          {/* <Button htmlType="button" onClick={this.onReset}> Reset </Button> */}
        </Form.Item>
      </Form>
    );
  }
}
export default NewTask;