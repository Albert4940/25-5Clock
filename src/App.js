import React, {createRef} from 'react';
import { SetTimer } from './components/SetTimer';
import { Footer } from './components/Footer';
import { Audio} from './components/Audio';

class App extends React.Component{
  constructor(props){
    super(props)
    this.audioRef = createRef();
    this.state = {
      breakCount: 5,
      sessionCount: 25,
      clockCount: 25*60,
      currentTimer: 'Session',
      isPlaying: false,
      loop: undefined,
      //Audio: document.getElementById("beep")
    }
  }
  
  playAudio = () => {
    if(this.audioRef.current)
      this.audioRef.current.play();
  }

  pauseAudio = () => {
    if(this.audioRef.current)
      this.audioRef.current.pause()
  }

  resetTimeAudio = () => {
    if(this.audioRef.current)
      this.audioRef.current.currentTime = 0
  }

  handlePlayPause = () => {
    const {isPlaying, Audio} = this.state;
    
    if(isPlaying){
      clearInterval(this.state.loop);
      
      this.setState({
        isPlaying: false
      })
    }else{
       this.setState({
          loop: setInterval(() => {
            const { 
              clockCount, 
              currentTimer, 
              breakCount, 
              sessionCount 
            } = this.state;
            
            if(clockCount === 0){
              this.setState({
                currentTimer: currentTimer === 'Session' ? 'Break' : 'Session',
                clockCount: (currentTimer === 'Session') ? (breakCount * 60) : (sessionCount * 60)
              })
              this.playAudio();
            }else{
              this.setState({
                clockCount: clockCount - 1
              })
            }
            
          }, 1000)
        }) 
      
      this.setState({
        isPlaying: true
      })
    }
  }
  
  handleReset = () => {
    this.setState({
        breakCount: 5,
        sessionCount: 25,
        clockCount: 25 * 60,
        currentTimer: 'Session',
        isPlaying: false,
        loop: undefined
    })
    
    this.pauseAudio();    
    this.resetTimeAudio();

    clearInterval(this.state.loop)
  }

  componentWillUnmount(){
    clearInterval(this.state.loop);
    this.setState({
        isPlaying: false
      })
  }
  fixedInt(num){
     return (num < 10) ? '0' + num : num;
  }
  
  convertToTime = (count) => {
    const minutes = this.fixedInt(Math.floor(count / 60));
    const seconds = this.fixedInt(count % 60);
    return `${minutes}:${seconds}`;
  }
  
handleBreakDecrease = () => {
  const {breakCount} = this.state;
  
  if(breakCount > 1 ){
      this.setState({
    breakCount: breakCount - 1
  }) 
  }
}

  handleBreakIncrease = () => {
    const {breakCount, currentTimer} = this.state;
    if(breakCount < 60){
      this.setState({
      breakCount: breakCount + 1,
        clockCount: (currentTimer === 'Break') && (breakCount + 1) * 60
    })
 
    }
    
  }
  
  handleSessionDecrease = () => {
  const {sessionCount, currentTimer} = this.state;
  
      if(sessionCount > 1){
           this.setState({
        sessionCount: sessionCount - 1,
        clockCount: (currentTimer === 'Session') && (sessionCount - 1) * 60
      })
     
    }
 
}

  handleSessionIncrease = () => {
    const {sessionCount, currentTimer} = this.state;
  
    if(sessionCount < 60){
        this.setState({
      sessionCount: sessionCount + 1,
        clockCount: (currentTimer === 'Session') && (sessionCount + 1) * 60
    })
    }

  }
  
  render(){
    
    const {
      breakCount, 
      sessionCount, 
      clockCount, 
      currentTimer 
    } = this.state;
    
    const breakProps = {
      title: 'Break Length',
      count: breakCount,
      handleDecrease: this.handleBreakDecrease,
       handleIncrease: this.handleBreakIncrease
    }
    
    const sessionProps = {
      title: 'Session Length',
      count: sessionCount,
      handleDecrease: this.handleSessionDecrease,
       handleIncrease: this.handleSessionIncrease
    }

    return (
      <div className="container py-3">
        <h1 className="display-1 text-center" style={{color:"#222f3e"}}>25 + 5 Clock</h1>
        <div className="row  justify-content-center mx-5 ">
          <SetTimer {...breakProps} />
          <SetTimer {...sessionProps}/>
          <div className="col-12 col-md-8 my-3">
            <div className="card">
              <div className="card-header text-center" 
                style={
                        {
                          background: "#222f3e",
                          color: "#8395a7"
                        }
                      }><h2 id="timer-label">{currentTimer}</h2></div>
              <div className="card-body d-flex flex-column justify-content-center">
                 <span id="time-left" className="mb-3 align-self-center" style={{fontSize: "18px", fontWeight: "bold", color:"#222f3e"}}>{this.convertToTime(clockCount)}</span>       
                  <div className="d-flex justify-content-around w-25 mx-auto">
                     <button id="start_stop" 
                       className="btn mx-1"
                       style={
                                {
                                  background: "#222f3e",
                                  color: "#8395a7"
                                }
                              } 
                       onClick={this.handlePlayPause}><i className="fas fa-play"></i></button>
                     <button id="reset" 
                         className="btn mx-1" 
                         style={
                                  {
                                    background: "#222f3e",
                                    color: "#8395a7"
                                  }
                                } 
                       onClick={this.handleReset}><i className="fas fa-sync"></i></button>   
                  </div>
              </div>
            </div>
            
           
          </div>
        </div>
        <Audio ref={this.audioRef}/>
        <Footer />
      </div>
    );
  }
} 

export default App;
