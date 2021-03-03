import {createContext, useState, ReactNode, useContext, useEffect, useRef} from 'react'
import { ChallengesContext } from './ChallengesContext';
import Cookies from 'js-cookie';


interface CountdownContextData{
    workTime: number
    minutes: number;
    seconds: number;

    isActive: boolean;
    hasFinished: boolean;

    startCountdown: ()=>void;
    resetCountdown: ()=>void;

    timePassedPercentage: ()=>number;
    changeWorkTime: (arg?: number)=> void;
}

export const CountdownContext = createContext({} as CountdownContextData);

interface CountdownProviderProps {
    children: ReactNode,
    timerCookie: number
}

export function CountdownProvider ( {children, timerCookie}:CountdownProviderProps ) {
    
    const initTime = 25*60; // default worktime: 25 minutes
    const [workTime,setWorkTime] = useState(timerCookie ?? initTime);
    const [time, setTime] = useState(workTime);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const {startNewChallenge, askForNotify} = useContext(ChallengesContext)

    const timePassedPercentage = ()=>(workTime-time)/workTime

    const minutes = Math.floor(time/60);
    const seconds = time - minutes*60; // time % 60
    
    let timeoutTrack;

    function startCountdown(){
        clearTimeout(timeoutTrack);
        setIsActive(true);
        askForNotify();
    }    
    function resetCountdown(){
        clearTimeout(timeoutTrack);
        setIsActive(false);
        setHasFinished(false);

        setTime(workTime); // todo: animate time back
    }

    useEffect(()=>{
        if(isActive && time > 0){
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

    function changeWorkTime(newValue?){

        setWorkTime((!!newValue)? newValue : initTime);
    }

    useEffect(()=>{
        if(workTime<0){setWorkTime(0); return}
        if(workTime>((99*60)+59)){ setWorkTime( ((99*60)+59) ); return}

        Cookies.set('workTime', String(workTime))
        resetCountdown();
    },[workTime])

    return(
        <CountdownContext.Provider value={{
            workTime,
            minutes, seconds,
            isActive, hasFinished,
            startCountdown, resetCountdown,
            timePassedPercentage,
            changeWorkTime
        }}>
            {children}
        </CountdownContext.Provider>
    )
}