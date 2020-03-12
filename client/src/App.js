import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(false);

  const fetchUsers = () => {
    setFetching(true);
    axios.get("http://localhost:5000/api/users")
      .then(res => {
        setUsers(res.data);
        setError(false);
        setFetching(false);
      }).catch(() => {
        setError(true);
        setFetching(false);
      });
  }

  useEffect(fetchUsers, []);

  return (
    <div className="App">
      <button onClick={e => {
        e.preventDefault();
        axios.post("http://localhost:5000/api/users", {
          name: "Test user",
          bio: `Born on ${Date.now()}`
        }).then(fetchUsers)
          .catch(() => setError(true));
      }}>
        Test Post
      </button>
      {fetching ?
        <p>Fetching data...</p>
        :
        error ?
          <p>Error!</p>
          :
          <div>
            {users.map(user => <div key={user.id}>
              <p>{user.name}, ID = {user.id}</p>
              <p>{user.bio}</p>
              <button onClick={e => {
                e.preventDefault();
                axios.delete(`http://localhost:5000/api/users/${user.id}`)
                  .then(fetchUsers)
                  .catch(err => console.log(err.response));
              }}>
                Delete Me!
              </button>
              <button onClick={e => {
                e.preventDefault();
                axios.put(`http://localhost:5000/api/users/${user.id}`, {
                  ...user,
                  name: "Super test user!"
                }).then(fetchUsers).catch(err => {
                  console.log(err.response);
                  setError(true)
                });
              }}>
                Change Me!
              </button>
            </div>)}
          </div>
      }
    </div>
  );
}

export default App;
