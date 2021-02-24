import { clear } from 'console';
import { useState, useEffect } from 'react';
import styles from '../styles/components/Countdown.module.css';

export function Countdown(){
    const [time, setTime] = useState(25*60);
    const [active, setActive] = useState(false);

    const minutes = Math.floor(time/60);
    const seconds = time - minutes*60; // time % 60

    const digitsMinutes = String(minutes).padStart(2, '0').split('');
    const digitsSeconds = String(seconds).padStart(2, '0').split('');

    
    function startCountdown(){
        setActive(true);
    }

    useEffect(()=>{
        if(!active || time <= 0) return
        // console.log(time)

        setTimeout(()=>{
            setTime(time-1)
            // setTime(oldState=>oldState-1)
        }, 1000)
    }, [active, time])

    return(
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{digitsMinutes[0] || 0}</span>
                    <span>{digitsMinutes[1] || 0}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{digitsSeconds[0] || 0}</span>
                    <span>{digitsSeconds[1] || 0}</span>
                </div>
            </div>
            <button 
                type="button" 
                className={styles.countdownButton}
                onClick={startCountdown}
            >
                Iniciar um ciclo <span onMouseOver={()=>{console.log(time)}}>▶</span>
            </button>
        </div>
    );
}
