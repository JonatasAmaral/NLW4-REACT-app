import { clear } from 'console';
import { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Countdown.module.css';

export function Countdown(){
    const initTime = 1 || 25*60;
    const [time, setTime] = useState(initTime);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const {startNewChallenge} = useContext(ChallengesContext)


    const minutes = Math.floor(time/60);
    const seconds = time - minutes*60; // time % 60

    const digitsMinutes = String(minutes).padStart(2, '0').split('');
    const digitsSeconds = String(seconds).padStart(2, '0').split('');

    let timeoutTrack;

    
    function startCountdown(){
        clearTimeout(timeoutTrack);
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
        } else if (isActive && time == 0){
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time])

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

            {/* equal to [ has? (val) : _null_ ] */}
            {hasFinished ? (
                <button 
                    className={`${styles.countdownButton}`}
                    disabled
                >   
                    {/* 😀✅✔🟢✔️✓ */}
                    Ciclo encerrado <span className="icon-">✓</span>
                </button>
            ) : (

                // tirar os '{.}' ao inves de usar o react fragment '<>.</>'
                isActive? (
                    <button 
                        type="button" 
                        className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                        onClick={resetCountdown}
                    >   
                        {/* ☓ ✗ ✖ */}
                        Abandonar o ciclo <span className="icon-">✖</span>
                    </button>
                ):(
                    <button 
                        type="button" 
                        className={styles.countdownButton}
                        onClick={startCountdown}
                    >   
                        Iniciar um ciclo <span className="icon-">▶</span>
                    </button>
                )
            )}
        </div>
    );
}
