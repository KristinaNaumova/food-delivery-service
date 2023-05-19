import { event } from "jquery";
import React, { Component } from "react";
import Utils from "../../../Helpers/Utils";
import NetworkService from "../../../Helpers/NetworkService";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "kristina@test.com",
            password: "1234567890",

            massage: ""
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
                                    <h4 className="m-1 p-2 border-bottom">Авторизация</h4>
                                    {/* Email starts */}
                                    <div className="col-12 mb-2">
                                        <label className="form-label">Email:</label>
                                        <input type="email"
                                            className="form-control"
                                            value={this.state.email}

                                            onChange={(event) => {
                                                this.setState({ email: event.target.value });
                                                console.log("input email: ", this.state.email);
                                            }}

                                        />
                                    </div>
                                    {/* Email ends */}

                                    {/* Password starts */}
                                    <div className="col-12 mb-2">
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
                                        <button className="btn btn-primary m-1 p-2" onClick={this.onLoginClick}>Войти</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    };

    // Executes Login request to the server
    onLoginClick = async () => {
        // check email and password
        if (this.isCorrectEmail(this.state.email) && this.isCorrectPassword(this.state.password)) {

            await this.performLogin();
        }
    };

    isCorrectEmail(email) {
        if (email.length === 0) {
            this.setState({
                massage: (<span className="text-danger">Email не должен быть пустым</span>)
            });
            return false;
        }
        return true;
    };

    isCorrectPassword(password) {
        if (password.length === 0 || password.length < 5) {
            this.setState({
                massage: (<span className="text-danger">Пароль должен иметь более 5 символов</span>)
            });
            return false;
        }
        return true;
    };

    performLogin = async () => {

        Utils.setUserIsUnauthorized();
        
        let body = JSON.stringify({
            password: this.state.password,
            email: this.state.email
        });

        let result = await NetworkService.makeUnathorizedRequest(
            'account/login',
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
                massage: (<span className="text-danger">Log-in failed</span>)
            });
        }
    };
}

export default Login;