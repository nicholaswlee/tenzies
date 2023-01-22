import React, {useState, useEffect} from 'react'
import './App.css';
import Die from './Die';
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti';
function App() {
  function getTen(){
    let nums = []
    for(let i = 0; i < 10; i++){
      nums.push(
        {
          value: Math.ceil(Math.random() * 6),
          isHeld: false,
          id: nanoid()
        }
      )
    }
    return nums 
  }
  const [turn, setTurn] = useState(0)
  const [highScore, setHighScore] = useState(localStorage.getItem("high-score") != "null" ? localStorage.getItem("high-score") : null)
  const [tenzies, setTenzies] = useState(false)
  const [diceNums, setDiceNums] = useState(getTen())
  useEffect(() => {
    const allHeld = diceNums.every(die => die.isHeld) //Returns true if every function passes
    const firstValue = diceNums[0].value;
    console.log(localStorage.getItem("high-score") == "null")
    const allSameValue = diceNums.every(die => die.value == firstValue)
    if(allHeld && allSameValue ){
      if(!highScore){
        setHighScore(turn)
        localStorage.setItem("high-score", turn)
      }else if(highScore > turn){
        setHighScore(turn)
        localStorage.setItem("high-score",turn)
      }
      setTenzies(true)
    }
    /*for(let i = 0; i < diceNums; i++){
      /*
      if(diceNums[i].isHeld){
        if(num == null){
          num = diceNums[i].value
        }else{
          if(num !== diceNums[i].value){
            win = false
            break
          }
        }
      }else{
        win = false
        break
      }
      

    }*/
  }, [diceNums])

  const dice = diceNums.map((die) =>{
    return <Die 
            key={die.id}
            value={die.value} 
            isHeld={die.isHeld}
            holdDice={() => {
              hold(die.id);
            }}
          />
  })

  function rollDice(){
    console.log(tenzies)
    if(tenzies){
      console.log("here")
      setDiceNums(getTen())
      setTenzies(false)
      setTurn(0)
    }else{
      setDiceNums(() => {
        return diceNums.map((die) => {
          if(!die.isHeld){
            return {
              value: Math.ceil(Math.random() * 6),
              isHeld: false,
              id: die.id
            }
          }
          return die
          
        })
      })
      setTurn(turn + 1)
    }
    
  }
  function hold(id){
     setDiceNums(diceNums.map((dice) => {
      if(dice.id === id){
        return {...dice, isHeld: !dice.isHeld}
      } 
      return dice
    })
    )
  
    console.log(id)
  }
  return (
    <div className="App">
      <main className='Main'>
        {tenzies && <Confetti/>}
        <div className="score--heading">
          <div className='turn--badge'>Turn: {turn}</div>
          <div className='turn--badge'>High Score: {highScore ? highScore : "None"}</div>
        </div>

        <h1>Tenzies</h1>
        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice-container">
          {dice}
        </div>
        <button className="reroll-button" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
      </main>
      
      </div>
  );
}

export default App;
