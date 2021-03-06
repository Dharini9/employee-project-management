import React, { useEffect, useRef } from 'react';
import { Form, Input, InputNumber, Button } from 'antd';

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
        onReset();
        if ((prevState && props.isEditMode && !prevState.isEditMode) || (!prevState && props.isEditMode)) {
            form.setFieldsValue(props.employeeDetails);
        }
    });

    const onFinish = values => {
        if (!props.isEditMode) {
            props.onSuccessAdding({ variables: values });
        } else {
            values['id'] = props.employeeDetails['id'];
            props.onSuccessUpdating({ variables: values });
        }
    };

    const onReset = () => {
        form.resetFields();
    };

    // onFinish={(values) => props.onFormSubmit(values)}
    return (
        <Form {...layout} form={form} name="nest-messages" onFinish={onFinish}
            validateMessages={validateMessages}>
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
