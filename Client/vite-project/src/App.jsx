import { React, useState, useEffect } from 'react'
import { Route, Routes } from "react-router-dom";
import './App.css'
import {getAllServices} from "./api/services";
import {AllServices} from "./Components/Index";




function App() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchedServices = async () => {
      const allServices = await getAllServices();
      setServices(allServices)
    }
    fetchedServices();
  },
  []
  );

  return (
    <div className="App">
      Creative Juices
      <div>
        <AllServices services = {services}/>
      </div>
    </div>
  )
}

export default App
