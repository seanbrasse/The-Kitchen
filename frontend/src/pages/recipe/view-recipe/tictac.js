import React from 'react';
/*
import ReactDOM from 'react-dom';
import ReactAppView from './components/ReactAppView';

let viewTree = React.createElement(ReactAppView, null);
let where = document.getElementById('reactapp');
ReactDOM.render(viewTree, where);
*/
class Board extends React.Component{

	constructor(props){
		super(props)
		this.state = {
			team1: "X",
			team2: "O",
			currentTurn: true,
			boardArray: Array(9).fill(null)
		}
	}

	updateTeam1 = (event) => {
		this.setState({team1: event.target.value})
	}


	updateTeam2 = (event) => {
		this.setState({team2: event.target.value})
	}

	updateBoard = (event) => {

		const board = this.state.boardArray.slice()
		if(!board[event.target.i]){
			board[event.target.i] = "X"//this.state.currentTurn ? this.state.team1 : this.state.team2
			this.setState({
				boardArray: board,
				currentTurn: !this.state.currentTurn
			})
		}
	}

	render(){
		return(
			<div>
				<div>Team {this.state.team1} vs. Team {this.state.team2}</div>
				<div><TextBox symbol={this.state.team1} handle={this.updateTeam1}/><TextBox symbol={this.state.team2} handle={this.updateTeam2}/></div>
				<div>It is Team {this.state.currentTurn ? this.state.team1 : this.state.team2}'s turn</div>
				<div><SquareColumn name1={this.state.boardArray[0]} index1={0} name2={this.state.boardArray[1]} index2={1} name3={this.state.boardArray[2]} index3={2} handle={this.updateBoard}/></div>
				<div><SquareColumn name1={this.state.boardArray[3]} index1={3} name2={this.state.boardArray[4]} index2={4} name3={this.state.boardArray[5]} index3={5} handle={this.updateBoard}/></div>
				<div><SquareColumn name1={this.state.boardArray[6]} index1={6} name2={this.state.boardArray[7]} index2={7} name3={this.state.boardArray[8]} index3={8} handle={this.updateBoard}/></div>
			</div>
		)
	}
}



const TextBox = (props) => {
	return(<input type='text' value={props.symbol} onChange={props.handle}></input>)
}

const Square = (props) => {

	return(
		<button onClick={props.handle}>{props.name}</button>
	)

}

const SquareColumn = (props) => {

	return(
		<div><Square name={props.name1} index={props.index1} handle={props.handle}/><Square name={props.name2} index={props.index2} handle={props.handle}/><Square name={props.name3} index={props.index3} handle={props.handle}/></div>
	)
}

export default Board;
