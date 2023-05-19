import { event } from "jquery";
import React, { Component } from "react";
import Utils from "../../../Helpers/Utils";
import NetworkService from "../../../Helpers/NetworkService";

class Registration extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            email: "abcdef@test.com",
            password: "qwerty123",
            fullName: "Kristina Naumovaa",
            address: "Karla Marksa 36",
            birthDate: "2022-12-10T20:38:58.882Z",
            gender: "Female",
            phoneNumber: "+7 (923) 414-49-25", // +7 (xxx) xxx-xx-xx

            // local values
            massage: "",
        };
    }

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <div className="card">
                        <div className="card-body">
                            <div className="container">
                                <div className="col-12">
                                    <h4 className="m-1 p-2 border-bottom">Регистрация нового пользователя</h4>

                                        {/* Fullname starts */}
                                        <div className="col-12 mb-3">
                                            <label className="form-label">ФИО:</label>
                                            <input type="text"
                                                className="form-control"
                                                value={this.state.fullName}

                                                onChange={(event) => {
                                                    this.setState({ fullName: event.target.value });
                                                }}

                                            />
                                        </div>
                                        {/* FullName ends */}

                                        {/* Gender starts */}
                                        <div className="col-12 mb-3">
                                            <label htmlFor="inputSex" className="form-label">Пол:</label>
                                            <select 
                                                className="form-select"
                                                value={this.state.gender}

                                                onChange={(event) => {
                                                    this.setState({ gender: event.target.value });
                                                }}>
                                                
                                                {/*Поменять на мужской\женский и написать функцию перевода*/}
                                                <option value="Male"> М </option> 
                                                <option value="Female"> Ж </option>

                                            </select>
                                        </div>
                                        {/* Gender ends */}

                                        {/* Phone starts */}
                                        <div className="col-12 mb-3">
                                            <label className="form-label">Телефон:</label>
                                            <input type="text"
                                                className="form-control"
                                                value={this.state.phoneNumber}

                                                onChange={(event) => {
                                                    this.setState({ phoneNumber: event.target.value });
                                                }}

                                            />
                                        </div>
                                        {/* Phone ends */}

                                        {/* BirthDate starts */}
                                        <div className="col-12 mb-3">
                                            <label className="form-label">Дата Рождения:</label>
                                            <input type="date"
                                                className="form-control"
                                                value={this.state.birthDate}

                                                onChange={(event) => {
                                                    this.setState({ birthDate: event.target.value });
                                                }}

                                            />
                                        </div>
                                        {/* BirthDate ends */}
                                        
                                        {/* Address starts */}
                                        <div className="col-12 mb-3">
                                            <label className="form-label">Адрес:</label>
                                            <input type="text"
                                                className="form-control"
                                                value={this.state.address}

                                                onChange={(event) => {
                                                    this.setState({ address: event.target.value });
                                                }}

                                            />
                                        </div>
                                        {/* Address ends */}

                                        {/* Email starts */}
                                        <div className="col-12 mb-3">
                                            <label className="form-label">Email:</label>
                                            { /* Заменила type с text на email чтобы была автоматич проверка */ }
                                            <input type="email"
                                                className="form-control"
                                                value={this.state.email}

                                                onChange={(event) => {
                                                    this.setState({ email: event.target.value });
                                                }}

                                            />
                                        </div>
                                        {/* Email ends */}

                                        {/* Password starts */}
                                        <div className="col-12 mb-3">
                                            <label className="form-label">Пароль:</label>
                                            <input type="password"
                                                className="form-control"
                                                value={this.state.password}

                                                onChange={(event) => {
                                                    this.setState({ password: event.target.value });
                                                }}

                                            />
                                        </div>
                                        {/* Password ends */}

                                        <div className="col-12">
                                            {this.state.massage}
                                            <button className="btn btn-primary m-1 p-2" onClick={this.onRegisterClick}>Зарегистрироваться</button>
                                        </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    }

    // Executes Login request to the server
    onRegisterClick = async () => {

        // check email and password
        if (this.isCorrectEmail(this.state.email) && this.isCorrectPassword(this.state.password) && this.isCorrectFullName(this.state.fullName) && this.isCorrectAddress(this.state.addres)) {

            await this.performRegister();
        }
    }

    isCorrectEmail(email) {
        if (email.length === 0) {
            this.setState({
                massage: (<span className="text-danger">Email не должен быть пустым</span>)
            });
            return false;
        }
        return true;
    }

    isCorrectFullName(name) {
        if (name.length < 3) {
            this.setState({
                massage: (<span className="text-danger">Имя должно быть больше 3х символов</span>)
            });
            return false;
        }
        return true;
    }

    isCorrectAddress(address) {
        if (address.length < 3) {
            this.setState({
                massage: (<span className="text-danger">Адрес должен быть не короче 3х символов</span>)
            });
            return false;
        }
        return true;
    }

    isCorrectPassword(password) {
        if (password.length === 0 || password.length < 5) {
            this.setState({
                massage: (<span className="text-danger">Пароль должен иметь более 5 символов</span>)
            });
            return false;
        }
        return true;
    }

    performRegister = async () => {
        Utils.setUserIsUnauthorized();

        let body = JSON.stringify({
            fullName: this.state.fullName,
            password: this.state.password,
            email: this.state.email,
            address: this.state.address,
            birthDate: this.state.birthDate,
            gender: this.state.gender,
            phoneNumber: this.state.phoneNumber
        });

        let result = await NetworkService.makeUnathorizedRequest(
            'account/registration/',
            'POST',
            body
        );

        if (result.status === true && result.data.token !== null) {
            // save to global storage memory
            Utils.setUserIsAuthorized(result.data.token);
            Utils.setUserEmail(this.state.email);
            
            // redirect to the root
            window.location.replace("/");
        } else {
            this.setState({
                massage: (<span className="text-danger">Регистрация не прошла</span>)
            });
        }
    };
}

export default Registration;