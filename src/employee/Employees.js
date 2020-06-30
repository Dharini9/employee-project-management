import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import EmployeeList from './components/emoloyee-list/EmployeeList';
import styles from './Employees.module.scss';
import AddEmployee from './components/new-employee/AddEmployee';

const { Header, Content, Footer } = Layout;

class Employee extends Component {

    onAddEmployeeFormSubmit = (values) => {
        console.log(values);
    }

    render() {
        return (
            <div>
                <Layout className="layout">
                    <Header>
                        <div className={styles.logo} />
                        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['Employees']}>
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
                            <EmployeeList></EmployeeList>
                        </div>
                        <div>
                            <AddEmployee onFormSubmit={this.onAddEmployeeFormSubmit}></AddEmployee>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>©2020 Created by Dharini</Footer>
                </Layout>
            </div>
        );
    }
}

export default Employee;