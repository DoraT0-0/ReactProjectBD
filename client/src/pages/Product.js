import React, {useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {AuthContex} from '../helpers/AuthContex'
const Product = (props) => {
  const {id, img, price, name} = props.data
  const navigate = useNavigate()
  const {authState, SetAuthState} = useContext(AuthContex)

  const addToCart = () => {
    axios.get(`http://localhost:3001/cart/count/${authState.id}/${id}`, {
      headers: {
          token: localStorage.getItem('token')
      }
  }).then((response) => {
          if(response.data.error){
            alert(response.data.error)
            navigate('/login')
          }
          else{
            const count = response.data[0]
            console.log(count)
            if(count == undefined){
              axios.post("http://localhost:3001/cart", {count: 1, ClientId: authState.id, ProductId: id}, {
                headers: {
                    token: localStorage.getItem('token')
                }
                }).then((response) => {
                    if(response.data.error){
                      alert(response.data.error)
                      navigate('/login')
                    }
                    else{
                      navigate('/cart')
                    }
                })
              }
              else{
                axios.post("http://localhost:3001/cart/countupdate", {count: count.count, idC: authState.id, idP: id}, {
                  headers: {
                      token: localStorage.getItem('token')
                  }
              }).then((response) => {
                  if(response.data.error){
                    alert(response.data.error)
                    navigate('/login')
                  }
                  else{
                    navigate('/cart')
                  }
              })}
    }
  })
}
  return (
    <div className='ProductCard'>
            <div className='CardTop'>
              <div onClick={() => {navigate(`/product/${id}`)}} className='CardImg'>
              <img src={img} alt=""/>
              </div>
            </div>
            <div className='CardBottom'>
              <div classname='CardPrice'>Цена: {price} ₸</div>
              <div classname='CardTitle'>{name}</div>
              <button class="CardAdd" onClick={() => addToCart()}>В корзину</button>
            </div>
    </div>
  )
}

export default Product
