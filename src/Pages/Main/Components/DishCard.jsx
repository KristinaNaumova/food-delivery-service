import React, { Component } from "react";
import Utils from "../../../Helpers/Utils";

class DishCard extends Component {

    state = {
        dish: this.props.dish,
        dishBasket: this.props.dishBasket,
    };

    render() {
        return (
            <React.Fragment>
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">

                    <div className="card m-2" style={{
                        height: '700px',
                        width: '250px'
                    }}>
                        <img src={this.state.dish.image} className="card-img-top" onClick={this.showDetails} />

                        <div className="card-body">
                            <h5 className="card-title">{this.state.dish.name}</h5>
                            <p className="card-text">Категория блюда - {this.state.dish.category}</p>
                            <p className="card-text">{this.state.dish.description}</p>
                        </div>

                        <div className="card-footer text-right">
                            <div style={{ display: 'flex' }} className="float-left">
                                <div className="row">
                                    <div className="col-12 mb-3">Цена: {this.state.dish.price} руб.</div>

                                    <div className="col-12">{this.getBasketButtonsToRender()}</div>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </React.Fragment>
        );
    }

    componentDidMount = async () => {
        console.log("DishCard: componentDidMount");
    };

    getBasketButtonsToRender = () => {
        console.log("this.state.dishBasket ", this.state.dishBasket);

        if (this.props.dishBasket) {
            return (
                <div className="btn-group">
                    <button className="btn btn-outline-success" onClick={() => { this.props.onDecrement(this.state.dish) }}>-</button>
                    <span className="badge bg-secondary">{this.props.dishBasket.amount}</span>
                    <button className="btn btn-outline-success" onClick={() => { this.props.onIncrement(this.state.dish) }}>+</button>
                </div>
            );
        }

        if (Utils.isUserAuthorized()) {
            return (
                <button className="btn btn-primary" onClick={() => { this.props.onAddToBasket(this.state.dish) }}>В корзину</button>
            );
        } else {
            return (
                <button className="btn btn-primary" onClick={this.onAddClick}>В корзину</button>
            );
        }
    };

    showDetails = () => {
        // redirect to the details
        Utils.setDish(this.props.dish.id);

        window.location.replace('/dishDetails');
    }

    onAddClick() {
        // redirect to the login
        window.location.replace("/login/");
    }
}

export default DishCard;