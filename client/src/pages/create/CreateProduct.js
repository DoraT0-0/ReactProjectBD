import {React, useState, useEffect} from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const CreateProduct = () => {
    const navigate = useNavigate()

    const [categor, SetCategor] = useState([])
    const [providers, SetProviders] = useState([])

    useEffect(()=>{
        async function fetchdata(){
            const categorias = await axios.get("http://localhost:3001/categorias")
            const providers = await axios.get("http://localhost:3001/provider/name")
    
            SetCategor(categorias.data)
            SetProviders(providers.data)
          }
    
        fetchdata()
    }, [])


    const initialValues = {
        name: "",
        price: "",
        img: "",
        quantity: "",
        CategoriaId: "",
        ProviderId: "",
        description: ""
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().required().max(100).min(3),
        price: Yup.number().required(),
        img: Yup.string().required(),
        quantity: Yup.number().required(),
        CategoriaId: Yup.number().required(),
        ProviderId: Yup.number().required(),
        description: Yup.string().required()
    })

    const onSumbit = (data) => {
        axios.post("http://localhost:3001/products", data, {
            headers: {
                token: localStorage.getItem('token')
            }
        }).then((response) => {
            if(response.data.error) {
                alert(response.data.error)
                navigate('/login')
            }
            else{
            navigate('/')
            }
        })
    }

    return (
        <div className='CreateProduct'>
        <Formik initialValues={initialValues} onSubmit = {onSumbit} validationSchema = {validationSchema}>
            <Form className='FormContainer'>
                <label>Название: </label>
                <ErrorMessage name="name" component="span" className='error' />
                <Field id = "inputCreateProduct" name="name" placeholder = "Название продукта"/>
                <label>Цена: </label>
                <ErrorMessage name="price" component="span" className='error' />
                <Field id = "inputCreateProduct" name="price" placeholder = "Цена продукта"/>
                <label>Картинка: </label>
                <ErrorMessage name="img" component="span" className='error' />
                <Field id = "inputCreateProduct" name="img" placeholder = "Ссылка на кртинку продукта"/>
                <label>Описание: </label>
                <ErrorMessage name="description" component="span" className='error' />
                <Field as = 'textarea' id = "inputCreateProduct" name="description" placeholder = "Описание продукта"/>
                <label>Количество: </label>
                <ErrorMessage name="quantity" component="span" className='error' />
                <Field id = "inputCreateProduct" name="quantity" placeholder = "Количество продукта"/>
                <label>Категория: </label>
                <ErrorMessage name="CategoriaId" component="span" className='error' />
                <Field as = 'select' id = "inputCreateProduct" name="CategoriaId">
                    {categor.map((val, key) => {
                        return(<option value={key+1}>{val.categorias}</option>)
                    })
                    }
                </Field>
                <a href='/createcategorias'>Добавить категорию</a>
                <label>Поставщик: </label>
                <ErrorMessage name="ProviderId" component="span" className='error' />
                <Field as = 'select' id = "inputCreateProduct" name="ProviderId">
                    {providers.map((val, key) => {
                        return(<option value={key+1}>{val.name}</option>)
                    })
                    }
                </Field>
                <a href='/createproviders'>Добавить поставщика</a>
                
                <button type ="submit">Добавить продукт</button>
            </Form>
        </Formik>
        </div>
    )
}

export default CreateProduct
