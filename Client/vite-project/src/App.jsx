import { React, useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { getAllServices } from './api/services';
import { getAllBundles } from './api/bundles';
import {
  AllServices,
  NavBar,
  Home,
  AllBundles,
  About,
  ServiceForm,
} from './Components/Index';
import { Signup, Login } from './Components/AuthForm';
import { useAuth } from './custom-hooks';

// import { AuthForm } from './Components/AuthForm';

function App() {
  const { token, isLoggedIn, logout, user } = useAuth();
  const [services, setServices] = useState([]);
  const [bundles, setBundles] = useState([]);

  useEffect(() => {
    const fetchedServices = async () => {
      const allServices = await getAllServices();
      setServices(allServices);
    };
    fetchedServices();
  }, []);

  useEffect(() => {
    const fetchedBundles = async () => {
      const allBundles = await getAllBundles();
      setBundles(allBundles);
    };
    fetchedBundles();
  }, []);

  return (
    <div className='App'>
      <NavBar />
      Creative Juices
      <div>
        <button onClick={logout}>Logout</button>
        <Routes>
          <Route path='/login' element={Login} />
          <Route path='/signup' element={Signup} />
        </Routes>
      </div>
      <div>
        <Home />
        <About />
        <AllServices services={services} />
        <ServiceForm/>
        <AllBundles bundles={bundles} />
      </div>
    </div>
  );
}

export default App;
