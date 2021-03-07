import React from 'react';
import { Card, Row, Col} from 'antd';
import DonutChart from '../../components/pie_chart';
import GaugeChart from '../../components/gauge';

// import request from 'umi-request';
// import {columns, data} from './income/income_summary';


// const modalFormlayout = { labelCol: { span: 4 }, wrapperCol: { span: 24 },};
// const { Text } = Typography;




export default function Summary() {
//   const [table_values, setTable] = useState([])

//   const failureCallback = (error) => {
//       console.error("Error: " + error);}

//   useEffect( ()=>{     
//   try {
//     request.get('https://arete-server.herokuapp.com/api/incomes', { getResponse: true }).then((data)=>{setTable(data.data)}).catch(failureCallback);
//   } catch (error) {
//     failureCallback({ error });
//   }
//   }, [])
    
//   const onFinish = (values) => { 
//     const dateValue = values['date'];
//     const value = { ...values, 'date': dateValue.format('YYYY-MM-DD')};                           
//     console.log(value)
//     request('https://arete-server.herokuapp.com/api/income_save', 
//             {method: 'post', data: {value},}).then(function(response) 
//             {console.log(response);}).catch(function(error) 
//             {console.log(error);});   
//     onReset()};
    const data = [{type: 'Urgent', value: 27,},
    {type: 'Recurring', value: 30,},
    {type: 'No Tag', value: 17,},
    {type: 'Normal', value: 25,},];
    return (
        <Card>
          <Card title="Activity Summary">
            <Row align="top" justify="center" >
                <Col flex="auto">
                    <Card title="Active Tasks">
                        <DonutChart data = {data}/>
                    </Card>
                </Col>
                <Col flex='auto'>
                    <Card title="Compeletion rate">
                        <GaugeChart/>
                    </Card>
                </Col>
            </Row>
            </Card>
          <br></br>
          <Card title="Income Summary">    
          </Card> 
          <br></br>
          <Card title="Expense Summary">
          </Card> 
        </Card>
    );
}