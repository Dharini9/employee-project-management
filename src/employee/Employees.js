import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import EmployeeList from './components/emoloyee-list/EmployeeList';
import styles from './Employees.module.scss';
import AddEmployee from './components/new-employee/AddEmployee';

const { Header, Content, Footer } = Layout;

class Employee extends Component {
    employeeDetails;
    state = {
        isUpdatingEmployeeDetails: false
    }

    onAddEmployeeFormSubmit = (values) => {
        console.log(values);
    }

    changeNavigation = (selectedItem) => {
        console.log(selectedItem);
    }

    editEmployeeDetails = (details) => {
        console.log(details);
        this.employeeDetails = details;
        this.setState(state => ({
            ...state,
            isUpdatingEmployeeDetails: true
        }));
    }

    onSuccessUpdatingEmployeeDetails = (data) => {
        console.log(data);
        this.setState(state => ({
            ...state,
            isUpdatingEmployeeDetails: false
        }));
    }

    deleteEmployeeDetails = (employeeID) => {
        console.log(employeeID);
    }

    render() {
        return (
            <div>
                <Layout className="layout">
                    <Header>
                        <div className={styles.logo} />
                        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['Employees']}
                            onClick={this.changeNavigation}>
                            <Menu.Item key="Employees">Employees</Menu.Item>
                            <Menu.Item key="AddNewEmployee">Add new Employee</Menu.Item>
                            <Menu.Item key="Projects">Projects</Menu.Item>
                        </Menu>
                    </Header>
                    <Content style={{ padding: '0 50px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>Employee</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className={styles.siteLayoutContent}>
                            <EmployeeList
                                onEditEmployeeDetail={this.editEmployeeDetails}
                                onDeleteEmployeeDetail={this.deleteEmployeeDetails}
                            ></EmployeeList>
                            <AddEmployee
                                isEditMode={this.state.isUpdatingEmployeeDetails}
                                employeeDetails={this.employeeDetails}
                                onFormSubmit={this.onAddEmployeeFormSubmit}
                                onSuccessUpdating={this.onSuccessUpdatingEmployeeDetails}
                            ></AddEmployee>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>©2020 Created by Dharini</Footer>
                </Layout>
            </div>
        );
    }
}

/**
 * <Router>
                            <Route path="/" component={EmployeeList} />
                            <Route path="/add-employee" component={AddEmployee} />
                        </Router>
 */

export default Employee;