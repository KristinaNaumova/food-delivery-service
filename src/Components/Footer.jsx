import React, { Component } from "react";

class Footer extends Component {

    constructor(props) {
        super(props);

    }


    render() {
        return (
            <React.Fragment>
                <footer className="fixed-bottom bg-light ">
                    <div className="text-center p-2" style={{backgroundcolor: "rgba(0, 0, 0, 0.05"}}>
                        © 2022 - Delivery.Кушац
                    </div>
                </footer>
            </React.Fragment>
        )
    }
}
export default Footer;