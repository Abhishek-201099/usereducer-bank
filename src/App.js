import { useReducer } from "react";
import Button from './Button';

const initialState={
  bank:0,
  loan:0,
  isActive:false,
};

function reducer(state,action){
  switch(action.type){
    case 'openAccount' : if(!state.isActive)
                         return {...state,bank:state.bank+500,isActive:true};
                         alert('Bank account already exists. 🏦');
                         return state;
    case 'deposit'     : return {...state,bank:state.bank+150};
    case 'withdraw'    : return {...state,bank:state.bank>=50 ? state.bank-50 : state.bank};
    case 'initiateLoan': if(!state.loan)
                         return {...state,bank:state.bank+5000,loan:5000};
                         alert('You have already taken a loan. Settle the loan before taking another loan. 💰');
                         return state;
    case 'payLoan'     : return {...state,bank:state.bank-state.loan,loan:0};
    case 'closeAccount': if(state.bank===0 && state.loan===0) 
                         return initialState;
                         alert('Account cannot be closed. There should not be a pending loan amount and balance should be zero. ⛔');
                         return state;
    default            : return 'Unknown action type';
  }
};


export default function App(){
  const [{bank,loan,isActive},dispatch]=useReducer(reducer,initialState);

  return (
    <div className="container">
      <h1 className="heading-primary">useReducer Bank Account</h1>
      <p className="bank-balance">Bank : {bank}</p>
      <p className="loan-amount">Loan : {loan}</p>
      <Button btnType={'open-account'} dispatchCallback={()=>dispatch({type:'openAccount'})}>Open Account</Button>
      <Button btnType={'deposit'} isDisable={!isActive} dispatchCallback={()=>dispatch({type:'deposit'})}>Desposit 150</Button>
      <Button btnType={'withdraw'} isDisable={!isActive} dispatchCallback={()=>dispatch({type:'withdraw'})}>Withdraw 50</Button>
      <Button btnType={'req-loan'} isDisable={!isActive} dispatchCallback={()=>dispatch({type:'initiateLoan'})}>Request a loan of 5000</Button>
      <Button btnType={'pay-loan'} isDisable={!isActive} dispatchCallback={()=>dispatch({type:'payLoan'})}>Pay loan</Button>
      <Button btnType={'close-account'} isDisable={!isActive} dispatchCallback={()=>dispatch({type:'closeAccount'})}>Close Account</Button>
    </div>
  );
};