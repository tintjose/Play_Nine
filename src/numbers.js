import React from 'react';
import './numbers.css';
import _ from 'lodash';
import Game from './game';

const Numbers=(props)=>{
  const numberClassName=(number)=>{
    if(props.selectedNumbers.indexOf(number)>=0){
      return 'selected';
    }
  }
  // const arrayOfNumbers=9;
  // let numbers=[];
  // for(let i=1;i<=arrayOfNumbers;i++){
  //   numbers.push(<span className={numberClassName(numbers)}
  //   onClick={()=>props.selectNumber(numbers)} >{i}</span>)
  // }

Numbers.list=_.range(1,10);

  return(
    <div className="card text-center">
      <div>
      {Numbers.list.map((number, i) =>
                <span key={i} className={numberClassName(number)}
                        onClick={() => props.selectNumber(number)}>
                  {number}
                </span>
              )}


      </div>

    </div>
  );
}


export default Numbers;
