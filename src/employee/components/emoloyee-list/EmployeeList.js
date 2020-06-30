import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";

const EmployeeList = () => (
    <Query
        query={gql`
            {
                getEmployees{
                    id
                    firstname
                    designation
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
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            return data.getEmployees.map(({ id, firstname, designation, projects }) => (
                <div key={id}>
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
            ));
        }}
    </Query>
);

export default EmployeeList;