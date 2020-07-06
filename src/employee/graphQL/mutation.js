import gql from 'graphql-tag';

export const AddNewEmployee = gql`
    mutation AddEmployee($firstname:String!,$middlename:String!,$lastname:String!,$age:Int,$designation:String) {
        addEmployee(firstname: $firstname, middlename: $middlename, lastname: $lastname, age: $age, designation: $designation) {
            id
        }
    }
`;

export const UpdateEmployee = gql`
    mutation UpdateEmployeeDetails($id:ID!, $firstname:String!,$middlename:String!,$lastname:String!,$age:Int,$designation:String) {
        updateEmployee(id:$id, firstname: $firstname, middlename: $middlename, lastname: $lastname, age: $age, designation: $designation) {
            id
        }
    }
`;

export const DeleteEmployee = gql`
    mutation DeleteEmployee($id:ID!) {
        deleteEmployee(id: $id) {
            id
        }
    }
`;