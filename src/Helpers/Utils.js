export default class Utils {
    
    static setUserIsAuthorized(token) {
        localStorage.setItem('token', token);
        Utils.setUserBasket(null);
    };
    
    static setUserIsUnauthorized() {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
    };

    static setUserEmail(email) {
        localStorage.setItem('email',email);
    };

    static isUserAuthorized() {
        let token = localStorage.getItem('token');
        return token !== null
    };

    static isUserUnauthorized() {
        let token = localStorage.getItem('token');
        return token === null
    };

    static token() {
        return localStorage.getItem('token');
    };

    static userEmail() {
        return localStorage.getItem('email');
    };

    static setUserBasket(basket) {
        localStorage.setItem('basket', null);
    };

    static removeDish() {
        localStorage.setItem('dish', null);
    };

    static setDish(dish) {
        localStorage.setItem('dish', dish);
    };

    static detailDish() {
        let values = localStorage.getItem('dish')
        return values;
    };

    static findById(array, itemId) {
        let item = array.find(({ id }) => id === itemId);
        return item;
    }
};

