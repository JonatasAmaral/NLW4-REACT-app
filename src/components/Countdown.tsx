import { clear } from 'console';
import { useState, useEffect } from 'react';
import styles from '../styles/components/Countdown.module.css';

export function Countdown(){
    const initTime = 25*60;
    const [time, setTime] = useState(initTime);
    const [isActive, setIsActive] = useState(false);

    const minutes = Math.floor(time/60);
    const seconds = time - minutes*60; // time % 60

    const digitsMinutes = String(minutes).padStart(2, '0').split('');
    const digitsSeconds = String(seconds).padStart(2, '0').split('');

    let timeoutTrack;
    let timeStop;

    
    function startCountdown(){
        setIsActive(true);
    }    
    function resetCountdown(){
        setIsActive(false);
        clearTimeout(timeoutTrack);
        setTime(initTime); // todo: animate time back
    }

    useEffect(()=>{
        if(isActive && time > 0){
            // console.log(time)

            timeoutTrack = setTimeout(()=>{
                setTime(time-1)
                // setTime(oldState=>oldState-1)
            }, 1000)
        }
    }, [isActive, time])

    useEffect(()=>{

    },[isActive, time])

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

            { isActive? (
                <button 
                    type="button" 
                    className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                    onClick={resetCountdown}
                >   
                    {/* '☓'||'✗'||'✖' */}
                    Abandonar o ciclo <span>✖</span>
                </button>
            ):(
                <button 
                    type="button" 
                    className={styles.countdownButton}
                    onClick={startCountdown}
                >   
                    Iniciar um ciclo <span>▶</span>
                </button>
            )}
        </div>
    );
}
