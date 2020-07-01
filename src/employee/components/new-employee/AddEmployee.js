import React, { useEffect, useRef } from 'react';
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

    const [form] = Form.useForm();

    const Add_Employee = gql`
        mutation AddEmployee($firstname:String!,$middlename:String!,$lastname:String!,$age:Int,$designation:String) {
            addEmployee(firstname: $firstname, middlename: $middlename, lastname: $lastname, age: $age, designation: $designation) {
                id
            }
        }
    `;
    const [addNewEmployee] = useMutation(Add_Employee);

    const Update_Employee = gql`
        mutation UpdateEmployeeDetails($id:ID!, $firstname:String!,$middlename:String!,$lastname:String!,$age:Int,$designation:String) {
            updateEmployee(id:$id, firstname: $firstname, middlename: $middlename, lastname: $lastname, age: $age, designation: $designation) {
                id
            }
        }
    `;
    const [updateEmployeeDetails] = useMutation(Update_Employee);

    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }

    const { isEditMode } = props
    const prevState = usePrevious({ isEditMode });

    useEffect(() => {
        console.log('prev: ', prevState);
        console.log(props.isEditMode);
        if (prevState && props.isEditMode !== prevState.isEditMode) {
            form.setFieldsValue(props.employeeDetails);
        }
    });

    const onFinish = values => {
        console.log(values);
        if (!props.isEditMode) {
            addNewEmployee({ variables: values });
        } else {
            values['id'] = props.employeeDetails['id'];
            updateEmployeeDetails({ variables: values });
            // props.onSuccessUpdatingEmployeeDetails(values);
        }
    };

    const onReset = () => {
        form.resetFields();
    };

    // onFinish={(values) => props.onFormSubmit(values)}
    return (
        <Form {...layout} form={form} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
            <Form.Item
                name={['firstname']}
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
                name={['middlename']}
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
                name={['lastname']}
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
                name={['age']}
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
            <Form.Item name={['designation']} label="Designation">
                <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                <Button htmlType="button" onClick={onReset}>
                    Reset
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddEmployee;
