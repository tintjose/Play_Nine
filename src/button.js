import React from 'react';

const Button=(props)=>{
  let button;
  switch(props.answerIsCorrect){
    case true:
      button =
      <button className="btn btn-lg btn-success" onClick={props.acceptAnswer}>
      <i className="fa fa-check"></i>
      </button>;

    break;

    case false:
      button=
      <button className="btn btn-lg btn-danger" >
      <i className="fa fa-times"></i>
      </button>;
    break;

    default:
      button=
      <button className="btn btn-lg btn-warning"
      onClick={props.checkAnswer}
      disabled={props.selectedNumbers.length===0}>
      =
      </button>;

    break;
  }
  return(
    <div className="col-2">
    {button}
    <br/><br />
    <button className="btn btn-lg btn-warning " onClick={props.redraw}
              disabled={props.redraws===0}>
    <i className="fa fa-refresh"></i>{props.redraws}
    </button>
    </div>
  );
}
export default Button;
