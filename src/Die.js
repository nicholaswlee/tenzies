import React from 'react'

export default function Die(props){
    const styles = {
        backgroundColor: (props.isHeld) ? "#59E391" : "#FFFFFF"
    }
    function createDots(value){
        let dots = []
        for(let i = 0; i < value; i++){
            dots.push(<span className="die-dots">•</span>)
        }
        return dots
    }
    return (
        <div onClick={props.holdDice} className="die-face" style={styles}>
            <h2 className="die-num">{createDots(props.value)}</h2>
        </div>
    )
}