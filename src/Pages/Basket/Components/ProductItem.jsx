import React, { Component } from "react";

class ProductItem extends Component {

    state = {
        product: this.props.product,
    };

    render() {
        console.log(this.props)
        return (
            <React.Fragment>
                <div className="container border border-bottom-0 ps-0 pe-0 mb-3">
                    <div className="card rounded-0 border-0 border-bottom">
                        <div className="row g-0">
                            <div className="col-sm-1 col-6 mt-auto mb-auto dish-container ms-2">
                                <img className="img-fluid" src={this.props.product.image} style={{ borderRadius: '20px' }} />
                            </div>
                            <div className="col-sm col-4">
                                <div className="card-body row" >
                                    <div className="col-3">
                                        <p className="dish-title fw-bold mb-0">{this.props.product.name}</p>
                                        <p className="dish-price-order mb-0"><span>Цена/шт: </span>{this.props.product.price} руб.</p>
                                    </div>
                                    <div className="btn-group col-2 p-4">
                                        <button className="btn btn-outline-success" onClick={() => { this.props.onDecrement(this.props.product) }}>-</button>    
                                        <span className="badge bg-secondary"> {this.props.product.amount}</span>
                                        <button className="btn btn-outline-success" onClick={() => { this.props.onIncrement(this.props.product) }}>+</button>
                                    </div>
                                    <div className="col-7">
                                        <div style={{ textAlign: 'right' }}>
                                            <button className="btn btn-danger" onClick={() => { this.props.onDelete(this.props.product) }}>Удалить</button>
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

export default ProductItem;