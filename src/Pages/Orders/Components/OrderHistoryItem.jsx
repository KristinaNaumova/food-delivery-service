import React, { Component } from "react";

/*
[
  {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "deliveryTime": "2022-12-14T22:18:27.291Z",
    "orderTime": "2022-12-14T22:18:27.291Z",
    "status": "InProcess",
    "price": 0
  }
]
*/

class OrderHistoryItem extends Component {

    state = {
        order: this.props.order,
    };

    render() {
        return (
            <React.Fragment>
                <div className="container border border-bottom-0 ps-0 pe-0 mb-3">
                    <div className="card rounded-0 border-0 border-bottom">
                        <div className="row g-0">
                            <div className="col-sm col-6 ps-3">
                                <div className="card-body">
                                    <p className="dish-title fw-bold mb-0">Заказ от {this.state.order.orderTime}</p>
                                    <p className="dish-price-order mb-0"><span>Статус заказа: </span>{this.state.order.status}</p>
                                    <div className="row">
                                        <div className="col-lg-9 col-md-7">
                                            <p className="amount-of-dish mb-0"><span>Доставка ожидается: </span>{this.state.order.deliveryTime}</p>
                                        </div>
                                        <div className="col-lg-3 col-md-5">
                                            <p className="dish-price-order mb-0"><span className="fw-bold">Стоимость заказа: </span>{this.state.order.price} руб.</p>
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

export default OrderHistoryItem;