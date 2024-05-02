import React, {useContext, useState, useEffect} from 'react'
import './Cart.css';
import Cartitem from './Cartitem'
import {AuthContex} from '../../helpers/AuthContex'
import axios from 'axios';

const Cart = () => {
  const {authState, SetAuthState} = useContext(AuthContex)
  const [CartProd, setCartProd] = useState([])

  useEffect(()=>{
    async function fetchdata(){
        const Cart_Prod = await axios.get(`http://localhost:3001/cart/${authState.id}`)
        setCartProd(Cart_Prod.data)
    }
  fetchdata()
  },[authState])

  console.log('1', CartProd)

  return (
    <div className='Appp'>
      {CartProd.map((value) => {
        return <Cartitem prod = {value}/>
      })}
        <div className='butt'>
            <button className='AscOrder'>Оформить заказ</button>
        </div>

    </div>
  )
}

export default Cart
