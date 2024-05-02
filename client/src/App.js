import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import CreateProduct from './pages/create/CreateProduct';
import CreateCategor from './pages/create/CreateCategor';
import Header from './pages/Header';
import ProductDetalis from './pages/ProductDetalis'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Reports from './pages/reports/Reports'
import CreateProvider from './pages/create/CreateProvider'
import {AuthContex} from './helpers/AuthContex'
import {useState, useEffect} from 'react'
import axios from 'axios';
import Cart from './pages/Cart/Cart'

function App() {
  const [authState, SetAuthState] = useState({
    status: false,
    email: "",
    id: 0,
    admin: false
  })

  useEffect(()=>{
    axios.get('http://localhost:3001/auth/auth', {headers: {
      token: localStorage.getItem('token')
    }}).then((response) => {
      if(response.data.error){
        SetAuthState({
          ...authState, status : false
        })
      }
      else {
        SetAuthState(
          {
            status: true,
            email: response.data.email,
            id: response.data.id,
            admin: response.data.admin
          }
        )
      }
    })
  }, [])
  return (
    <div>
      <AuthContex.Provider value={{authState, SetAuthState}}>
        <Router>
          <Header/>
          <Routes>
            <Route path='/' exact element={<Home/>}/>
            <Route path='/createproduct' exact element={<CreateProduct/>}/>
            <Route path='/product/:id' exact element={<ProductDetalis/>}/>
            <Route path='/login' exact element={<Login/>}/>
            <Route path='/register' exact element={<Register/>}/>
            <Route path='/reports' exact element={<Reports/>}/>
            <Route path='/createcategorias' exact element={<CreateCategor/>}/>
            <Route path='/createproviders' exact element={<CreateProvider/>}/>
            <Route path='/cart' exact element={<Cart/>}/>
          </Routes>
        </Router>
      </AuthContex.Provider>
    </div>
  );
}

export default App;
