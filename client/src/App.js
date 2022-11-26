import React from 'react';
import "./App.css";
import {Route, Routes } from "react-router-dom";
import Register from "./views/Register";
import { UserProvider } from "./contexts/userContext";
import Detail from "./views/Detail";
import PacienteForm from "./components/PacienteForm";
import Home from "./views/Home";
import Main from "./views/Main";
import Login from "./views/Login";



function App() {

  return (    
    <div className="App">  
      
      <UserProvider> 
          <Main></Main>              
          <Routes>
            <Route path="/" element={<Login></Login>}></Route>
            <Route path="/home" element={<Home></Home>}></Route>        
            <Route path="/register" element={<Register />}></Route>
            <Route path="/add-paciente" element={<PacienteForm />}></Route>
            <Route path="/paciente/tratamiento/:id" element={<Detail />}></Route>
        </Routes>
    </UserProvider>

    </div> 

  );
}

export default App;
