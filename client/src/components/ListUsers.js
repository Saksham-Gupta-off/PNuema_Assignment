import React, {Fragment, useEffect, useState} from "react";

const ListUsers = () => {

    const deleteUser = async (id) => {
        try {
            const deleteUser = await fetch(`http://localhost:5000/userpage/${id}`, {
            method: "DELETE"
        });

        setUsers(users.filter(user => user.user_id !== id));
        } catch (err) {
            console.log(err.message)
        }
    }

    const [users, setUsers] = useState([]); 

    const getUsers = async () => {
        try {
            const response = await fetch("http://localhost:5000/userpage");
            const jsonData = await response.json();
            setUsers(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
    <Fragment>
    <h1 className="text-center mt-5">All Users</h1>
        <table className="table mt-5 text-center">
    <thead>
      <tr>
        <th>Name</th>
        <th>Age</th>
        <th>Email</th>
        <th>Mobile No.</th>        
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {users.map(user => (
          <tr key={user.user_id}>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{user.email}</td>
              <td>{user.mobile}</td>
              <td><button className="btn btn-danger" onClick={() => deleteUser(user.user_id)}>Delete</button></td>
          </tr>
      ))}
    </tbody>
  </table>
    </Fragment>
    );
}

export default ListUsers;