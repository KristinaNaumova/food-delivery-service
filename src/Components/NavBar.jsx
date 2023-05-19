import React, { Component } from "react";
import { Link } from "react-router-dom";
import Utils from "../Helpers/Utils";
import NetworkService from "../Helpers/NetworkService";

class NavBar extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            isAuthorized: Utils.isUserAuthorized()
        };
    }

    // Lifecycle
    componentDidMount() {
        console.log("NavBar: componentDidMount");
    }
    
    componentDidUpdate() {
        console.log("NavBar: componentDidUpdate");
    }
    
    //Executes when the current instance of current component is being deleted from memory
    componentWillUnmount() {
        console.log("NavBar: componentWillUnmount");
    }

    
    render() {
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">Delivery.Кушац</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                            aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0 top-menu">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Меню</Link>
                                </li>
                                
                                {this.getOrdersLinkToRender()}

                                {this.getBasketLinkToRender()}

                            </ul>
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                
                                {this.getRegisterLinkToRender()}

                                {this.getEmailLinkToRender()}
                                
                                {this.getLoginLinkToRender()}

                                {this.getExitLinkToRender()}

                            </ul>
                        </div>
                    </div>
                </nav>
            </React.Fragment>
        );
    }


    getOrdersLinkToRender = () => {
        if (Utils.isUserAuthorized()) {
            return (
                <li className="nav-item">
                    <Link className="nav-link" to="/orders">Заказы</Link>
                </li>
            );
        }
    };

    getBasketLinkToRender = () => {
        if (Utils.isUserAuthorized()) {
            return (
                <li className="nav-item">
                    <Link className="nav-link" to="/basket">Корзина</Link>
                </li>
            );
        }
    };

    getRegisterLinkToRender = () => {
        if (Utils.isUserUnauthorized()) {
            return (
                <li className="nav-item">
                    <Link className="nav-link" to="/registration/">Регистрация</Link>
                </li>
            );
        }
    };

    /*Для профиля надо брать с бэка емэйл и сделать путь*/

    getEmailLinkToRender = () => {
        if (Utils.isUserAuthorized()) {
            let email = Utils.userEmail();
            if (email !== null) { 
                return (
                    <li className="nav-item">
                        <Link className="nav-link" to="/profile">{email}</Link>
                    </li>
                );
            }
        }
    };


    getLoginLinkToRender = () => {
        if (Utils.isUserUnauthorized()) {
            return (
                <li className="nav-item">
                    <Link className="nav-link" to="/login/">Логин</Link>
                </li>
            );
        }
    };

    getExitLinkToRender = () => {
        if (Utils.isUserAuthorized()) {
            return (
                <li className="nav-item">
                    <Link className="nav-link" to="/" onClick={this.onExitClick}>Выход</Link>
                </li>
            );
        }
    };

    onExitClick = async () => {

        await this.performLogout();
        window.location.replace("/");
    };

    performLogout = async () => {
        let token = Utils.token();
        
        let result = await NetworkService.makeAthorizedRequest('account/logout', 'POST');
        
        Utils.setUserIsUnauthorized();    
        this.setState({isAuthorized: false});
    };
}

export default NavBar;