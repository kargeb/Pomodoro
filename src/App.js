import React, {useState, useEffect} from 'react';
import logo from './tomato_icon.svg';
import pikSound from "./pik.mp3";
import './App.css';

const audio = new Audio(pikSound);
console.log("KJSAHJDGASJDGAJ");

if(localStorage.getItem("sesions")){
  console.log("jest sesions")
} else {
  console.log("nie ma sesions")
  localStorage.setItem('sesions', '[]');
}

const App = () => {
  
  
  useEffect( () => {
    console.log("jest w useEffect");
      const sesionsFormStorage =  JSON.parse(localStorage.getItem("sesions"));
      setSesions(sesionsFormStorage)
  }, []
  )

  const [time, setTime] = useState(25);
  const [name, setName] = useState("Learning");
  const [counter, setCounter] = useState(null);
  const [intervalHandler, setIntervalHandler] = useState(null);
  const [sesions, setSesions] = useState();

  
  const startCount = () => {

    setCounter(time);
  

    let stopCount = setInterval(() => {
      setCounter(prevState => prevState-1)
    }, 1000); 

    setIntervalHandler(stopCount);
  }
  
  const stopCount = () => {
    clearInterval(intervalHandler)
  }
  
  const resetCount = () => {
    {console.log(sesions)}
  }
  
  // const stop = () => {
    if(counter == -1 ){
      console.log(`JESTEM W DODAWACZCE`);
      audio.play();
      const newSesion = {
        name,
        time
      }

      console.log(`sesions = ${sesions}`)
      
      console.log(`newSesion = ${newSesion.name},  ${newSesion.time}`);
      
      setSesions( prevState => {

        const newState = [...prevState, newSesion];

        const stringSesions = JSON.stringify(newState);

        localStorage.setItem('sesions', stringSesions);

        return newState
      })
      // console.log(`sesions po setSesions= ${sesions}`)

      // console.log(`stringSesion = ${stringSesions}`);

      clearInterval(intervalHandler)
      // alert("KONIEC")
      setCounter(0);
    }
  // }
  
  return (
    
    <div className="App">
      <header className="App-header">
      {console.log(`counter = ${counter}`)}
        <img src={logo} className={ counter ? "App-logo App-logo-animation" : "App-logo"} alt="logo" />
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          Pomodoro timer
        </p>
    
        <label>
          Nazwa:
        <input value={name} onChange={e => setName(e.target.value)}></input>
        </label>
        <label>
          Czas:
        <input type="number" value={time} style={{width: "100px"}} onChange={e => setTime(e.target.value)}/>

        minut
        </label>
        <button type="button" onClick={startCount}>
          Start
        </button>
        <button type="button" onClick={stopCount}>
          Stop
        </button>
        <button type="button" onClick={resetCount}>
          Reset
          
        </button>
        <div className="timer">
            {counter}
        </div>
      </header>
      <main>
        <ul>
          {  sesions &&   sesions.map( sesion => <ol>
            <p>{sesion.name}, {sesion.time}</p>
          </ol> ) }
        </ul>
      </main>
    </div>
  );
}

export default App;
