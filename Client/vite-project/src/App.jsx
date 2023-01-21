import { React, useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { getAllServices } from './api/services';
import { AllServices } from './Components/Index';
import { Signup, Login } from './Components/AuthForm';
import { useAuth } from './custom-hooks';
// import { AuthForm } from './Components/AuthForm';

function App() {
  const { token, isLoggedIn, logout, user } = useAuth();
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchedServices = async () => {
      const allServices = await getAllServices();
      setServices(allServices);
    };
    fetchedServices();
  }, []);

  return (
    <div className='App'>
      Creative Juices
      <div>
        {/* <AuthForm></AuthForm> */}
        <button onClick={logout}>Logout</button>
        <Routes>
          {/* <Route path='/' element={<App />} /> */}
          <Route path='/login' element={Login} />
          <Route path='/signup' element={Signup} />
        </Routes>
      </div>
      <div>
        <AllServices services={services} />
      </div>
    </div>
  );
}

export default App;
