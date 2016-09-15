import React, { Component } from 'react';

const Cell = (props) => {

    return (
        <td
            className={props.type}
            onClick={() => props.toggleCell(props.row, props.col)}>
        </td>
    )
}

export default Cell;