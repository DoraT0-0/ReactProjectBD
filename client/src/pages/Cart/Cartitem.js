import React, {useContext, useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {AuthContex} from '../../helpers/AuthContex'

const Cartitem = (props) => {
  const navigate = useNavigate()
  const {authState, SetAuthState} = useContext(AuthContex)
  const [count, setCount] = useState(props.prod.count)
  console.log(count)

  const addToCart = () => {
    axios.get(`http://localhost:3001/cart/count/${authState.id}/${props.prod.id}`,
    {
      headers: {
          token: localStorage.getItem('token')
      }
    }
    ).then((response) => {
      if(response.data.error){
        alert(response.data.error)
        navigate('/login')
      }
      else{
      const count = response.data[0]
      console.log(count)
      axios.post("http://localhost:3001/cart/countupdate", {count: count.count, idC: authState.id, idP: props.prod.id, remove: false},
      {
        headers: {
            token: localStorage.getItem('token')
        }
      }
      ).then((response) => {
        if(response.data.error){
          alert(response.data.error)
          navigate('/login')
        }
        else{
          setCount(count.count+1)
          navigate('/cart')
        }
      })
    }
    })
  }

  const removeFromCart = () => {
    axios.get(`http://localhost:3001/cart/count/${authState.id}/${props.prod.id}`,
    {
      headers: {
          token: localStorage.getItem('token')
      }
    }
    ).then((response) => {
      if(response.data.error){
        alert(response.data.error)
        navigate('/login')
      }
      else{
        const count = response.data[0]
        console.log(count)
        if(count.count !== 1){
          axios.post("http://localhost:3001/cart/countupdate", {count: count.count, idC: authState.id, idP: props.prod.id, remove: true},
          {
            headers: {
                token: localStorage.getItem('token')
            }
          }
          ).then((response) => {
        if(response.data.error){
            alert(response.data.error)
            navigate('/login')
        }
        else{
          setCount(count.count-1)
          navigate('/cart')
        }
      })
      }
      else{
          axios.delete(`http://localhost:3001/cart/removefromcart/${authState.id}/${props.prod.id}`,
          {
            headers: {
                token: localStorage.getItem('token')
            }
          }).then((response) => {
            if(response.data.error){
              alert(response.data.error)
              navigate('/login')
            }
            else{
              navigate('/')
            }
        })
      }
    }
  })
}

  return (
    <div class = "cart-card">
          <div className='cart-card-left'>
            <img src={props.prod.img} alt=''/>
            <div className='name'>{props.prod.name}</div>
            <div className='count-sum'>
                <div>Sum: {props.prod.price*count}</div>
                <div>Count: {count}</div>
            </div>
          </div>
          <div className='cart-card-right'>
            <button className='addtocart' onClick={addToCart}>+</button>
            <button className='removefromcart' onClick={removeFromCart}>-</button>
          </div>
    </div>
  )
}

export default Cartitem
