import {createContext, useState, ReactNode, useRef, useEffect} from 'react'
import challenges from '../../challenges.json'
import Cookies from 'js-cookie';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData{
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    levelUp: ()=>void;
    startNewChallenge: ()=>void;
    activeChallenge: Challenge;
    resetChallenge: ()=>void;
    experienceToNextLevel: number;
    percentToNextLevel: number;
    completeChallenge: (xp)=>void;
    chalengeRef: any;
    countdownRef: any;
    askForNotify: ()=>void;
    closeLevelUpModal: ()=>void;
}
export const ChallengesContext = createContext({} as ChallengesContextData);

export interface ChallengesProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    workTime?: number;
}

export function ChallengesProvider ( {children, ...userCookies}:ChallengesProviderProps ) {

    const [level, setLevel] = useState( userCookies.level || 1 );
    const [currentExperience, setCurrentExperience] = useState( userCookies.currentExperience || 0 );
    const [challengesCompleted, setChallengesCompleted] = useState( userCookies.challengesCompleted || 0 );
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level+1)*4,2);
    const percentToNextLevel = Math.round((currentExperience*100)/experienceToNextLevel)
    
    const chalengeRef = useRef<HTMLDivElement>();
    const countdownRef = useRef<HTMLDivElement>();

    const [timesAskForNotify, setTimesAskForNotify] = useState(3)

    useEffect(() => {

        // salvar cookie com API Javascript
       /*  document.cookie = `level=${level}`
        document.cookie = `currentExperience=${currentExperience}`
        document.cookie = `challengesCompleted=${challengesCompleted}` */

        // salvar cookie com biblioteca js-cookie
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));

    }, [level, currentExperience, challengesCompleted])

    function askForNotify(){
        if(timesAskForNotify<=0 || !('Notification' in window)) return;

        Notification.requestPermission();
        setTimesAskForNotify(timesAskForNotify-1);
    }

    function levelUp(exeed?:number) {
        setLevel(level + 1);
        setCurrentExperience(exeed || 0);
        setIsLevelUpModalOpen(true);
    }

    function gainExperience(amount: number = 0){
                
        let newExperience = 0;
        newExperience = (currentExperience + amount)

        if (newExperience >= experienceToNextLevel){
            let exeed = newExperience-experienceToNextLevel
            setTimeout(()=>levelUp(exeed),1000)

            newExperience = experienceToNextLevel; // stale exp bar a sec in max position, for user visual feedback
        }
        else newExperience = newExperience<0? 0:newExperience // for LOSE experience purpose, never lose LEVEL
        
        setCurrentExperience(newExperience);
    }

    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex]
        setActiveChallenge(challenge);
        
        setTimeout(()=>{
            let position = chalengeRef.current.clientHeight>window.innerHeight? 'end':'center' as ScrollLogicalPosition
            chalengeRef.current.scrollIntoView({
                behavior: 'smooth',
                block: position,
                inline: 'center'
            })
        }, 500)

        new Audio('/notification.mp3').play();

        // notificar apenas se document.visibilityState === 'hidden' ( !'visible' )
        if (document.visibilityState === "visible") return;
        
        if(Notification.permission === 'granted'){
            new Notification(`Novo desafio ${challenge.type == 'body'? '🦾':'👀' } valendo ${challenge.amount}`, {
                body: `${challenge.description}`,
                lang: 'pt-br',
                icon: 'favicon.png',
                vibrate: [100,100,300,200,100]
            })
        } else {
            if (Notification.permission === 'denied' || timesAskForNotify<=0) return;
            askForNotify();
        }
    }
    function completeChallenge(xp){
        if (!activeChallenge) return;
        resetChallenge();
        setChallengesCompleted(challengesCompleted+1);
        gainExperience(xp);
    }
    function resetChallenge(){

        let resetTimer = setTimeout(()=>{
            setActiveChallenge(null);

            let position = countdownRef.current.parentElement.clientHeight>window.innerHeight? 'end':'center' as ScrollLogicalPosition

            countdownRef.current.parentElement.scrollIntoView({
                behavior: 'smooth',
                block: position,
                inline: 'center'
            })
            clearTimeout(resetTimer);
        }, 200)
    }

    function closeLevelUpModal(){
        setIsLevelUpModalOpen(false); 
    }
    
    return (
        <ChallengesContext.Provider value={{
            level, levelUp,
            currentExperience,
            challengesCompleted,
            activeChallenge,
            chalengeRef, countdownRef,
            askForNotify,
            closeLevelUpModal,
            experienceToNextLevel, percentToNextLevel,
            startNewChallenge, completeChallenge, resetChallenge
        }}>
            {children}
            {isLevelUpModalOpen && <LevelUpModal />}
        </ChallengesContext.Provider>
    )
};
