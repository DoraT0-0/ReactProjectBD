import axios from 'axios';
import {React, useContext, useState} from 'react'
import './Auth.css';
import {useNavigate} from 'react-router-dom'
import {AuthContex} from '../../helpers/AuthContex'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {SetAuthState} = useContext(AuthContex)
 
  const login = () => {
    const data = {email: email, password: password}
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if(response.data.error) console.log(response.data.error)
      else{
        localStorage.setItem('token', response.data.token)
        SetAuthState({
          status: true,
          email: response.data.email,
          id: response.data.id
        })
        navigate('/')
      }
    })
  }

  return (
    <div className='Auth'>
      <div className='FormContainer'>
        <label>Почта: </label>
        <input type="text" id='inputData' placeholder='Введите почту' 
        onChange={(event) => {setEmail(event.target.value)}}/>
        <label>Пароль: </label>
        <input type="password" id='inputData' placeholder='Введите пароль' 
        onChange={(event) => {setPassword(event.target.value)}}/>
        <button onClick={login}>Войти</button>
      </div>
    </div>
  )
}

export default Login
