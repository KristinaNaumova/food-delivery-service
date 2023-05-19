import React, { Component } from "react";
import ProductItem from "./Components/ProductItem";
import Utils from "../../Helpers/Utils";
import NetworkService from "../../Helpers/NetworkService";

class ProductList extends Component {

    state = {
        products: [],
        header: "В корзине есть блюда, можно оформить заказ",
    };

    render() {
        return (
            <React.Fragment>
                <div className="container border border-top-0 shadow" style={{marginBottom: '100px'}}>
                    <h1 className="mt-3 mb-3">Товары в корзине</h1>

                    <div style={{
                        display: 'flex',
                        margin: '10px',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>

                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">{this.state.header}</label>

                        {this.getProcessOrderButtonToRender()}

                    </div>


                    <div>
                        {
                            this.state.products.map((product) => {
                                return (
                                    <ProductItem key={product.id}
                                        product={product}
                                        onIncrement={this.handleIncrement}
                                        onDecrement={this.handleDecrement}
                                        onDelete={this.handleDelete}>
                                    </ProductItem>
                                );
                            })
                        }
                    </div>
                </div>

            </React.Fragment >
        );
    }

    getProcessOrderButtonToRender = () => {
        console.log("this.state.products.length", this.state.products.length);
        if (this.state.products.length > 0) {
            return (
                <button className="btn btn-primary" style={{ margin: '10px' }} onClick={this.onProcessOrderClick}>Оформить</button>
            );
        }
    };

    onProcessOrderClick() {
        window.location.replace("/purchase");
    };

    handleIncrement = async (product) => {
        console.log("handleIncrement", product);

        let basketDish = Utils.findById(this.state.products, product.id);
        // check max value
        if (basketDish && basketDish.amount >= 30) {
            return;
        }

        await this.performAddDishToBasket(basketDish.id);
    };

    handleDecrement = async (product) => {
        console.log("handleDecrement", product);

        let basketDish = Utils.findById(this.state.products, product.id);

        // check min value
        if (basketDish && basketDish.amount === 0) {
            return;
        }
        if (basketDish) {
            console.log("FOUND ", basketDish);
            await this.performDeleteDishFromBasket(basketDish.id, false);
        }
    };


    handleDelete = async (product) => {

        console.log("DELETE product", product);
        await this.performDeleteDishFromBasket(product.id, true);
    };

    componentDidMount = async () => {

        // fetch data from the server and update the state
        console.log("List of dishes: componentDidMount");

        if (Utils.isUserUnauthorized()) {
            // redirect to the login
            window.location.replace("/login/");
            return;
        }

        await this.performFetchBasketDishes();
    }

    performAddDishToBasket = async (id) => {
        let endpoint = 'basket/dish/' + id;

        let result = await NetworkService.makeAthorizedRequest(endpoint, 'POST');

        if (result.status === true) {
            await this.performFetchBasketDishes();
        }
    };

    performDeleteDishFromBasket = async (id, deleteAll) => {
        let endpoint = 'basket/dish/' + id;
        if (deleteAll === true) {
            endpoint = endpoint + '?increase=false';
        } else {
            endpoint = endpoint + '?increase=true';
        }

        let result = await NetworkService.makeAthorizedRequest(endpoint, 'DELETE');

        if (result.status === true) {
            await this.performFetchBasketDishes();
        }
    };

    performFetchBasketDishes = async () => {
        let result = await NetworkService.makeAthorizedRequest('basket', 'GET');
        let products = result.data;

        if (result.status === true && products) {

            console.log("BASKET FETCH", products);
            if (products.length > 0) {

                this.setState({
                    products: products
                });

                console.log("STATE > 0", this.state);

            } else {

                this.setState({
                    header: "У вас нет продуктов в корзине",
                    products: []
                });
            }

        }
    };
}

export default ProductList;