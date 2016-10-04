import React, { Component } from 'react';

import Grid from './Grid';

// Define constants
const newCell = "new";
const aliveCell = "alive";
const deadCell = "dead";

class Layout extends Component {

    constructor() {
        super();

        // Default size of board is determined by size of screen.
        this.state = {
            rows: (window.innerWidth > 992) ? 22 : (window.innerWidth > 768) ? 20: 15,
            cols: (window.innerWidth > 992) ? 44 : (window.innerWidth > 768) ? 30: 15,
            board: [],
            timer: 0,
            ms: 500,
            generation: 0
        };

    }

    // Stops timer if running and creates a new board.
    generateRandomBoard() {
        this.stopTimer();
        this.state.generation = 0;
        let board = [];
        for (let i = 0; i < this.state.rows; i++) {
            const row = [];
            for (let j = 0; j < this.state.cols; j++) {
                const cell = Math.random() > 0.85 ? newCell : deadCell;
                console.log(cell);
                row.push(cell);
            }
            board.push(row);
        }
        this.setState({ board });
    }

    // Loops through every cell and applies Conway's algorithm to determine
    // the layout of the board at the next generation.
    nextStep() {
        const oldBoard = this.state.board;
        const newBoard = [];
        let empty = true;
        let changed = false;
        // Loop through each row of the board.
        for (let posY = 0; posY < oldBoard.length; posY++) {
            const row = [];
            const startPosY = (posY === 0) ? posY : posY - 1;
            const endPosY = (posY + 1 === oldBoard.length) ? posY : posY + 1;
            // Loop through each cell of the row.
            for (let posX = 0; posX < oldBoard[posY].length; posX++) {
                let neighbours = 0;
                const startPosX = (posX === 0) ? posX : posX - 1;
                const endPosX = (posX + 1 === oldBoard[posY].length) ? posX : posX + 1;
                // Loop around surrounding cells (including tested cell)
                // to count number of alive or new neighbours.
                for (let i = startPosY; i <= endPosY; i++) {
                    for (let j = startPosX; j <= endPosX; j++) {
                        if (oldBoard[i][j] === aliveCell || oldBoard[i][j] === newCell) {
                            neighbours += 1;
                            empty = false;
                        }
                    }
                }
                let cell = "";
                // Determine new cell type based on number of neighbours.
                // If cell is already occupied, remove from neighbour count.
                if (oldBoard[posY][posX] === newCell) {
                    neighbours -= 1;
                    changed = true;
                    if (neighbours === 2 || neighbours === 3) {
                        cell = aliveCell;
                    } else {
                        cell = deadCell;
                    }
                } else if (oldBoard[posY][posX] === aliveCell) {
                    neighbours -= 1;
                    if (neighbours < 2 || neighbours > 3) {
                        changed = true;
                        cell = deadCell;
                    } else {
                        cell = aliveCell;
                    }
                } else {
                    if (neighbours === 3) {
                        changed = true;
                        cell = newCell;
                    } else {
                        cell = deadCell;
                    }
                }
                row.push(cell);
            }
            newBoard.push(row);
        }
        this.setState({ board: newBoard });

        // Stop the timer if the board is now empty or nothing has changed.
        // Otherwise increase the generation count by one.
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
                row.push(deadCell);
            }
            emptyBoard.push(row);
        }
        this.setState({ board: emptyBoard });
        this.setState({ generation: 0 });
    }

    // Creates a new cell if dead, or a dead cell if new or alive.
    toggleCell(row, col) {
        const board = this.state.board;
        if (board[row][col] === deadCell) {
            board[row][col] = newCell;
        } else {
            board[row][col] = deadCell;
        }
        this.setState({ board });
    }

    setWidth(cols) {
        if (cols > 0 && cols <= 100) {
            this.setState({ cols },
                this.generateRandomBoard
            );
        } else if (cols === "") {
            this.setState({cols});
        }
    }

    setHeight(rows) {
        if (rows > 0 && rows <= 100) {
            this.setState({ rows },
                this.generateRandomBoard
            );
        } else if (rows === "") {
            this.setState({rows});
        }
    }

    // Generates a random board when app loads and sets timer going.
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