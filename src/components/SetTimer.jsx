export const SetTimer = (props) => {
    const id = props.title.toLowerCase().split(" ")[0];
    return(
    <div className="col-sm-6 col-md-4 my-3">
        <div className="card">
          <div className="card-header text-center" id={`${id}-label`}
            style={
              {
                background: "#222f3e",
                color: "#8395a7"
              }
            }
            >
            <h2>{props.title}</h2>            
          </div>
          <div className="card-body d-flex justify-content-center ">
            <button id={`${id}-decrement`} className="btn"  style={
              {
                background: "#222f3e",
                color: "#8395a7"
              }
            } onClick={props.handleDecrease}><i className="fas fa-minus"></i></button>
            <span id={`${id}-length`} className="mx-3 align-self-center" style={{fontSize: "18px", fontWeight: "bold", color:"#222f3e"}}>{props.count}</span>
            <button id={`${id}-increment`} className="btn" style={
              {
                background: "#222f3e",
                color: "#8395a7"
              }
            } onClick={props.handleIncrease}><i className="fas fa-plus"></i></button>
          </div>
        </div>
    </div>
  )
  }