import { React, useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { getAllServices } from './api/services';
import { getAllBundles } from './api/bundles';
import { getAllOrders } from './api/orders';
import { getAllUsers } from './api/auth';
import {
  NavBar,
  Home,
  AllBundles,
  About,
  ServiceForm,
  Dashboard,
} from './Components/Index';
import UserCart from './CartComponents/UserCart';
import AdminServices from './AdminComponents/AdminServices';
import AdminOrders from './AdminComponents/AdminOrders';
import AdminUsers from './AdminComponents/AdminUsers';
import { Signup, Login } from './Components/AuthForm';
import { useAuth } from './custom-hooks';

// import { AuthForm } from './Components/AuthForm';

function App() {
  const { token, isLoggedIn, logout, user } = useAuth();
  const [services, setServices] = useState([]);
  const [bundles, setBundles] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchedServices = async () => {
      const allServices = await getAllServices();
      setServices(allServices);
    };
    fetchedServices();
    const fetchedBundles = async () => {
      const allBundles = await getAllBundles();
      setBundles(allBundles);
    };
    fetchedBundles();
    const fetchedUsers = async () => {
      const allUsers = await getAllUsers();
      setUsers(allUsers);
      console.log('allusers here ', allUsers);
    };
    fetchedUsers();
  }, []);

  useEffect(() => {
    const fetchedOrders = async () => {
      const allOrders = await getAllOrders();
      setOrders(allOrders);
      console.log('all the orders in App', allOrders);
    };
    fetchedOrders();
  }, [user.token]);

  console.log('USER INAPP:', user);

  // (!user.isadmin)
  return (
    <div className='App'>
      <NavBar />
      {user.isadmin === true ? <Dashboard /> : null}
      Creative Juices
      <div>
        <button onClick={logout}>Logout</button>
        <Routes>
          <Route
            path='/login'
            element={Login}
          />
          <Route
            path='/signup'
            element={Signup}
          />
        </Routes>
      </div>
      <div>
        <div>
          <Routes>
            <Route
              path='/allservices'
              element={<AdminServices services={services} />}
            />
            <Route
              path='/allorders'
              element={<AdminOrders />}
            />
            <Route
              path='/allusers'
              element={<AdminUsers users={users} />}
            />
          </Routes>
        </div>
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
