import {React} from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const CreateCategor = () => {
    const navigate = useNavigate()

    const initialValues = {
        name: "",
        adress: "",
        phone: "",
        email: ""
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().required(),
        adress: Yup.string().required(),
        phone: Yup.string().required(),
        email: Yup.string().required()
    })

    const onSumbit = (data) => {
        axios.post("http://localhost:3001/provider", data, {
            headers: {
                token: localStorage.getItem('token')
            }
        }).then((response) => {
            if(response.data.error){
                alert(response.data.error)
                navigate('/login')
            }
            else{
            navigate('/createproduct')
            }
        })
    }
  return (
    <div className='CreateProduct'>
        <Formik initialValues={initialValues} onSubmit = {onSumbit} validationSchema = {validationSchema}>
            <Form className='FormContainer'>
                <label>Имя: </label>
                <ErrorMessage name="name" component="span" className='error' />
                <Field id = "inputCreateProduct" name="name" placeholder = "Имя поставщика"/>
                <label>Адрес: </label>
                <ErrorMessage name="adress" component="span" className='error' />
                <Field id = "inputCreateProduct" name="adress" placeholder = "Адрес"/>
                <label>Телефон: </label>
                <ErrorMessage name="phone" component="span" className='error' />
                <Field id = "inputCreateProduct" name="phone" placeholder = "Телефон"/>
                <label>Почта: </label>
                <ErrorMessage name="email" component="span" className='error' />
                <Field id = "inputCreateProduct" name="email" placeholder = "Почта"/>
                <button type ="submit">Добавить поставщика</button>
            </Form>
        </Formik>
        </div>
  )
}

export default CreateCategor
