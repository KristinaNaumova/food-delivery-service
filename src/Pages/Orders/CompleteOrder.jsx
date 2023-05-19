import React, { Component } from "react";

class CompleteOrder extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="container border border-top-0 shadow" style={{marginBottom: '100px'}}>
                    <h1 className="mt-3 mb-3">Ваш заказ успешно создан</h1>
                </div>
            </React.Fragment>
        );
    }
}

export default CompleteOrder;