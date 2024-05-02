import {React, useState, useEffect} from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import './Reports.css'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios'

const Reports = () => {
    const [products, setProducts] = useState([]);
    const [clients, setClients] = useState([]);
    const [providers, setProviders] = useState([]);
    useEffect(()=>{
      async function fetchdata(){
        const products = await axios.get("http://localhost:3001/products/report1")
        const clients = await axios.get("http://localhost:3001/auth/report2")
        const providers = await axios.get("http://localhost:3001/provider/report3")

        setProducts(products.data)
        setClients(clients.data)
        setProviders(providers.data)
      }

      fetchdata()
    }, [])

    const footerprod = `Количество различных товаров: ${products.length}`
    const footerclients = `Количество клиентов: ${clients.length}`
    const footerproviders = `Количество поставщиков: ${providers.length}`
  return (
    <div className='Reports'>
    <Tabs defaultActiveKey="report1" id="uncontrolled-tab-example" className="mb-3"
  >
    <Tab eventKey="report1" title="Список товаров">
    <DataTable value={products} footer = {footerprod} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
        <Column field="id" header="Id" sortable></Column>
        <Column field="name" header="Наименование товара" sortable></Column>
        <Column field="quantity" header="Количество" sortable></Column>
        <Column field="price" header="Цена" sortable></Column>
        <Column field="sum" header="Сумма" sortable></Column>
    </DataTable>
    </Tab>
    <Tab eventKey="report2" title="Список клиентов">
    <DataTable value={clients} footer = {footerclients} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
        <Column field="id" header="Id" sortable></Column>
        <Column field="email" header="Почта" sortable></Column>
        <Column field="phone" header="Телефон" sortable></Column>
        <Column field="adress" header="Адрес" sortable></Column>
        <Column field="createdAt" header="Дата регистрации" sortable></Column>
    </DataTable>
    </Tab>
    <Tab eventKey="report3" title="Список поставщиков">
    <DataTable value={providers} footer = {footerproviders} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
        <Column field="id" header="Id" sortable></Column>
        <Column field="name" header="Имя" sortable></Column>
        <Column field="email" header="Почта" sortable></Column>
        <Column field="phone" header="Телефон" sortable></Column>
        <Column field="adress" header="Адрес" sortable></Column>
    </DataTable>
    </Tab>
  </Tabs>
  </div>
  )
}

export default Reports
