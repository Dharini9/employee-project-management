import React from 'react';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import 'antd/dist/antd.css';
import Employee from './employee/Employees';

const client = new ApolloClient({
  uri: "http://192.168.4.31:5000/graphql"
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <Employee></Employee>
      </div>
    </ApolloProvider>
  );
}

export default App;
