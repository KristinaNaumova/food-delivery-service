import React, { Component } from "react";
import Utils from "../../Helpers/Utils";
import OrderItem from "./Components/OrderItem";
import NetworkService from "../../Helpers/NetworkService";
import { event } from "jquery";


class OrderProcessDetails extends Component {
    
    state = {
        basketDishes: [],
        address: "Карла-Маркса",
        deliveryTime: "2022-12-20T18:00:00.882Z",
        totalSum: "0",

        phoneNumber: "+7-923-414-49-23",
        email: "gg@nvjkf.com",
    };

    render() {
        return (
            <React.Fragment>
                <div className="container border border-top-0 shadow">
                    <h1 className="mt-3 mb-3">Оформление заказа</h1>
                    <h4>Данные покупателя</h4>
                    <div className="row g-2 mt-3 mb-3">
                        <div className="col-md-6">
                            <div className="container rounded border p-0">
                                <input className="form-control border-0 pb-0" type="text" placeholder="Телефон" aria-label="Disabled input example" disabled/>
                                <input className="form-control border-0 pb-0" type="text" value="+7 (901) 945-23-41" disabled readOnly/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="container rounded border p-0">
                                <input className="form-control border-0 pb-0" type="text" placeholder="Email" aria-label="Disabled input example" disabled/>
                                <input className="form-control border-0 pb-0" type="text" value="example@mail.ru" disabled readOnly/>
                            </div>
                        </div>
                    </div>
                    <h4>Данные доставки</h4>
                    <div className="row mt-3 mb-3">
                        <div className="col-md-6">
                            <label className="form-label">Адрес</label>
                            <input type="text"
                                className="form-control"
                                value={this.state.address}
                                onChange={(event) => {
                                    this.setState({ address: event.target.value });
                                }}
                                required/>
                            
                            <div className="invalid-feedback">
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Время доставки</label>
                            
                            <input type="text"
                                className="form-control"
                                value={this.state.deliveryTime}

                                onChange={(event) => {
                                    this.setState({ deliveryTime: event.target.value });
                                }}
                                required readOnly/>
                            
                            <div className="invalid-feedback">
                            </div>
                        </div>
                    </div>
                    <label className="form-label mt-1 mb-0">Список блюд:</label>
                    <div>
                        {
                            this.state.basketDishes.map((dish) => {
                                return (
                                    <OrderItem key={dish.id}
                                        dish={dish}>
                                    </OrderItem>
                                );
                            })
                        }
                    </div>    
                    <div style={{display: 'flex',
                        margin: '10px',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                        }}>
                    <p className="order-price mb-0"><span className="fw-bold">Стоимость заказа: </span>{this.state.totalSum} руб.</p>
                    <button className="btn btn-success mb-3" onClick={this.onConfirmClick}>Подтвердить заказ</button>
                    </div>
                </div>
            </React.Fragment>
        );
    };

    // Lifecycle
    componentDidMount = async () => {
        if (Utils.isUserUnauthorized()) {
            // redirect to the root
            window.location.replace("/login/");
            return;
        }

        await this.performFetchBasketDishes();
    }

    calculateTotalOrderPrice(dishes) {
        let sum = 0;
        for (var i = 0; i < dishes.length; ++i) {
            sum = sum + dishes[i].totalPrice;
        }
        
        console.log("SUM state ", sum);
        
        this.setState({
            totalSum: sum
        });
    };

    onConfirmClick = async () => {
        if (this.state.basketDishes && this.state.basketDishes.length > 0 && this.isCorrectAddress()) {
            
            await this.performConfirmOrder();
            
            // redirect to the 'completeOrder'
            window.location.replace("/completeOrder");
        }
    };

    isCorrectAddress() {
        
        if (this.state.address.length === 0 || this.state.address.length < 3) {
            console.log("",this.state.address);
            this.setState({
                massage: (<span className="text-danger">Адрес должен иметь более 15 символов</span>)
            });
            return false;
        }
        return true;
    }

    performFetchBasketDishes = async () => {
        let result = await NetworkService.makeAthorizedRequest('basket', 'GET');
        
        if (result.status === true && result.data) {
            console.log("performFetchBasketDishes",result.data);
            
            this.setState({basketDishes: result.data});                
            this.calculateTotalOrderPrice(result.data);
        }
    };

    performConfirmOrder = async () => {
        let body = JSON.stringify({
            deliveryTime: this.state.deliveryTime,
            address: this.state.address
        });

        let result = await NetworkService.makeAthorizedRequest('order', 'POST', body);

        if (result.status === true && result.data) {
            console.log("ORDER ",result.status);
            await this.performFetchBasketDishes();
        }
    };
}

export default OrderProcessDetails;