import React from 'react';
import { Query } from "react-apollo";
import { Skeleton, Card, Avatar, List } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/react-hooks';
import { GetEmployeeList } from '../../graphQL/query';
import { DeleteEmployee } from '../../graphQL/mutation';

const { Meta } = Card;

const EmployeeList = (props) => {

    const Delete_Employee = DeleteEmployee;
    const [deleteEmployee] = useMutation(Delete_Employee);

    const deleteEmployeeDetails = employeeID => {
        deleteEmployee({ variables: { id: employeeID } });
    }

    return (
        <Query
            query={GetEmployeeList}
        >
            {({ loading, error, data, refetch }) => {
                props.refetchList(refetch);
                if (loading) return (
                    <Card
                        style={{ width: 300, marginTop: 16 }}
                        actions={[
                            <EditOutlined key="edit" />,
                            <DeleteOutlined key="delete" />
                        ]}
                    >
                        <Skeleton loading={loading} avatar active />
                    </Card>
                );
                if (error) return <p>Error :(</p>;
                return (
                    <List
                        grid={{ gutter: 16, column: 3 }}
                        dataSource={data.getEmployees}
                        renderItem={employee => (
                            <List.Item>
                                <Card key={employee.id}
                                    style={{ width: "100%", marginTop: 16 }}
                                    actions={[
                                        <EditOutlined key="edit" onClick={() => props.onEditEmployeeDetail(employee)} />,
                                        <DeleteOutlined key="delete" onClick={() => {
                                            deleteEmployeeDetails(employee.id);
                                            refetch();
                                        }} />
                                    ]}
                                >
                                    <Skeleton loading={loading} avatar active>
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
            }}
        </Query>
    );
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