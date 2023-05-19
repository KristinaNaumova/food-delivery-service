import React, { Component } from "react";
import { event } from "jquery";
import Utils from "../../Helpers/Utils";
import NetworkService from "../../Helpers/NetworkService";

class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "abcdef@test.com",
            fullName: "Kristina Naumovaa",
            address: "Karla Marksa 36",
            birthDate: "2022-12-10T20:38:58.882Z",
            gender: "Female",
            phoneNumber: "+7 (923) 414-49-25",

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
                                    <h4 className="m-1 p-2 border-bottom">Профиль</h4>

                                    {/* Fullname starts */}
                                    <div className="row mb-3" >
                                        <div className="col-lg-2 col-md-1 col-sm-12">
                                            <label className="form-label">ФИО:</label>
                                        </div>
                                        <div className="col-lg-10 col-md-11  col-sm-12">
                                            <input type="text"
                                                className="form-control"
                                                value={this.state.fullName}

                                                onChange={(event) => {
                                                    this.setState({ fullName: event.target.value });
                                                }} />
                                        </div>
                                    </div>
                                    {/* FullName ends */}

                                    {/* Email starts */}
                                    <div className="row mb-3">
                                        <div className="col-lg-2 col-md-1 col-sm-12">
                                            <label className="form-label">Email:</label>
                                        </div>
                                        <div className="col-lg-10 col-md-11  col-sm-12">
                                            <input type="email"
                                                className="form-control"
                                                value={this.state.email}

                                                onChange={(event) => {
                                                    this.setState({ email: event.target.value });
                                                }} disabled />
                                        </div>
                                    </div>

                                    {/* BirthDate starts */}
                                    <div className="row mb-3">
                                        <div className="col-lg-2 col-md-12 col-sm-12">
                                            <label className="form-label">Дата Рождения:</label>
                                        </div>
                                        <div className="col-lg-10 col-md-12  col-sm-12">
                                            <input type="date"
                                                className="form-control"
                                                value={this.state.birthDate}

                                                onChange={(event) => {
                                                    this.setState({ birthDate: event.target.value });
                                                }} />
                                        </div>
                                    </div>
                                    {/* BirthDate ends */}

                                    {/* Gender starts */}
                                    <div className="row mb-3">
                                        <div className="col-lg-2 col-md-1 col-sm-12">
                                            <label htmlFor="inputSex" className="form-label">Пол:</label>
                                        </div>
                                        <div className="col-lg-10 col-md-11  col-sm-12">
                                            <select
                                                className="form-select"
                                                value={this.state.gender}

                                                onChange={(event) => {
                                                    this.setState({ gender: event.target.value });
                                                }} disabled>

                                                {/*Поменять на мужской\женский и написать функцию перевода*/}
                                                <option value="Male"> Мужской </option>
                                                <option value="Female"> Женский </option>

                                            </select>
                                        </div>
                                    </div>
                                    {/* Gender ends */}

                                    {/* Address starts */}
                                    <div className="row mb-3">
                                        <div className="col-lg-2 col-md-1 col-sm-12">
                                            <label className="form-label">Адрес:</label>
                                        </div>
                                        <div className="col-lg-10 col-md-11  col-sm-12">
                                            <input type="text"
                                                className="form-control"
                                                value={this.state.address}

                                                onChange={(event) => {
                                                    this.setState({ address: event.target.value });
                                                }} />
                                        </div>
                                    </div>
                                    {/* Address ends */}

                                    {/* Phone starts */}
                                    <div className="row mb-3">
                                        <div className="col-lg-2 col-md-1 col-sm-1">
                                            <label className="form-label">Телефон:</label>
                                        </div>
                                        <div className="col-lg-10 col-md-11  col-sm-12">
                                            <input type="text"
                                                className="form-control"
                                                value={this.state.phoneNumber}

                                                onChange={(event) => {
                                                    this.setState({ phoneNumber: event.target.value });
                                                }} />
                                        </div>
                                    </div>
                                    {/* Phone ends */}

                                    <div className="col-6 mb-3">
                                        {this.state.massage}
                                        <button className="btn btn-primary m-1 p-2" onClick={this.onUpdateClick}>Изменить</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    // Lifecycle
    componentDidMount = async () => {
        if (Utils.isUserUnauthorized()) {
            // redirect to the root
            window.location.replace("/login/");
            return;
        }

        await this.performFetchProfile();
    }

    // Executes Login request to the server
    onUpdateClick = async () => {
        if (this.isCorrectFullName(this.state.fullName) && this.isCorrectAddress(this.state.address)) {

            await this.performUpdateProfile();
        }
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


    performFetchProfile = async () => {
        let result = await NetworkService.makeAthorizedRequest('account/profile', 'GET');

        if (result.status === true && result.data) {
            this.setState({
                id: result.data.id,
                email: result.data.email,
                fullName: result.data.fullName,
                address: result.data.address,
                birthDate: result.data.birthDate,
                gender: result.data.gender,
                phoneNumber: result.data.phoneNumber,
            });

            console.log("PROFILE FETCH", result.data);
        }
    };

    performUpdateProfile = async () => {
        let body = JSON.stringify({
            fullName: this.state.fullName,
            address: this.state.address,
            birthDate: this.state.birthDate,
            gender: this.state.gender,
            phoneNumber: this.state.phoneNumber
        });

        let result = await NetworkService.makeAthorizedRequest(
            'account/profile',
            'PUT',
            body
        );

        if (result.status === false) {
            this.setState({
                massage: (<span className="text-danger">Обновление не прошло</span>)
            });
        } else {
            this.setState({
                massage: (<span className="text-primary">Данные сохранены</span>)
            });
        }
    };
}

export default Profile;