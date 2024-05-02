import React from 'react'
import './Auth.css';
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const Register = () => {
    const navigate = useNavigate()
    const initialValues = {
        email: "",
        phone: "",
        password: "",
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().required().max(60).min(3),
        phone: Yup.string().required().max(12),
        password: Yup.string().required().max(20).min(5),
    })

    const onSumbit = (data) => {
        axios.post("http://localhost:3001/auth", data).then((response) => {
          navigate('/login')
      })
    }
  return (
    <div className='Auth'>
      <Formik initialValues={initialValues} onSubmit = {onSumbit} validationSchema = {validationSchema}>
        <Form className='FormContainer'>
            <label>Почта: </label>
            <ErrorMessage name="email" component="span" className='error' />
            <Field id = "inputData" name="email" placeholder = "Введите почту"/>
            <label>Телефон: </label>
            <ErrorMessage name="phone" component="span" className='error' />
            <Field id = "inputData" name="phone" placeholder = "Введите телефон"/>
            <label>Пароль: </label>
            <ErrorMessage name="password" component="span" className='error' />
            <Field type = 'password' id = "inputData" name="password" placeholder = "Введите пароль"/>
            <button type ="submit">Зарегистрироваться</button>
        </Form>
      </Formik>
    </div>
  )
}

export default Register
