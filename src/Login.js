import React, { useState } from 'react';
import axios from "axios";
import { setUserSession, getUser } from './Utils/common';

const Login = (props) => {
    const user = getUser();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        setError(null);
        setLoading(true);
        axios.post("http://localhost:5000/users/signin", {
            username: username,
            password: password
        }).then(response => {
            setLoading(false);
            setUserSession(response.data.token, response.data.user)
            console.log(response.data.user)
            props.history.push('/home');
        }).catch(error => {
            setLoading(false)
            if (error?.response?.status === 401 || error?.response?.status === 400) {
                setError(error.response.data.message);
            }
            else {
                setError("something went wrong. Please try again later.");
            }
        });
    }

    return (
        <div>
            {!user ? <div>
                Login <br /><br />
                <div>
                    Username <br />
                    <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    Password <br />
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div><br />
                {error && <div className="error">{error}</div>}
                <input
                    type="button"
                    value={loading ? "Loading..." : "Login"}
                    disabled={loading}
                    onClick={handleLogin}
                />
            </div> : <p>Already logged in</p>}
        </div>
    )
}

export default Login;
