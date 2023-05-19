import React, { Component } from "react";
import Utils from "../../Helpers/Utils";
import NetworkService from "../../Helpers/NetworkService";
import OrderHistoryItem from "./Components/OrderHistoryItem";


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

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [
        {
          deliveryTime: '2022-12-20T18:00:00',
          orderTime: '2022-12-14T22:15:29.7867038',
          status: 'InProcess',
          price: 690,
          id: '04946e66-255d-450b-ebae-08dadd900810'
        },
      ],

      massage: ""
    };
  }

  render() {
    return (
      <React.Fragment>
        <div className="container border border-top-0 shadow" style={{marginBottom: '100px'}}>
          <h1 className="mt-3 mb-3">Последние заказы</h1>
          <div className="container border border-bottom-0 ps-0 pe-0 mb-2">
            {
              this.state.orders.map((order) => {
                return (
                  <OrderHistoryItem key={order.id}
                    order={order}>
                  </OrderHistoryItem>
                );
              })
            }
          </div>
        </div>
      </React.Fragment>
    );
  }

  getOrderrRow = () => {
    return (
      this.state.orders.map((order) => {
        return (
          <tr key={order.id}>
            <td>{order.deliveryTime}</td>
            <td>{order.orderTime}</td>
            <td>{order.status}</td>
            <td>{order.price} руб.</td>
          </tr>
        );
      })
    );
  };

  componentDidMount = async () => {
    console.log("Orders: componentDidMount");
    if (Utils.isUserAuthorized()) {
      await this.performFetchOrder();
    }
  };

  performFetchOrder = async () => {
    let result = await NetworkService.makeAthorizedRequest('order', 'GET');

    if (result.status === true && result.data) {
      console.log("performFetchOrder", result.data);

      this.setState({ orders: result.data });
    }
  };
}

export default Orders;