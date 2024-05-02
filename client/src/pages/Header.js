import {React, useState, useEffect, useContext} from 'react'
import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';
import axios from 'axios'
import {AuthContex} from '../helpers/AuthContex'

function Header() {
  const [categor_list, SetCategor_list] = useState([])
  const {authState, SetAuthState} = useContext(AuthContex)
  useEffect(()=>{
        axios.get("http://localhost:3001/categorias").then((response) => {
          SetCategor_list(response.data)})
    }, [])

  const logout = () => {
    localStorage.removeItem('token')
    SetAuthState({
      status: false,
      email: "",
      id: 0
    })
  }

  return (
    <Navbar expand="lg" bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/" className='fs-4'>Sport-products</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
        <Nav
            className="mr-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >{console.log(authState.admin)}
            {authState.status ? (<> 
            {authState.admin && (
              <Nav.Link href="/reports" className='link-body-emphasis link-underline-opacity-75-hover fs-5' >Отчёты</Nav.Link>
            ) 
            }
              <Nav.Link href="/cart" className='link-body-emphasis link-underline-opacity-75-hover fs-5' >Корзина</Nav.Link>
              <NavDropdown title={authState.email} id="collapsible-nav-dropdown" className='drop link-body-emphasis link-underline-opacity-75-hover fs-5'>
                <NavDropdown.Item as = 'button' onClick={logout}>Выйти</NavDropdown.Item>
              </NavDropdown>
            </>) : (<>
              <Nav.Link href="/login" className='link-body-emphasis link-underline-opacity-75-hover fs-5' >Авторизация</Nav.Link>
              <Nav.Link href="/register" className='link-body-emphasis link-underline-opacity-75-hover fs-5' >Регистрация</Nav.Link>
            </>)}
        
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header

