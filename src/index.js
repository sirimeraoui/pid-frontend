import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <Auth0Provider
      domain="dev-auth-sirimeraoui.eu.auth0.com"
      clientId="VMve0YyqLeYI30RCKl150BNbIZWUIYoY"
      redirectUri={window.location.origin}
      // audience={process.env.REACT_APP_API_BASE_URL}
      audience="http://localhost:8080/api/v1"
      scope="read:addresses read:roles read:airline_companies 
      read:contacts_info read:flight_classes read:airports 
      read:reservations create:reservations create:addresses 
       create:airline_companies create:contacts_info create:flight_classes create:airports"
   >
      <React.StrictMode>
         <App />
      </React.StrictMode>
   </Auth0Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
