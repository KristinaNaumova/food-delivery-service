import React, { Component } from "react";
import DishCard from "./Components/DishCard";
import NetworkService from "../../Helpers/NetworkService";
import Utils from "../../Helpers/Utils";

class DishList extends Component {
    state = {
        dishes: [],
        categories: this.props.categories,
        sort: this.props.sort,
        isVegetarian: this.props.isVegetarian,
        basketDishes: []
    };

    render() {
        return (
            <React.Fragment>
                <div className="container-fluid" >
                    <h4>Меню</h4>
                    
                    <div className="row">
                        {
                            this.state.dishes.map((dish) => {
                                return (
                                    <DishCard key={dish.id}
                                        dish={dish}
                                        
                                        dishBasket={this.findBasketDishById(dish.id)}
                                        
                                        onIncrement={this.handleIncrement}
                                        onDecrement={this.handleDecrement}
                                        onAddToBasket={this.handleAddTobasket}>
                                        
                                    </DishCard>
                                );
                            })
                        }
                    </div>

                </div>

            </React.Fragment >
        );
    }

    //executes when the user clicks on + button.
    handleIncrement = async (dish) => {
        console.log("handleIncrement", dish);
        let basketDish = this.findBasketDishById(dish.id);
        // check max value
        if (basketDish && basketDish.amount >= 30) {
            return;
        }
        await this.performAddDishToBasket(dish.id);
    };

    //executes when the user clicks on - button.
    handleDecrement = async (dish) => {
        let basketDish = this.findBasketDishById(dish.id);
        
        // check min value
        if (basketDish && basketDish.amount === 0) {
            return;
        }
        if (basketDish) {
            console.log("FOUND ", basketDish);
            await this.performDeleteDishFromBasket(basketDish.id);
        }
    };

    findBasketDishById = (dishId) => {
        let dish = this.state.basketDishes.find(({ id }) => id === dishId);
        
        console.log("FOUND : ", dish);

        return dish;
    };

    handleAddTobasket = async (dish) => {
        await this.performAddDishToBasket(dish.id);
    };

    componentDidMount = async () => {
        console.log("DishList: componentDidMount");
        if (Utils.isUserAuthorized()) {
            await this.performFetchBasketDishes();
        }
        await this.performFetchDishes();
    };

    componentDidUpdate = async () => {
        if (this.isFiltersChanged()) {

            this.setState({
                categories:  this.props.categories,
                sort: this.props.sort,
                isVegetarian: this.props.isVegetarian
            });

            // fetch from server dishes
            await this.performFetchDishes();
        }
    };

    isFiltersChanged() {
        if (this.props.categories !== this.state.categories
            || this.props.sort !== this.state.sort
            || this.props.isVegetarian !==  this.state.isVegetarian) {
            
                console.log("CHANGE");
                
                this.setState({
                    categories:  this.props.categories,
                    sort: this.props.sort,
                    isVegetarian: this.props.isVegetarian
                });

                return true;
        }

        return false;
    };

    performFetchDishes = async () => {
        let endpoint = 'dish?' // + 'vegetarian=' + this.state.isVegetarian + '&page=1'
        for (var i = 0; i < this.props.categories.length; ++i) {
            endpoint = endpoint + 'categories=' + this.props.categories[i] + '&';
        }
        endpoint = endpoint + 'vegetarian=' + this.props.isVegetarian + '&sorting=' + this.props.sort +'&page=1'

        let result = await NetworkService.makeUnathorizedRequest(endpoint, 'GET');
        
        if (result.status === true && result.data) {
            this.setState({dishes: result.data.dishes});
            
            console.log("performFetchDishes: ", result.data.dishes);
        }
    };

    performFetchBasketDishes = async () => {
        let result = await NetworkService.makeAthorizedRequest('basket', 'GET');
        
        if (result.status === true && result.data) {

            this.setState({basketDishes: result.data});
            
            // save dishes to the local memory
            Utils.setUserBasket(result.data);
        }
    };

    performAddDishToBasket = async (id) => {
        if (Utils.isUserAuthorized()) {
            let endpoint = 'basket/dish/'+ id;

            let result = await NetworkService.makeAthorizedRequest(endpoint, 'POST');

            if (result.status === true) {                
                await this.performFetchBasketDishes();
            }

        } else {
            // redirect to the login
            window.location.replace("/login/");
        }
    };

    performDeleteDishFromBasket = async (id) => {
        if (Utils.isUserAuthorized()) {
            let endpoint = 'basket/dish/'+ id + '?increase=true';

            let result = await NetworkService.makeAthorizedRequest(endpoint, 'DELETE');

            if (result.status === true) {               
                await this.performFetchBasketDishes();
            }

        } else {
            // redirect to the login
            window.location.replace("/login/");
        }
    };
    
}

export default DishList;