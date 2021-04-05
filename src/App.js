import ApolloProvider from './ApolloProvider';
import React from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './droit-acces/pages/Login'
import Quartiers from './identification/pages/Quartiers'
import Projets from './identification/pages/Projets'
import E404 from './identification/pages/E404'
import {BrowserRouter as Router, Switch } from 'react-router-dom';
import { AuthProvider } from './context/auth';
import DynamicRoutes from './utils/DynamicRoutes';



function App() {
 
  return (
    <ApolloProvider>
    <AuthProvider>
    <Router>
      
        <div className="wrapper">
          <Sidebar />
          <div className="main">
          <Navbar />
          <Switch>
            <DynamicRoutes exact path="/Login" component={Login} guest />
            <DynamicRoutes exact path="/Quartiers" component={Quartiers} guest />
            <DynamicRoutes exact path="/Projets" component={Projets} guest />
            <DynamicRoutes component={E404} guest />
          </Switch>
          <Footer />
          </div>
        </div>
      
    </Router>
    </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
