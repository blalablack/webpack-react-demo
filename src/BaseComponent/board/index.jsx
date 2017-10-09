import React, { Component } from 'react';
import Square from "../square";
class Board extends Component{
	
	renderSquare(i){
		return <Square value={this.props.squares[i]} handleClick={this.props.handleClick.bind(this,i)} />;
	}
	
	render(){
		
		return(
			<div>
				<div className="board-row">
					{this.renderSquare(0)}
					{this.renderSquare(1)}
					{this.renderSquare(2)}
				</div>
				<div className="board-row">
					{this.renderSquare(3)}
					{this.renderSquare(4)}
					{this.renderSquare(5)}
				</div>
				<div className="board-row">
					{this.renderSquare(6)}
					{this.renderSquare(7)}
					{this.renderSquare(8)}
				</div>
			</div>
		)
	}
}
// class Board extends Component{
// 	renderSquare(i){
// 		return <Square value={this.props.squares[i]} handleClick={this.props.handleClick.bind(this,i)} />;
// 	}
// 	render(){
// 		let squares=[1,2,3].map(index=>{
// 			return <Square value={this.props.squares[index]} handleClick={this.props.handleClick.bind(this,index)} />;
// 		})
// 		let lines=[1,2,3].map(index=>{
// 			return <div className="board-row">{squares}</div>
// 		})
// 		return(
// 			<div>{lines}</div>
// 		)
// 	}
// }
export default Board