import React from 'react';
import Stars from './stars';
import Button from './button';
import Answer from './answer';
import Numbers from './numbers';
import _ from 'lodash';
class Game extends React.Component{

    state={
      selectedNumbers: [],
      randomNumberofStars: 1+Math.floor(Math.random()*9),
      answerIsCorrect:null,
    };

    selectNumber=(clickedNumber)=>{
      if(this.state.selectedNumbers.indexOf(clickedNumber)>=0)
        {return;}
      this.setState(prevState =>({
        selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
      }));
    };

    unselectNumber=(clickedNumber)=>{
      this.setState(prevState =>({
        selectedNumbers:prevState.selectedNumbers.filter(number =>number!=clickedNumber)
      }));
    };

    checkAnswer=()=>{
      this.setState(prevState=>({
        answerIsCorrect:prevState.randomNumberofStars===
        prevState.selectedNumbers.reduce((a,n)=>a+n,0)
      }));
    };

        render(){
          return (
           <div className="container">
           <hr />
              <h3>Play Nine</h3>
              <br />
              <div className="row">
                <Stars randomNumberofStars={this.state.randomNumberofStars}/>
                <Button selectedNumbers={this.state.selectedNumbers}/>
                <Answer selectedNumbers={this.state.selectedNumbers}
                        unselectNumber={this.unselectNumber}/>
              </div>
              <br />
              <Numbers selectedNumbers={this.state.selectedNumbers}
                        selectNumber={this.selectNumber}/>
            </div>
          );
          console.log(this.state.selectedNumbers);
        }
}
export default Game;
