import { Fragment, useEffect, useState } from "react";
import SignIn from "./pages/signIn";
import axiosApi from "./services/axiosInstance.js";
import { Navbar, NavbarBrand } from "reactstrap"
import { IValidaToken } from "./types";
import { ToastContainer } from "react-toastify";
import Home from "./pages/home";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined)
  const [titulo, setTitulo] = useState<string>('Login')

  const token = localStorage.getItem('token')

  const headerTitle = localStorage.getItem('header-tittle')

  const validaToken = async () => {
    try {
      const { data } = await axiosApi.get('/valida-token')
      const { status }: IValidaToken = data
      setIsAuthenticated(status)
    } catch (error) {
      console.log(error)
      setIsAuthenticated(false)
    }
  }
  useEffect(() => {
    if (token !== null && isAuthenticated === undefined) {
      validaToken()
    }
    // eslint-disable-next-line
  }, [token])

  useEffect(() => {
    if (headerTitle !== undefined && headerTitle !== null) {
      setTitulo(headerTitle)
    }
  }, [headerTitle])

  return (
    <Fragment>
      <ToastContainer />
      <Navbar color="dark" dark style={{ justifyContent: 'space-evenly' }}>
        <NavbarBrand href="/" className="mr-auto">Teste - {titulo}</NavbarBrand>
      </Navbar>
      {
        isAuthenticated ?
          <Home /> :
          <SignIn setIsAuthenticated={setIsAuthenticated} />
      }
    </Fragment>
  );
}

export default App;
