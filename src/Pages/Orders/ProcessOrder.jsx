import React, { Component } from "react";
import OrderDishesList from './OrderProcessDetails';


/*
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "deliveryTime": "2022-12-11T08:59:05.778Z",
  "orderTime": "2022-12-11T08:59:05.778Z",
  "status": "InProcess",
  "price": 0,
  "dishes": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "string",
      "price": 0,
      "totalPrice": 0,
      "amount": 0,
      "image": "string"
    }
  ],
  "address": "string"
}
*/

class ProcessOrder extends Component {

    state = {
        deliveryTime: "2022-12-11T08:59:05.778Z",
        price: 0,
    };

    render() {
        return (
            <React.Fragment>
                <OrderDishesList />

            </React.Fragment>
        );
    }
}

export default ProcessOrder;