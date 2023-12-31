import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"

import Login from "../Pages/Login"
import Dashboard from "../Pages/Dashboard"
import SignIn from "../Pages/Signin"

const logado = localStorage.getItem('@user');

const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                {logado && <Route path="/" exact element={<Dashboard />} />}
                {!logado && <Route path="/" element={<Login logado={logado} />} />}
                {!logado && <Route path="/SignIn" element={<SignIn logado={logado} />} />}
            </Routes>
        </BrowserRouter>
    );
};

export default Rotas;