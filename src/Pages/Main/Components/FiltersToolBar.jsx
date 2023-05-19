import React, { Component } from "react";

class FiltersToolBar extends Component {
    
    state = {
        categories: this.props.categories,
        sort: this.props.sort,
        isVegetarian: this.props.isVegetarian
    };

    render() {
        return (
            
            <div className="row" style={{display: 'flex',
                        margin: '10px',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        border: '1px gray solid',
                        borderRadius: '4px'
                        }}>
            
                <div className="col-xl-10 col-lg-10 col-md-12 col-sm-12 col-12" style={{display: 'flex', alignItems: 'center'}}>
                    <div className="row">
                        <select className="form-select col-4" multiple size="3" aria-label="size 3 select example" style={{ width: '300px', margin: '10px'}}
                            
                            onChange={(event) => {
                                this.selectedOptionsToCategory(event.target.selectedOptions);
                            }}>

                            <option value="Wok">WOK</option>
                            <option value="Pizza">Пицца</option>
                            <option value="Soup">Супы</option>
                            <option value="Dessert">Десерты</option>
                            <option value="Drink">Напитки</option>
                        </select>
                        
                        <select className="form-select col-4" aria-label="Default select example" style={{ width: '200px', margin: '10px'}}
                        
                            onChange={(event) => {
                                this.setState({ sort: event.target.value });
                            }}>
                            
                            <option value="NameAsc" defaultValue>А-Я</option>
                            <option value="NameDesc">Я-А</option>
                            <option value="PriceAsc">По возрастанию цены</option>
                            <option value="PriceDesc">По убыванию цены</option>
                            <option value="RatingAsc">По убыванию рейтинга</option>
                            <option value="RatingDesc">По возрастанию рейтинга</option>
                        </select>
                        
                        <div className="form-check form-switch col-4" style={{ margin: '10px'}}
                            
                            onChange={(event) => {
                                this.setState({ isVegetarian: event.target.checked });
                            }}>
                        
                            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Показать только вегитарианские</label>
                        </div>
                    </div>
                </div>
                <div className="col-xl-2 col-lg-2 col-md-4 mb-3">
                    <button className="btn btn-primary"  onClick={ () => {this.props.onApplyFilters(this.state)} }>Применить</button>
                </div>
            </div>
        );
    };

    componentDidMount = async () => {
        console.log("FiltersToolBar: componentDidMount");
    }

    selectedOptionsToCategory = (options) => {
        var items = [];
        for (var i = 0; i < options.length; ++i) {
            items.push(options[i].value);
        }
        this.setState({ categories: items});
    };

}

export default FiltersToolBar;