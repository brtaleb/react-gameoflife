import React, {useState, useEffect} from 'react'
import Cell from "./Cell";
import {getNeighborsCount} from './Utils'

const CELL_SIZE = 40;
const WIDTH = 600;
const HEIGHT = 600;

const Game = () => {
    let rows = HEIGHT/CELL_SIZE;
    let cols = WIDTH/CELL_SIZE;

    const makeEmptyBoard = () => {
        let board = [];
        for(let y=0; y<rows; y++){
            board[y] = [];
            for(let x=0; x<cols; x++){
                board[y][x] = Math.random() >= 0.8;
            }
        }
        board[4][2] = true;
        return board;
    };

    const makeCells = (board) => {
        let cells = [];
        board.map((row, rowIndex) => {
            row.map((col, colIndex) => {
                cells.push(
                    <Cell
                        key={[rowIndex,colIndex]}
                        size={CELL_SIZE}
                        isActive={col}
                        x={colIndex*CELL_SIZE}
                        y={rowIndex*CELL_SIZE}
                        onClick={() => changeBoard(rowIndex,colIndex)}/>
                );
            });
        });
        return cells;
    }

    const [board, setBoard] = useState(makeEmptyBoard());
    const [gameOn, setGameOn] = useState(false);

    useEffect(() => {

    })

    const changeBoard = (y,x) => {
        let newBoard = board.slice();
        newBoard[y][x] = !newBoard[y][x];
        setBoard(newBoard);
    }

    // 1 => 0 if count < 2 || count >= 3
    // 0 => 1 if count == 3

    const handleStartClick = () => {
        setBoard(makeEmptyBoard());
        game(board);
    }

    let timeOutHandler;
    const game = (board) => {
        board.forEach((row, rowIndex) => {
            row.forEach((col, colIndex) => {
                let count = getNeighborsCount(rowIndex, colIndex, board);
                if(board[rowIndex][colIndex]){
                    if(count < 2 || count > 3) changeBoard(rowIndex,colIndex);
                }
                else{
                    if(count === 3) changeBoard(rowIndex,colIndex)
                }
            });
        });
        timeOutHandler = setTimeout(() => game(board), 1000);
    }

    const styles = {
        width: WIDTH,
        height: HEIGHT,
        position: 'relative',
        margin: '0 auto',
        backgroundColor: '#222',
        backgroundImage: 'linear-gradient(#282828 1px, transparent 1px), ' +
            'linear-gradient(90deg, #282828 1px, transparent 1px)',
        backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`
    }

    let cells = makeCells(board);

    return (
        <div>
            <div style={styles}>
                {cells}
            </div>
            <button onClick={handleStartClick}>Game</button>

        </div>
    )
};
export default Game;