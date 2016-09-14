import React, { Component } from 'react';

import Cell from './Cell';

class Grid extends Component {
    constructor() {
        super();

        this.state = {
        };
    }

    render() {
        let rows = [];
        let board = this.props.board;
        for (var i = 0; i < board.length; i++) {
            let row = [];
            for (var j = 0; j < board[i].length; j++) {
                row.push(<Cell type={board[i][j]} key={"col" + j} />)
            }
            rows.push(<tr key={"row" + i}>{row}</tr>)
        }

        return (
            <table className="grid">
                <tbody>
                    {rows}
                </tbody>
            </table>
        )
    }
}

export default Grid;