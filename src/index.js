import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
      <button className="square"
              onClick={props.onClick}
      >
        {props.value}
      </button>
    );
}

class Board extends React.Component {
  renderSquare(i, j) {
    return (
    <Square key={i+j}
      value={this.props.rows[i][j]}
      onClick={() => this.props.onClick(i,j)}
    />
    );
  }

  render() {
    const squares = this.props.rows;
    const board = squares.map((row, i) => {
      return (
        <div key={i + 10} className="board-row">
          {row.map((square, j) => this.renderSquare(i,j))}
        </div>
      );
    });
    return (
      <div>
        {board}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        rows: Array(3).fill([null, null, null]),
        moveLocation: null,
      }],
      xIsNext: true,
      stepNumber: 0,
    };
  }
  handleClick(i,j) {
    const history =
      this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const rows = current.rows.slice();
    const columns = rows[i].slice();

    if (calculateWinner(rows) || rows[i][j]) return;
    columns[j] = this.state.xIsNext ? 'X' : 'O';
    rows.splice(i,1,columns);
    const moveLocation = `(${i},${j})`;

    this.setState({
      history: history.concat([{ rows, moveLocation }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.rows);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      const moveLocation =
        (move === this.state.stepNumber) ?
          <b>{step.moveLocation}</b> : step.moveLocation;

      return (
        <li key={move}>
          <button
            onClick={() => this.jumpTo(move)}
          >
            {desc}
          </button> {moveLocation}
        </li>
      );
    });

    const status =
      (winner) ?
        `Winner: ${winner}` :
        `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;

    return (
      <div className="game">
        <div className="game-board">
          <Board
            rows={current.rows}
            onClick={(i,j) => this.handleClick(i,j)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(rows) {
  /*const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const winners = [
    [1,1],
    [1,2],
    [1,3],
    [2,1],
    [2,2],
    [2,3],
    [3,1],
    [3,2],
    [3,3]
  ];*/
  /*for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (rows[a] && rows[a] === rows[b] && rows[a] === rows[c]) {
      return rows[a];
    }
  }
  return null;*/
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
