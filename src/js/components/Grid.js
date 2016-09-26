import React, { Component } from 'react';

import Cell from './Cell';

const Grid = (props) => {

    const rows = [];
    const board = props.board;
    const height = board.length;
    const width = board[0].length;
    for (let i = 0; i < height; i++) {
        const row = [];
        for (let j = 0; j < width; j++) {
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