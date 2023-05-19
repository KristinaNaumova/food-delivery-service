import React, { Component } from "react";
import ProductList from './ProductList';
import Utils from "../../Helpers/Utils";

class Basket extends Component {

    render() {
        return (
            <React.Fragment>
                <ProductList/>
            </React.Fragment>
        );
    }

    componentDidMount = async () => {
        if (Utils.isUserUnauthorized()) {
            // redirect to the login
            window.location.replace("/login/");
            return;
        }
    };
};

export default Basket;