import React, { Component, Fragment } from "react";
import { Container } from "reactstrap";

class Header extends Component {
    render() {
        return(
            <Fragment>
                <Container>
                    <h1> APMD Deposition Log </h1>
                </Container>
            </Fragment>
        );
    }
}

export default Header;