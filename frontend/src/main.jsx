import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route , RouterProvider, createBrowserRouter, createRoutesFromElements} from "react-router-dom"
import './index.css'
import Layout from './Layout.jsx'
import { Home } from './Components/index.js'

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<Home/>}/>

    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <RouterProvider router={route}/>
  </React.StrictMode>,
)
