import gql from 'graphql-tag';

export const GetEmployeeList = gql`{
    getEmployees{
        id
        firstname
        lastname
        middlename
        designation
        age
    } 
}`;

export const GetEmployeeByID = gql`
    query getEmployeeDetailByID($id:ID!){
        getEmployee(id: $id){
            id
            firstname
            lastname
            middlename
            designation
            age
        }
    }
`;
