import React, { useState, useEffect } from "react"
import { loginData } from "../../loginData"

import "./Login.css"

const Login = (props) => {

    const [inputData, setInputData] = useState({
        username: "",
        password: ""
    })

    const handleChange = e => {
        let name = e.target.name
        let value = e.target.value

        setInputData(prev => {
            return {
                ...prev,
                [name] : value
            }
        })
    }

    const handleLogin = () => {
        if(inputData.username.length > 0 && inputData.password.length > 0) {
            if(loginData[inputData.username]) {
                if(loginData[inputData.username] === inputData.password) {
                    alert("Login Successful")
                    localStorage.setItem('username', inputData.username)
                    props.history.push({
                        pathname: '/addPost',
                        username: inputData.username
                    })
                } else {
                    alert("Wrong details")
                }
            } else {
                alert("Wrong details")
            }
        }
    }

    return (
        <div className="login-root">
            <p>Please login</p>
            <div className="login-block">
                <div>
                    <p>Username</p>
                    <input type="text" onChange={handleChange} name="username" value={inputData.username}/>
                </div>
                <div>
                    <p>Password</p>
                    <input type="password" onChange={handleChange} name="password" value={inputData.password}/>
                </div>
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    )
}

export default Login;