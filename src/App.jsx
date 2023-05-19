import React, { Component } from "react";
import NavBar from "./Components/NavBar";
import Main from "./Pages/Main/Main";
import Basket from "./Pages/Basket/Basket";
import Orders from "./Pages/Orders/Orders";
import ProcessOrder from "./Pages/Orders/ProcessOrder";
import OrderProcessDetails from "./Pages/Orders/OrderProcessDetails";
import Login from "./Pages/Auth/Login/Login";
import Registration from "./Pages/Auth/Registration/Registration";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from "./Pages/Profile/Profile";
import OrderItem from "./Pages/Orders/Components/OrderItem";
import DishDetails from "./Pages/Main/DishDetails";
import Footer from "./Components/Footer";
import CompleteOrder from "./Pages/Orders/CompleteOrder";


export default class App extends Component {
    
    render() {
        return (
            <React.Fragment>
                <BrowserRouter>
                    <NavBar />
                    <Routes>
                        <Route path="/" exact element={<Main />} />
                        <Route path="/basket" exact element={<Basket/>} />
                        <Route path="/orders" exact element={<Orders/>} />
                        <Route path="/profile" exact element={<Profile/>} />
                        <Route path="/login/" exact element={<Login/>} />
                        <Route path="/registration/" exact element={<Registration/>} />
                        <Route path="/purchase" exact element={<OrderProcessDetails/>} />
                        <Route path="/completeOrder" exact element={<CompleteOrder/>} />
                        <Route path="/dishDetails" exact element={<DishDetails/>} />
                        <Route path="/completeOrder" exact element={<CompleteOrder/>} />
                    </Routes>
                </BrowserRouter>
                <Footer />
            </React.Fragment>
        );
    }

}