import React, { Component } from 'react';

import Cell from './Cell';

const Grid = (props) => {

    let rows = [];
    let board = props.board;
    for (var i = 0; i < board.length; i++) {
        let row = [];
        for (var j = 0; j < board[i].length; j++) {
            row.push(<Cell
                        type={board[i][j]}
                        key={"col" + j}
                        row={i}
                        col={j}
                        toggleCell={props.toggleCell}
            />)
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

export default Grid;