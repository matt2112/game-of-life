import React, { Component } from 'react';

class Cell extends Component {
    constructor() {
        super();

        this.state = {

        };
    }

    render() {

        return (
            <td className={this.props.type}>
            </td>
        )
    }
}

export default Cell;