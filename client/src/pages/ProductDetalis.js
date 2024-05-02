import {React, useState, useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import {AuthContex} from '../helpers/AuthContex'
import {useNavigate} from 'react-router-dom'
function ProductDetalis() {
    const [product, SetProduct] = useState({})
    const [provider, SetProvider] = useState({})
    let {id} = useParams()
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

    useEffect(()=>{
        async function fetchdata(){
            const product = await axios.get(`http://localhost:3001/products/ById/${id}`)
            SetProduct(product.data)
            const provider = await axios.get(`http://localhost:3001/provider/ById/${product.data.ProviderId}`)
            SetProvider(provider.data)
          }
          console.log(product.data)
        fetchdata()
      }, [])


    return (
            <div className='content'>
                <div className='left'>
                    <img src={product.img} alt=''/>
                </div>
                <div className='right'>
                    <div className='card_detalis_name'>{product.name}</div>
                    <div className='card_detalis_price'>Цена: {product.price} ₸</div>
                    <div className='card_detalis_description'>Описание : {product.description}</div>
                    <div className='card_detalis_description'>Поставщик : 
                        <div>Название: {provider.name} </div>
                        <div>Адрес: {provider.adress} </div>
                    </div>
                    <button className='card_detalis_tocart' onClick={addToCart}>В корзину</button>
                </div>
            </div>
  )
}

export default ProductDetalis
