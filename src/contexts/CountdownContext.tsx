import {createContext, useState, ReactNode, useContext, useEffect, useRef} from 'react'
import { ChallengesContext } from './ChallengesContext';


interface CountdownContextData{
    minutes: number;
    seconds: number;

    isActive: boolean;
    hasFinished: boolean;

    startCountdown: ()=>void;
    resetCountdown: ()=>void;
}

export const CountdownContext = createContext({} as CountdownContextData);

interface CountdownProviderProps {
    children: ReactNode
}


export function CountdownProvider ( {children}:CountdownProviderProps ) {
    
    const initTime = 3 || 25*60;
    const [time, setTime] = useState(initTime);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const {startNewChallenge} = useContext(ChallengesContext)


    const minutes = Math.floor(time/60);
    const seconds = time - minutes*60; // time % 60
    
    let timeoutTrack;

    
    function startCountdown(){
        clearTimeout(timeoutTrack);
        setIsActive(true);
    }    
    function resetCountdown(){
        clearTimeout(timeoutTrack);
        setIsActive(false);
        setHasFinished(false);

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
        <CountdownContext.Provider value={{
            minutes, seconds,
            isActive, hasFinished,
            startCountdown, resetCountdown
        }}>
            {children}
        </CountdownContext.Provider>
    )
}