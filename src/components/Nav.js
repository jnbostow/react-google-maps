import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class Nav extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const { showListToggle } = this.props
        showListToggle();
    }

    render() {
        return (
            <div id="nav">
                <button type="button" onClick={this.handleClick} aria-label="toggle menu">
                    <FontAwesomeIcon className="nav-icon" icon="bars" />
                </button>
            </div>
        )
    }
}

export default Nav