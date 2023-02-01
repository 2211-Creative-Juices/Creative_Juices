import { React, useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { getAllServices } from './api/services';
import { getAllBundles } from './api/bundles';
import { getAllOrders } from './api/orders';
import {
  NavBar,
  Home,
  AllBundles,
  About,
  ServiceForm,
} from './Components/Index';
import UserCart from './CartComponents/UserCart';
import { Signup, Login } from './Components/AuthForm';
import { useAuth } from './custom-hooks';

// import { AuthForm } from './Components/AuthForm';

function App() {
  const { token, isLoggedIn, logout, user } = useAuth();
  const [services, setServices] = useState([]);
  const [bundles, setBundles] = useState([]);
  const [orders, setOrders] = useState([]);

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

  useEffect(() => {
    const fetchedOrders = async () => {
      const allOrders = await getAllOrders();
      setOrders(allOrders);
      console.log('all the orders in App', allOrders);
    };
    fetchedOrders();
  }, [user.token]);

  console.log('SERVICES INAPP:', services);

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
        <UserCart orders={orders} />

        <ServiceForm services={services} />
        <AllBundles bundles={bundles} />
      </div>
    </div>
  );
}

export default App;
