import {React} from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const CreateCategor = () => {
    const navigate = useNavigate()

    const initialValues = {
        categorias : ""
    }

    const validationSchema = Yup.object().shape({
        categorias: Yup.string().required().max(100).min(3),
    })

    const onSumbit = (data) => {
        axios.post("http://localhost:3001/categorias", data, {
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
                <label>Название категории: </label>
                <ErrorMessage name="categorias" component="span" className='error' />
                <Field id = "inputCreateProduct" name="categorias" placeholder = "Название категории"/>
                <button type ="submit">Добавить категорию</button>
            </Form>
        </Formik>
        </div>
  )
}

export default CreateCategor
