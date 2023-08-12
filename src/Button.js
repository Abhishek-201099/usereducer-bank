
export default function Button({btnType,isDisable,dispatchCallback,children}){
  return (
    <button className={btnType} disabled={isDisable} onClick={dispatchCallback}>{children}</button>
  );
};
