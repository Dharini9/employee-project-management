import gql from 'graphql-tag';

export const GetEmployeeList = gql`{
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
}`;
