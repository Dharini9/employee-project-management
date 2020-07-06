import React, { useState } from 'react';
import { Layout, Menu, Button, Modal } from 'antd';
import EmployeeList from './components/emoloyee-list/EmployeeList';
import styles from './Employees.module.scss';
import AddEmployee from './components/new-employee/AddEmployee';
import { BrowserRouter as Router } from "react-router-dom";
import { PlusOutlined } from '@ant-design/icons';
import { GetEmployeeList, GetEmployeeByID } from './graphQL/query';
import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks';
import { DeleteEmployee, AddNewEmployee, UpdateEmployee } from './graphQL/mutation';

const { Header, Content, Footer } = Layout;

const Employee = () => {

    const [isUpdatingEmployeeDetails, setIsUpdatingEmployeeDetails] = useState(false);
    const [isVisibleEmployeeModal, setIsVisibleEmployeeModal] = useState(false);
    const [updatingEmployeeDetails, setUpdatingEmployeeDetail] = useState({});
    const [employeeDataSource, setEmployeeDataSource] = useState({ getEmployees: [] });

    const { loading, error, refetch } = useQuery(GetEmployeeList, {
        onCompleted(response) {
            setEmployeeDataSource(response);
        },
        notifyOnNetworkStatusChange: true
    });

    const [getEmployeeByID] = useLazyQuery(GetEmployeeByID, {
        onCompleted(response) {
            if (response && response.getEmployee) {
                setUpdatingEmployeeDetail({ ...response.getEmployee });
                setIsUpdatingEmployeeDetails(true);
                setIsVisibleEmployeeModal(true);
            }
        },
        fetchPolicy: 'network-only'
    })

    const Delete_Employee = DeleteEmployee;
    const [deleteEmployee] = useMutation(Delete_Employee, {
        onCompleted(response) {
            getEmployeeListData();
        }
    });

    const Add_Employee = AddNewEmployee;
    const [addNewEmployee] = useMutation(Add_Employee, {
        onCompleted(response) {
            if (response && response['addEmployee'] && response['addEmployee']['id']) {
                getEmployeeListData();
                openEmployeeModal(false);
            }
        }
    });

    const Update_Employee = UpdateEmployee;
    const [updateEmployeeDetails] = useMutation(Update_Employee, {
        onCompleted(response) {
            getEmployeeListData();
            setIsUpdatingEmployeeDetails(false);
            openEmployeeModal(false);
        }
    });

    const editEmployeeDetails = (details) => {
        getEmployeeByID({ variables: { id: details } });
    }

    const onSuccessUpdatingEmployeeDetails = (data) => {
        updateEmployeeDetails(data);
    }

    const onSuccessAddingEmployeeDetails = (data) => {
        addNewEmployee(data);
    }

    const openEmployeeModal = isVisible => {
        if (!isVisible) {
            Modal.destroyAll();
        }
        setIsUpdatingEmployeeDetails(!isVisible ? false : isUpdatingEmployeeDetails);
        setIsVisibleEmployeeModal(isVisible);
    }

    const deleteEmployeeDetail = deletedEmployeeID => {
        deleteEmployee({ variables: { id: deletedEmployeeID } });
    }

    const getEmployeeListData = () => {
        if (refetch) {
            refetch();
        }
    }

    return (
        <Router>
            <div>
                <Layout className="layout">
                    <Header>
                        <div className={styles.logo} />
                        <Menu theme="dark"
                            mode="horizontal" defaultSelectedKeys={['Employees']}>
                            <Menu.Item key="Employees">Employees</Menu.Item>
                        </Menu>
                    </Header>
                    <Button type="primary"
                        style={{ float: 'right', margin: '15px', width: '15%' }}
                        onClick={() => openEmployeeModal(true)}>
                        <PlusOutlined /> Add New Employee
                    </Button>
                    <Content style={{ padding: '0 50px' }}>
                        <div className={styles.siteLayoutContent}>
                            <EmployeeList
                                employeeListQueryObj={{ loading, error, employeeDataSource, refetch }}
                                onEditEmployeeDetail={editEmployeeDetails}
                                onDeleteEmployeeDetail={deleteEmployeeDetail}
                            ></EmployeeList>
                        </div>
                    </Content>
                    <Modal
                        title={isUpdatingEmployeeDetails ? 'Update Employee Details' : 'Add new Employee'}
                        centered
                        visible={isVisibleEmployeeModal}
                        footer={null}
                        onCancel={() => openEmployeeModal(false)}
                    >
                        <AddEmployee
                            isEditMode={isUpdatingEmployeeDetails}
                            employeeDetails={updatingEmployeeDetails}
                            onSuccessUpdating={onSuccessUpdatingEmployeeDetails}
                            onSuccessAdding={onSuccessAddingEmployeeDetails}
                        ></AddEmployee>
                    </Modal>
                    <Footer style={{ textAlign: 'center' }}>©2020 Created by Dharini</Footer>
                </Layout>
            </div>
        </Router>
    );
}

/**
 * <Route exact path="/">
                                        <EmployeeList
                                            onEditEmployeeDetail={this.editEmployeeDetails}
                                        ></EmployeeList>
                                    </Route>
                                    <Route path="/new-employee">
                                        <AddEmployee
                                            isEditMode={this.state.isUpdatingEmployeeDetails}
                                            employeeDetails={this.employeeDetails}
                                            onFormSubmit={this.onAddEmployeeFormSubmit}
                                            onSuccessUpdating={this.onSuccessUpdatingEmployeeDetails}
                                        ></AddEmployee>
                                    </Route>

                                    <Menu.Item key="Employees">
                                    <Link to="/">Employees</Link>
                                </Menu.Item>
                                <Menu.Item key="AddNewEmployee">
                                    <Link to="/new-employee">Add new Employee</Link>
                                </Menu.Item>
 */

/**
 * <Router>
                            <Route path="/" component={EmployeeList} />
                            <Route path="/add-employee" component={AddEmployee} />
                        </Router>
 */

export default Employee;