import {createContext, useState, ReactNode, useRef, useEffect} from 'react'
import challenges from '../../challenges.json'

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
}
export const ChallengesContext = createContext({} as ChallengesContextData);

interface ChallengesProviderProps {
    children: ReactNode
}

export function ChallengesProvider ( {children}:ChallengesProviderProps ) {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);

    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level+1)*4,2);
    const percentToNextLevel = Math.round((currentExperience*100)/experienceToNextLevel)
    
    const chalengeRef = useRef<HTMLDivElement>();
    const countdownRef = useRef<HTMLDivElement>();

    const [timesAskForNotify, setTimesAskForNotify] = useState(3)


    function askForNotify(){
        if(timesAskForNotify<=0 || !('Notification' in window)) return;

        Notification.requestPermission();
        setTimesAskForNotify(timesAskForNotify-1);
    }

    function levelUp(exeed?:number) {
        setLevel(level + 1);
        setCurrentExperience(exeed || 0);
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
        
        // scroll page to the unlocked challenge on smalls screens. "Hardcoding"
        // setTimeout(()=>document.getElementById("chalengeBoxElement").scrollIntoView(), 500)
        // TODO: scroll page to challenge by exporting a React useRef.
        // Works nicelly, but VS Code acuse error: "possibly undefined"
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
    
    return (
        <ChallengesContext.Provider value={{
            level, levelUp,
            currentExperience,
            challengesCompleted,
            activeChallenge,
            chalengeRef, countdownRef,
            askForNotify,
            experienceToNextLevel, percentToNextLevel,
            startNewChallenge, completeChallenge, resetChallenge
        }}>
            {children}
        </ChallengesContext.Provider>
    )
};
