import './App.css';
import { Navigate, BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
//import { createTheme } from '@mui/material';
import EntityList from './pages/EntityList';
import AddressForm from './pages/AddressForm';
import Axios from 'axios'
import { configure } from 'axios-hooks'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth0 } from "@auth0/auth0-react";
import Alert from '@mui/material/Alert';
import ContactInfoForm from './pages/ContactInfoForm';
import AirlineCompanyForm from './pages/AirlineCompanyForm';
import FlightClassForm from './pages/FlightClassForm';
import RoleForm from './pages/RoleForm';
import AirportForm from './pages/AirportForm';
import ReservationForm from './pages/ReservationForm';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4e1013'
    }
  },
  typography: {},
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&:focus': { backgroundColor: '#fdeded' }
        }
      }
    }

  }
})


function App() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  if (isAuthenticated) {
    getAccessTokenSilently().then((token) => {
      const headers = { Authorization: `Bearer ${token}` };
      const axios = Axios.create({
        baseURL: "http://localhost:8080/api/v1",
        headers: headers,
      });
      const defaultOptions = {
        useCache: false,
      };
      configure({ axios, defaultOptions })
    });

    return (
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path='/' element={<Navigate to="/addresses" />} />
              <Route path='/flights' element={<EntityList entityName={"flights"} />} />
              <Route path='/addresses' element={<EntityList entityName={"addresses"} />} />
              <Route path='/airline_companies' element={<EntityList entityName={"airline_companies"} />} />
              <Route path='/contacts_info' element={<EntityList entityName={"contacts_info"} />} />
              <Route path='/flight_classes' element={<EntityList entityName={"flight_classes"} />} />
              <Route path='/roles' element={<EntityList entityName={"roles"} />} />
              <Route path='/airports' element={<EntityList entityName={"airports"} />} />
              <Route path='/reservations' element={<EntityList entityName={"reservations"} />} />
              <Route path='/addresses/new' element={<AddressForm entityName={"addresses"} />} />
              <Route path='/airline_companies/new' element={<AirlineCompanyForm entityName={"airline_companies"} />} />
              <Route path='/contacts_info/new' element={<ContactInfoForm entityName={"contacts_info"} />} />
              <Route path='/flight_classes/new' element={<FlightClassForm entityName={"flight_classes"} />} />
              <Route path='/roles/new' element={<RoleForm entityName={"roles"} />} />
              <Route path='/airports/new' element={<AirportForm entityName={"airports"} />} />
              <Route path='/reservations/new' element={<ReservationForm entityName={"reservations"} />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    )

  }
  else {

    return (
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Layout>
            <Alert>Connexion requise</Alert>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    )
  }

}

export default App;
