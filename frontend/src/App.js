import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";

const GET_POKEMON_INFO = gql`
{
  users{
    name,
    email
  }
}`

function App() {
  const { data, loading, error } = useQuery(GET_POKEMON_INFO);

  const status = (loading ? "Loading" : (error) ? "Error in API" : "Success in API");

  return (
    <React.Fragment>
      <h1>User List {status}</h1>
      <div className="container">
        {data && data.users &&
          data.users.map((element, index) => (
            <div key={index} className="card">
              <div className="card-body">
                <h3>{element.name + "||" + element.email}</h3>
              </div>
            </div>
          ))}
      </div>
    </React.Fragment>
  );
}

export default App;