import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Skeleton, Card, Avatar } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/react-hooks';

const { Meta } = Card;

const EmployeeList = (props) => {

    const Delete_Employee = gql`
        mutation DeleteEmployee($id:ID!) {
            deleteEmployee(id: $id) {
                id
            }
        }
    `;
    const [deleteEmployee] = useMutation(Delete_Employee);

    const deleteEmployeeDetails = employeeID => {
        console.log(employeeID);
        deleteEmployee({ variables: { id: employeeID} });
    }

    return (
        <Query
            query={gql`
            {
                getEmployees{
                    id
                    firstname
                    lastname
                    middlename
                    designation
                    age
                    projects {
                        id
                        name
                        description
                    }
                } 
            }
        `}
        >
            {({ loading, error, data }) => {
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
                return data.getEmployees.map((employee) => (
                    <Card key={employee.id}
                        style={{ width: 500, marginTop: 16 }}
                        actions={[
                            <EditOutlined key="edit" onClick={() => props.onEditEmployeeDetail(employee)} />,
                            <DeleteOutlined key="delete" onClick={() => deleteEmployeeDetails(employee.id)} />
                        ]}
                    >
                        <Skeleton loading={loading} avatar active>
                            <Meta
                                avatar={
                                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                }
                                title={`${employee.firstname} ${employee.lastname}`}
                                description={`${employee.designation}`}
                            />
                        </Skeleton>
                    </Card>
                ));
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