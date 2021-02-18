// task_requirements
// TaskRequirements

import React from 'react';
import { Form, Input, Button, Col, Row, Upload, Card} from 'antd';
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import './new-task.css';

class UploadComponent extends React.Component {
  state = {
    fileList: [],
    uploading: false, };

  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach(file => {formData.append('files[]', file);});

    this.setState({ uploading: true, });
  };

  render() {
    const { uploading, fileList } = this.state;
    const props = {
      onRemove: file => { this.setState(state => {
                          const index = state.fileList.indexOf(file);
                          const newFileList = state.fileList.slice();
                          newFileList.splice(index, 1);
          return { fileList: newFileList, };}); },

      beforeUpload: file => { this.setState(state => ({fileList: [...state.fileList, file], })); return false;},

      fileList,};

    return (
      <>
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>

        <Button type="primary" onClick={this.handleUpload} disabled={fileList.length === 0} loading={uploading} style={{ marginTop: 16 }}>
          {uploading ? 'Uploading' : 'Start Upload'}
        </Button>
      </>
    );
  }
}








export default function TaskRequirements(props){

  return (
    <>
      <Card title="Requirements to complet task">
      <Form.List name="requirements">
        {(fields, { add, remove }) => (
          <>
            {fields.map(field => (
              <Row  key={field.key} gutter={[16, 16]}>
                <Col flex="auto">
                <Form.Item  {...field} label={[field.key," Reqirements"]} name={[field.name, 'requirement']} 
                          fieldKey={[field.fieldKey, 'requirement']}  
                          rules={[{ required: true, message: 'Missing Item Break Down' }]}>
                  <Input />
              </Form.Item>
                </Col>
                <Col flex="none">
                <Form.Item>
              <UploadComponent />
              </Form.Item>
                </Col>
                <Col flex="none">
                <Form.Item>
              <MinusCircleOutlined onClick={() => remove(field.name)} />
              </Form.Item>
                </Col>
              </Row>

            ))}
           
                
                <Form.Item>
                <Button onClick={() => add()}  icon={<PlusOutlined />}>
                        Add Requirements
                    </Button>
                </Form.Item>
            

          </>
        )}
      </Form.List>
      </Card>
      </>
  );
};
 
