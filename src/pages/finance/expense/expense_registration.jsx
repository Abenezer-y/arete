import React, { useState } from 'react';
import { Card, Row, Col, Form, Input, InputNumber, Modal, Button, Typography, DatePicker, Upload} from 'antd';
import { UploadOutlined} from '@ant-design/icons';
import { Select } from 'antd';
import EditableTable from '../../components/editable_table';

const { Option } = Select;
const { Text, Title } = Typography;
const formItemLayout = { labelCol: { span: 7 }, wrapperCol: { span: 24 },};
const modalFormlayout = { labelCol: { span: 9 }, wrapperCol: { span: 24 },};
function onChange(value) {console.log(`selected ${value}`);}
function onBlur() {console.log('blur');}
function onFocus() {console.log('focus');}
function onSearch(val) {console.log('search:', val);}

// reset form fields when modal is form, closed
// const useResetFormOnCloseModal = ({ form, visible }) => {
//   const prevVisibleRef = useRef();
//   useEffect(() => { prevVisibleRef.current = visible; }, [visible]);
//   const prevVisible = prevVisibleRef.current;
//   useEffect(() => { if (!visible && prevVisible) { form.resetFields(); } }, [visible]); };

const ModalForm = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  // useResetFormOnCloseModal({ form, visible, });
  const onOk = () => { form.submit(); };

  return (
    <Modal title="Basic Drawer" visible={visible} onOk={onOk} onCancel={onCancel}>
      <Form form={form} layout="horizontal" name="userForm" labelAlign="right"  {...modalFormlayout}>
        <Form.Item name="vendor" label="Vendor" rules={[ { required: true, }, ]} >
          <Input />
        </Form.Item>
        <Form.Item name="reg" label="Registration Number" rules={[ { required: true, }, ]} >
          <InputNumber />
        </Form.Item>
        <Form.Item name="phone" label="Telephone number" rules={[ { required: true, }, ]} >
          <InputNumber />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const Expense = () => {
  const [visible, setVisible] = useState(false);
  const [main_form] = Form.useForm();

  const showUserModal = () => {setVisible(true);};
  const hideUserModal = () => {setVisible(false);};
  // const onFinish = (values) => {console.log('Finish:', values);};
  

  return (
    <>
    <br />
    <Card  title="Expense Registration Form">
    <Form form={main_form} layout="horizontal" name="userForm" labelAlign="right"  {...formItemLayout}>
      


            <Form.Item name="type"  label={<span>Transaction type</span>} rules={[ { required: true, }, ]} >
        <Select defaultValue="purchase" style={{ width: 200 }} >
          <Option value="service">Service</Option>
          <Option value="purchase">Purchase</Option>
        </Select>
        </Form.Item> 
           
            
            <Form.Item name="amount" label="Amount" rules={[ { required: true, }, ]} >
        <InputNumber
            defaultValue={0}
            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
            onChange={onChange}
            style={{ width: 200 }}
          />
        </Form.Item>
            
         


            <Form.Item name="acc"  label={<span>Expense Account</span>} rules={[ { required: true, }, ]} >
          <Select style={{ width: 200 }} >
          <Option value="service">Service</Option>
          <Option value="purchase">Purchase</Option>
        </Select>
      </Form.Item>
          
           
            <Form.Item name="payment" label="Payment Method" rules={[ { required: true, }, ]} >
            <Select style={{ width: 200 }} >
          <Option value="service">Cash</Option>
          <Option value="purchase">Check</Option>
        </Select>
        </Form.Item>
      
        <Form.Item name="description" label= {<Text strong= "true">Reason for transaction</Text>}  rules={[ { required: true, }, ]} >
        <Input />
      </Form.Item>


    
    <br />
    <Card title= {<Title level={4}>Receipt Details</Title>}>
            <Row align="middle" >
            <Col flex='auto'>
            <Form.Item name="date" label={<Text strong= "true">Date</Text>} rules={[ { required: true, }, ]} >
              <DatePicker />
            </Form.Item>
            </Col>
            <Col flex='auto'>
            <Form.Item name="receipt_number" label={<Text strong= "true">Receipt Number</Text>} rules={[ { required: true, }, ]} >
              <Input />
            </Form.Item>
            </Col>
            </Row>

      </Card>
      <br />
      <Card title= {<Title level={4}>
      <Row align="middle" gutter={8}>
            <Col flex="auto">
            <Title level={4}>Vendor Information</Title>
            </Col>
            <Col flex='none'>
            <Select showSearch style={{ width: 200 }} placeholder="Select a vendor" optionFilterProp="children"
                    onChange={onChange} onFocus={onFocus} onBlur={onBlur} onSearch={onSearch} 
                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="tom">Tom</Option>
            </Select>
            
            </Col>
            <Col flex='none'>
            <Button htmlType="button" style={{ margin: '0 8px', }} onClick={showUserModal} >
                  Add Vendor
            </Button>
            <ModalForm visible={visible} onCancel={hideUserModal} />
            </Col>
            </Row>
            </Title>}>
            <Row justify="center">
              <Col flex="150px">
         
                  <Text strong= "true"> Name </Text>
                  </Col>
              <Col flex="auto">
                  <Text  type="secondary"> All Mart Supermarket </Text>
           
              </Col>
            </Row>
            <Row justify="center">
            <Col flex="150px">
                
                  <Text strong= "true"> Registration Number </Text>
                  </Col>
              <Col flex="auto">
                  <Text  type="secondary"> 0045678792 </Text>
                
              </Col>
            </Row>
            <Row justify="center">
              <Col flex="150px">
              <Text strong= "true"> Telephone Number </Text>
              </Col>
              <Col flex="auto">
              <Text  type="secondary"> 0911111213 </Text>
              </Col>
              
            </Row>
            <Row justify="center">
              <Col flex="150px">
                
                  <Text strong= "true"> Address </Text>
                  </Col>
              <Col flex="auto">
                  <Text  type="secondary"> Addis Ababa, Bole W.05 K.07 H.No 567</Text>
               
              </Col>
            </Row>


            
      </Card>
      <br />

      <EditableTable/>


      <br />
      <Card title= {<Title level={4}>Upload Receipt</Title>}>
        <Form.Item
        name="upload"
        label="Upload Receipts"
        valuePropName="fileList"
      >
        <Upload name="logo" action="/upload.do" listType="picture">
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>
      </Card>
      </Form>
      <br />
      <Card title= {<Title level={4}>Amount Summary</Title>}>
      <Row align="middle" justify="space-around" gutter={[8, 14]}>
            <Col flex="150px"><Text strong= "true"> Name: </Text></Col>
            <Col><Text  type="secondary"> name of vendor or seller</Text></Col>
            <Col flex="150px"><Text strong= "true"> Name: </Text></Col>
            <Col><Text  type="secondary"> name of vendor or seller</Text></Col>
      </Row>
      </Card>
      </Card>

    </>
  );
};

export default Expense;