import React, { Component } from 'react';
import Board from "../board";


class Game extends Component {
  constructor(){
    super();
    this.state={
      history:[{
        //数组填充
        squares:Array(9).fill(null)
      }],
      stepNumber:0,
      xIsNext:true
    }
  }
  handleClick=(i)=>{
    const history=this.state.history;
    const current=history[history.length-1];
    //创建squares新数组
    var squares=current.squares.slice();
    //有人获胜，或者格子点击过，取消更新
    if(WhichOneWin(squares)||squares[i]){
      return;
    }
    squares[i]=this.state.xIsNext?"X":"O";
    this.setState({
      history:[...history,{squares:squares}],
      xIsNext:!this.state.xIsNext,
      stepNumber:history.length
    });
  }
  
  jumpto=(i,e)=>{
    e.preventDefault();
    const history=this.state.history.slice(0,i+1);
    this.setState({
      history:history,
      xIsNext:i%2!==0?false:true,
      stepNumber:i
    })
  }
  render() {
    const history=this.state.history;
    const current=history[this.state.stepNumber];
    const winner=WhichOneWin(current.squares);
    let status;
    if(winner){
      status = 'Winner: ' + winner;
    }else{
      status="Next player:"+(this.state.xIsNext?"X":"O");
    }
    let active;
    const moves=history.map((move,index)=>{
      var decs="move #"+(index?index:"start");
      active=index===this.state.stepNumber?"active":"";
      return <li className={active} key={index}><a onClick={this.jumpto.bind(this,index)}>{decs}</a></li>
    })
    return (
      <div className="game">
        <div>666666</div>
        <div className="game-board">
          <input type="text"/>
          <Board 
            handleClick={this.handleClick}
            squares={current.squares}
          />
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <ol>{moves}</ol>
        </div>
        <img src={require('../../img/presets.png')} alt=""/>
      </div>
    );
  }
}
/*判断胜利函数*/
function WhichOneWin(squares){
    var lines=[
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    for(let i=0;i<lines.length;i++){
      //数组解构
      const [a,b,c]=lines[i];
      if(squares[a]&&squares[a]===squares[b]&&squares[a]===squares[c]){
        return squares[a]
      }
    }
    return null;
}
export default Game;
