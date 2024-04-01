import { Outlet } from "react-router-dom"
import { Header,  Footer } from "./Components/index.js"

function Layout() {
  return (
    <>
<Header/>
<Outlet/>
<Footer/>
    </>
  )
}

export default Layout