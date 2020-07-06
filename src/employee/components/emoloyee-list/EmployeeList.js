import React from 'react';
import { Skeleton, Card, Avatar, List } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Meta } = Card;

const EmployeeList = (props) => {

    if (props.employeeListQueryObj.loading) return (
        <Card
            style={{ width: 300, marginTop: 16 }}
            actions={[
                <EditOutlined key="edit" />,
                <DeleteOutlined key="delete" />
            ]}
        >
            <Skeleton loading={props.employeeListQueryObj.loading} avatar active />
        </Card>
    );
    if (props.employeeListQueryObj.error) return <p>Error :(</p>;
    if (props.employeeListQueryObj.employeeDataSource && props.employeeListQueryObj.employeeDataSource.getEmployees) return (
        <List
            grid={{ gutter: 16, column: 3 }}
            dataSource={props.employeeListQueryObj.employeeDataSource.getEmployees}
            renderItem={employee => (
                <List.Item>
                    <Card key={employee.id}
                        style={{ width: "100%", marginTop: 16 }}
                        actions={[
                            <EditOutlined key="edit" onClick={() => props.onEditEmployeeDetail(employee.id)} />,
                            <DeleteOutlined key="delete" onClick={() => props.onDeleteEmployeeDetail(employee.id)} />
                        ]}
                    >
                        <Skeleton loading={props.employeeListQueryObj.loading} avatar active>
                            <Meta
                                avatar={
                                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                }
                                title={`${employee.firstname} ${employee.lastname}`}
                                description={employee.designation ? `Designation: ${employee.designation}` : ''}
                            />
                        </Skeleton>
                    </Card>
                </List.Item>
            )}
        />
    )
    return ('No Data');
};

/**
 * <div key={id}>
                    <p>{`${firstname} : ${designation}`}</p>
                    <div>
                        {
                            projects && projects.length && (
                                <p>
                                    {
                                        projects.map((project) => {
                                            return <span key={project.id}> {project.name} </span>;
                                        })
                                    }
                                </p>
                            )
                        }
                    </div>
                </div>
 */

export default EmployeeList;