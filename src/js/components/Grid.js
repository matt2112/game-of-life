import React, { Component } from 'react';

class Grid extends Component {
    constructor() {
        super();

        this.state = {
            rows: 3,
            cols: 6
        };
    }

    render() {
        let rows = [];
        for (var i = 0; i < this.state.rows; i++) {
            let row = [];
            for (var j = 0; j < this.state.cols; j++) {
                row.push(<td>"nya"</td>)
            }
            rows.push(<tr>{row}</tr>)
        }

        return (
            <table class="grid">
                {rows}
            </table>
        )
    }
}

export default Grid;