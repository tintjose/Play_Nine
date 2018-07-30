import React from 'react';
import Stars from './stars';
import Button from './button';
import Answer from './answer';
import Numbers from './numbers';
import DoneFrame from './doneframe';
import _ from 'lodash';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
import './game.css';

var possibleCombinationSum = function(arr, n) {
  if (arr.indexOf(n) >= 0) { return true; }
  if (arr[0] > n) { return false; }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  var listSize = arr.length, combinationsCount = (1 << listSize)
  for (var i = 1; i < combinationsCount ; i++ ) {
    var combinationSum = 0;
    for (var j=0 ; j < listSize ; j++) {
      if (i & (1 << j)) { combinationSum += arr[j]; }
    }
    if (n === combinationSum) { return true; }
  }
  return false;
};
class Game extends React.Component{
  static randomNumber = () => Math.floor(Math.random()*9) + 1;
  static initialState=()=>({
    selectedNumbers: [],
    numberOfStars: Game.randomNumber(),
    usedNumbers:[],
    answerIsCorrect:null,
    redraws: 5,
    doneStatus:null,
  });
    state = Game.initialState();

    selectNumber=(clickedNumber)=>{

      if(this.state.selectedNumbers.indexOf(clickedNumber)>=0)
        {return; }
        if(this.state.usedNumbers.indexOf(clickedNumber) >= 0) { return; }

      this.setState(prevState =>({
        answerIsCorrect:null,
        selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
      }));
    };

    unselectNumber=(clickedNumber)=>{

      this.setState(prevState =>({
        answerIsCorrect:null,
        selectedNumbers:prevState.selectedNumbers.filter(number =>number!==clickedNumber)
      }));
    };

    checkAnswer=()=>{
      this.setState(prevState=>({
        answerIsCorrect:prevState.numberOfStars===
        prevState.selectedNumbers.reduce((a,n)=>a+n,0)
      }));
    };

    acceptAnswer = () => {
    this.setState( prevState => ({
      usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
      selectedNumbers: [],
      answerIsCorrect: null,
      numberOfStars: Game.randomNumber(),
    }),this.updateDoneStatus);

    };
    redraw = () =>{
      if(this.state.redraws===0){return;}
      this.setState(prevState =>({
        numberOfStars: Game.randomNumber(),
        selectedNumbers: [],
        answerIsCorrect: null,
        redraws: prevState.redraws-1,
      }),this.updateDoneStatus);
    };
    possibleSolutions=({numberOfStars,usedNumbers})=>{
      const possibleNumbers=_.range(1,10).filter(number =>
      usedNumbers.indexOf(number)=== -1);
      return possibleCombinationSum(possibleNumbers,numberOfStars)
    }
    updateDoneStatus = () => {
   this.setState(prevState => {
     if(prevState.usedNumbers.length === 9){
       return { doneStatus: 'Done, Nice!', numberOfStars: 0 }
     }
     if(prevState.redraws === 0 && !this.possibleSolutions(prevState)){
       return { doneStatus: 'Game Over!!!', numberOfStars: 0 }
     }
   });
 }
resetGame=()=>{
  this.setState(Game.initialState())
};
        render(){
          return (
           <div className="container maindiv">
           <hr />
              <h3 className="heading">Play Nine</h3>
              <br />
              <div className="row">

                <Stars numberOfStars={this.state.numberOfStars}/>

                <Button selectedNumbers={this.state.selectedNumbers}
                        redraws={this.state.redraws}
                        checkAnswer={this.checkAnswer}
                        acceptAnswer={this.acceptAnswer}
                        redraw={this.redraw}
                        answerIsCorrect={this.state.answerIsCorrect}/>

                <Answer selectedNumbers={this.state.selectedNumbers}
                        unselectNumber={this.unselectNumber}/>
              </div>
              <br />


                        {this.state.doneStatus ?
                          <DoneFrame resetGame={this.resetGame}
                          doneStatus={this.state.doneStatus}/> :
                          <Numbers selectedNumbers={this.state.selectedNumbers}
                                    selectNumber={this.selectNumber}
                                    usedNumbers={this.state.usedNumbers}/>
                        }
            </div>
          );
        }
}
export default Game;
