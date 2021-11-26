import React from 'react'
import { getUser, removeUserSession } from './Utils/common';

const Home = (props) => {
    const user = getUser();
    let admin = false
    let rows = null
    const handleLogout = () => {
        removeUserSession();
        // props.setToken(null)
        props.history.push('./login');
    }
    if (Array.isArray(user)) {
        admin = true
        rows = user.map(usr => {
            return (
                <tr>
                    <td>{usr.names}</td>
                    <td>{usr.email}</td>
                    <td>{usr.role}</td>
                </tr>
            )
        })
    }
    return (
        <div>
            Welcome to home page! <br />
            <table>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                </tr>
                {!admin ?
                    <tr>
                        <td>{user?.name}</td>
                        <td>{user?.email}</td>
                        <td>{user?.role}</td>
                    </tr>
                    : rows}
                <input type="button" onClick={handleLogout} value="Logout" />
            </table>
        </div>
    )
}

export default Home;
