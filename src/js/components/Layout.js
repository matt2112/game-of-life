import React, { Component } from 'react';

import Grid from './Grid';

class Layout extends Component {

    constructor() {
        super();

        this.state = {
            rows: 20,
            cols: 40,
            board: [],
            timer: 0,
            ms: 500,
            generation: 0
        };
    }

    generateRandomBoard() {
        clearInterval(this.state.timer);
        this.state.generation = 0;
        let board = [];
        for (let i = 0; i < this.state.rows; i++) {
            const row = [];
            for (let j = 0; j < this.state.cols; j++) {
                const cell = Math.random() > 0.85 ? "new" : "dead";
                row.push(cell);
            }
            board.push(row);
        }
        this.setState({ board });
    }

    nextStep() {
        const oldBoard = this.state.board;
        const newBoard = [];
        let empty = true;
        let changed = false;
        for (let posX = 0; posX < oldBoard.length; posX++) {
            const row = [];
            for (let posY = 0; posY < oldBoard[posX].length; posY++) {
                let neighbours = 0;
                const startPosX = (posX === 0) ? posX : posX - 1;
                const startPosY = (posY === 0) ? posY : posY - 1;
                const endPosX = (posX + 1 === oldBoard.length) ? posX : posX + 1;
                const endPosY = (posY + 1 === oldBoard[posX].length) ? posY : posY + 1;
                for (let i = startPosX; i <= endPosX; i++) {
                    for (let j = startPosY; j <= endPosY; j++) {
                        if (oldBoard[i][j] === "alive" || oldBoard[i][j] === "new") {
                            neighbours += 1;
                            empty = false;
                        }
                    }
                }
                let cell = "";
                if (oldBoard[posX][posY] === "new") {
                    neighbours -= 1;
                    changed = true;
                    if (neighbours === 2 || neighbours === 3) {
                        cell = "alive";
                    } else {
                        cell = "dead";
                    }
                } else if (oldBoard[posX][posY] === "alive") {
                    neighbours -= 1;
                    if (neighbours < 2 || neighbours > 3) {
                        changed = true;
                        cell = "dead";
                    } else {
                        cell = "alive";
                    }
                } else {
                    if (neighbours === 3) {
                        changed = true;
                        cell = "new";
                    } else {
                        cell = "dead";
                    }
                }
                row.push(cell);
            }
            newBoard.push(row);
        }
        this.setState({ board: newBoard });

        if (empty || !changed) {
            this.stopTimer();
        } else {
            const generation = this.state.generation += 1; 
            this.setState({ generation });
        }
    }

    startTimer() {
        clearInterval(this.state.timer);
        const timer = setInterval(this.nextStep.bind(this), this.state.ms);
        this.setState({ timer });
    }

    stopTimer() {
        clearInterval(this.state.timer);
    }

    clearBoard() {
        clearInterval(this.state.timer);
        const emptyBoard = [];
        for (let i = 0; i < this.state.rows; i++) {
            const row = [];
            for (let j = 0; j < this.state.cols; j++) {
                row.push("dead");
            }
            emptyBoard.push(row);
        }
        this.setState({ board: emptyBoard });
        this.setState({ generation: 0 });
    }

    toggleCell(row, col) {
        const board = this.state.board;
        if (board[row][col] === "dead") {
            board[row][col] = "new";
        } else {
            board[row][col] = "dead";
        }
        this.setState({ board });
    }

    setWidth(cols) {
        if (cols <= 100) {
            this.setState({ cols },
                this.generateRandomBoard
            );
        }
    }

    setHeight(rows) {
        if (rows <= 100) {
            this.setState({ rows },
                this.generateRandomBoard
            );
        }
    }

    componentWillMount() {
        this.generateRandomBoard();
        this.startTimer();
    }

    render() {
        return (
            <div className="wrapper">
                <h1>Game of Life</h1>
                <div className="main">
                    <Grid
                        board={this.state.board}
                        toggleCell={this.toggleCell.bind(this) } />
                    <div className ="controls">
                        <div className="buttons">
                            <button onClick={this.generateRandomBoard.bind(this) }>Generate new board</button>
                            <button onClick={this.nextStep.bind(this) }>Next step</button>
                            <button onClick={this.startTimer.bind(this) }>Start</button>
                            <button onClick={this.stopTimer.bind(this) }>Pause</button>
                            <button onClick={this.clearBoard.bind(this) }>Clear board</button>
                        </div>
                        <div className="time">
                            <label>Time between generations (in ms):</label>
                            <input onChange={event => {
                                const ms = event.target.value;
                                this.setState({ ms });
                            } }
                                value={this.state.ms}></input>
                        </div>
                        <div className="rows">
                            <label>Rows (max 100):</label>
                            <input onChange={event => {
                                const rows = event.target.value;
                                this.setHeight(rows); }}
                                value={this.state.rows}
                            ></input>
                        </div>
                        <div className="cols">
                            <label>Columns (max 100):</label>
                            <input onChange={event => {
                                const cols = event.target.value;
                                this.setWidth(cols); }}
                                value={this.state.cols}></input>
                        </div>
                        <h3>Generation: {this.state.generation}</h3>
                        <p className="bottomElement">White cells are 'dead', grey cells are new and black cells are older. Click to add and remove cells. Read about Conway's Game of Life <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" target="_blank">here</a>.</p>
                    </div>
                </div>
                <footer className="footer">
                    Coded by <a href="https://github.com/matt2112" target="_blank">Matt Lewis</a>
                </footer>
            </div>
        );
    }
}

export default Layout;