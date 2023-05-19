import React, { Component } from "react";

/*
{
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "string",
      "price": 0,
      "totalPrice": 0,
      "amount": 0,
      "image": "string"
    }
}
*/

class OrderItem extends Component {

    state = {
        orderDish: this.props.dish,
    };

    render() {
        return (
            <React.Fragment>
                <div className="container border border-bottom-0 ps-0 pe-0 mb-3">
                    <div className="card rounded-0 border-0 border-bottom">
                        <div className="row g-0">
                            <div className="col-sm-1 col-6 mt-auto mb-auto dish-container ms-2">
                                <img className="img-fluid" src={this.state.orderDish.image} style={{borderRadius: '20px'}}/>
                            </div>
                            <div className="col-sm col-6 ps-3">
                                <div className="card-body">
                                    <p className="dish-title fw-bold mb-0">{this.state.orderDish.name}</p>
                                    <p className="dish-price-order mb-0"><span>Цена: </span>{this.state.orderDish.price} руб.</p>
                                    <div className="row">
                                        <div className="col-lg-9 col-md-7">
                                            <p className="amount-of-dish mb-0"><span>Количество: </span>{this.state.orderDish.amount} шт.</p>
                                        </div>
                                        <div className="col-lg-3 col-md-5">
                                            <p className="dish-price-order mb-0"><span className="fw-bold">Стоимость: </span>{this.state.orderDish.totalPrice} руб.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}

export default OrderItem;