import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Form, Input, InputNumber, Button } from 'antd';
import gql from 'graphql-tag';

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 8,
    },
};

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not validate email!',
        number: '${label} is not a validate number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

const AddEmployee = (props) => {
    const Add_Employee = gql`
        mutation AddEmployee($firstname:String!,$middlename:String!,$lastname:String!,$age:Int,$designation:String) {
            addEmployee(firstname: $firstname, middlename: $middlename, lastname: $lastname, age: $age, designation: $designation) {
                id
            }
        }
    `;
    const [addTodo] = useMutation(Add_Employee);

    const onFinish = values => {
        console.log(values);
        addTodo({ variables: values['user'] });
    };

    // onFinish={(values) => props.onFormSubmit(values)}
    return (
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
            <Form.Item
                name={['user', 'firstname']}
                label="First Name"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name={['user', 'middlename']}
                label="Middle Name"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name={['user', 'lastname']}
                label="Last Name"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name={['user', 'age']}
                label="Age"
                rules={[
                    {
                        type: 'number',
                        min: 18,
                        max: 99,
                    },
                ]}
            >
                <InputNumber />
            </Form.Item>
            <Form.Item name={['user', 'designation']} label="Designation">
                <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddEmployee;
