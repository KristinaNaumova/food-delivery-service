import React, { Component } from "react";
import DishList from './DishList';
import FiltersToolBar from './Components/FiltersToolBar';

class Main extends Component {
    
    state = {
        categories: [],
        sort: "NameAsc",
        isVegetarian: false
    };

    render() {
        return (
            <React.Fragment>
                <div className="container border shadow" style={{marginBottom: '100px'}}>
                    <FiltersToolBar
                        categories={this.state.categories}
                        sort={this.state.sort}
                        isVegetarian={this.state.isVegetarian}    
                        
                        onApplyFilters={this.handleApplyFilters}/>
                    
                    <DishList
                        categories={this.state.categories}
                        sort={this.state.sort}
                        isVegetarian={this.state.isVegetarian}/>
                </div>
            </React.Fragment>
        );
    }

    componentDidMount = async () => {
        console.log("Main: componentDidMount");
    }

    handleApplyFilters = (filters) => {
        this.setState({
            categories: filters.categories,
            sort: filters.sort,
            isVegetarian: filters.isVegetarian
        });
    };
}

export default Main;