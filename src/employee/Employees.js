import React, { Component } from 'react';
import { Layout, Menu, Button, Modal } from 'antd';
import EmployeeList from './components/emoloyee-list/EmployeeList';
import styles from './Employees.module.scss';
import AddEmployee from './components/new-employee/AddEmployee';
import { BrowserRouter as Router } from "react-router-dom";
import { PlusOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

class Employee extends Component {
    employeeDetails;
    refetchList;
    state = {
        isUpdatingEmployeeDetails: false,
        isVisibleEmployeeModal: false
    }

    editEmployeeDetails = (details) => {
        this.employeeDetails = details;
        this.setState(state => ({
            isUpdatingEmployeeDetails: true,
            isVisibleEmployeeModal: true
        }));
    }

    onSuccessUpdatingEmployeeDetails = (data) => {
        this.getEmployeeListData();
        this.setState(state => ({
            isUpdatingEmployeeDetails: false
        }));
        this.openEmployeeModal(false);
    }

    onSuccessAddingEmployeeDetails = (data) => {
        this.getEmployeeListData();
        this.openEmployeeModal(false);
    }

    openEmployeeModal = isVisible => {
        if (!isVisible) {
            Modal.destroyAll();
        }
        this.setState(state => ({
            isUpdatingEmployeeDetails: !isVisible ? false : state.isUpdatingEmployeeDetails,
            isVisibleEmployeeModal: isVisible
        }));
    }

    getRefetchListFunction = refetchList => {
        this.refetchList = refetchList;
    }

    getEmployeeListData = () => {
        if (this.refetchList) {
            this.refetchList();
        }
    }

    render() {
        return (
            <Router>
                <div>
                    <Layout className="layout">
                        <Header>
                            <div className={styles.logo} />
                            <Menu theme="dark"
                                selectedKeys={this.state.activeRoute}
                                mode="horizontal" defaultSelectedKeys={['Employees']}>
                                <Menu.Item key="Employees">Employees</Menu.Item>
                            </Menu>
                        </Header>
                        <Button type="primary"
                            style={{ float: 'right', margin: '15px', width: '15%' }}
                            onClick={() => this.openEmployeeModal(true)}>
                            <PlusOutlined /> Add New Employee
                        </Button>
                        <Content style={{ padding: '0 50px' }}>
                            <div className={styles.siteLayoutContent}>
                                <EmployeeList
                                    refetchList={this.getRefetchListFunction}
                                    onEditEmployeeDetail={this.editEmployeeDetails}
                                ></EmployeeList>
                            </div>
                        </Content>
                        <Modal
                            title={this.state.isUpdatingEmployeeDetails ? 'Update Employee Details' : 'Add new Employee'}
                            centered
                            visible={this.state.isVisibleEmployeeModal}
                            footer={null}
                            onCancel={() => this.openEmployeeModal(false)}
                        >
                            <AddEmployee
                                isEditMode={this.state.isUpdatingEmployeeDetails}
                                employeeDetails={this.employeeDetails}
                                onFormSubmit={this.onAddEmployeeFormSubmit}
                                onSuccessUpdating={this.onSuccessUpdatingEmployeeDetails}
                                onSuccessAdding={this.onSuccessAddingEmployeeDetails}
                            ></AddEmployee>
                        </Modal>
                        <Footer style={{ textAlign: 'center' }}>©2020 Created by Dharini</Footer>
                    </Layout>
                </div>
            </Router>
        );
    }
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