import React from 'react'
import axios from 'axios'
import {useEffect, useState, useContext} from 'react'
import {AuthContex} from '../helpers/AuthContex'
import Product from './Product'
import {Dropdown, DropdownButton} from 'react-bootstrap';

function Home() {
  const [product, setProduct] = useState([])
  const {authState} = useContext(AuthContex)
  const [categor_list, SetCategor_list] = useState([])
  const [category, setCategory] = useState(0);
  console.log(authState)
  let selectCategory = product.filter((cat) => cat.CategoriaId === category);
  if(category === 0) {
    selectCategory = product
  }
  console.log('wqe',selectCategory)

  useEffect(()=>{
    axios.get("http://localhost:3001/categorias").then((response) => {
          SetCategor_list(response.data)})
    axios.get("http://localhost:3001/products").then((response) => {
      setProduct(response.data)
    })
  }, [])

  return (
    <>
    <div className='Home'>
    <DropdownButton id="dropdown-basic-button" title="Категории">
        <Dropdown.Item onClick={() => {setCategory(0)}}>Весь товар</Dropdown.Item>
        {categor_list.map((val, key) => {
              return(<Dropdown.Item onClick={() => {setCategory(key+1)}}>{val.categorias}</Dropdown.Item>)
          })
        }
    </DropdownButton>
    </div>
    <div className="Cards">
      {
      selectCategory.map((value) => {
        return <Product data = {value}/>
      })
      }
      {authState.status && (<>
      {authState.admin && (
        <div className='ProductCard'>
              <a href="/createproduct" className='CardImg'>
                <img src='https://www.creativefabrica.com/wp-content/uploads/2019/05/Add-icon-by-ahlangraphic-1.jpg' alt="add"/>
              </a>
        </div>
      )
      }
      </>)}
    </div>
    </>
  )
}

export default Home
