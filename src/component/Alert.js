export const Alert = ({alertMessage, close}) => {
    
  return (
    <div onClick = {close} className="modal"> 
        <div className="alert">
        <p> {alertMessage} </p>
        <button onClick = {close}> Close </button>
        </div>
    </div>
  )
}
