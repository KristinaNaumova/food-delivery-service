import React, { Component } from "react";
import Utils from "../../Helpers/Utils";
import NetworkService from "../../Helpers/NetworkService";

class DishDetails extends Component {

    state = {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        name: "string",
        description: "string",
        price: 0,
        image: "string",
        vegetarian: true,
        rating: 0,
        category: "Wok"
    };

    render() {
        return (
            <React.Fragment>
                <div className="container border shadow">
                    <div className="mt-3">
                        <h2 className="text-start" id="dishName">{this.state.name}</h2>
                    </div>
                    <div className="card text-center pt-3 mb-3">
                        <div className="text-center">
                            <img className="rounded mx-auto d-block col-md-4" src={this.state.image}/>
                        </div>
                        <div className="card-body row rounded mx-auto mt-2">
                            <div className="category">
                                <p className="card-text">{this.state.category}</p>
                                <p className="card-text">{this.state.vegeterian}</p>
                            </div>
                            <p className="card-text mt-4">{this.state.description}</p>
                            <div>
                                <span>Цена: </span>
                                <span className="priceNumber"> {this.state.price} руб./шт</span>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    componentDidMount = async () => {
        console.log("DishDetails: componentDidMount");
        let id = Utils.detailDish();
        await this.performFetchDish(id);
    };

    performFetchDish = async (id) => {
        let endpoint = 'dish/' + id;
        let result = await NetworkService.makeAthorizedRequest(endpoint, 'GET');
        
        if (result.status === true && result.data) {
            console.log("DISH FETCH", result.data);

            this.setState({
                id: result.data.id,
                name: result.data.name,
                description: result.data.description,
                price: result.data.price,
                image: result.data.image,
                vegetarian: result.data.vegetarian,
                rating: result.data.rating,
                category: result.data.category
            });

        }
    };
};

export default DishDetails;