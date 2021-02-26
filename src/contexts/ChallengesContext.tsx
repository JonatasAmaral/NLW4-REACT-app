import {createContext, useState, ReactNode} from 'react'
import { render } from 'react-dom';

export const ChallengesContext = createContext(null);

interface ChallengesProviderProps {
    children: ReactNode
}

export function ChallengesProvider ( {children}:ChallengesProviderProps ) {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);
    const [hasActiveChallenge, setHasActiveChallenge] = useState(false);
    let [experienceActualLevel, experienceToNextLevel] = [0, 600];


    function levelUp() {
        setLevel(level + 1);
        setCurrentExperience(0);
    }

    function gainExperience(amount: number = 0.1){
        
        if (amount>0 && currentExperience === 1) return
        // if (amount<0) setGotTarget(false);
        
        let newExp = 0;
        
        if ( Math.abs(amount) < 1 ){
            newExp = (currentExperience + amount)            
        } else {
            newExp = (currentExperience + amount/(experienceToNextLevel-experienceActualLevel))
        }
        
        newExp = newExp>1? 1: newExp = newExp<0? 0:newExp
        
        setCurrentExperience(newExp);
        
        if (newExp >= 1 ){
            setTimeout(()=>levelUp(),500)
        }
        /* setTimeout(()=>{
            setGotTarget(newExp === 1);
            // alert('Parabéns, você atingiu a meta!');
        }, 500) */
    }

    function startNewChallenge(){
        setHasActiveChallenge(true);
    }
    function completedOneChallenge(xp){
        setChallengesCompleted(challengesCompleted+1);
        gainExperience(xp);
        setHasActiveChallenge(false);
    }
    function failedOneChallenge(x){
        setHasActiveChallenge(false);
    }
    

    return (
        <ChallengesContext.Provider value={{
            level, levelUp,
            currentExperience, gainExperience,
            challengesCompleted, setChallengesCompleted,
            hasActiveChallenge, setHasActiveChallenge,
            
            experienceActualLevel, experienceToNextLevel,
            startNewChallenge, completedOneChallenge, failedOneChallenge
        }}>
            {children}
        </ChallengesContext.Provider>
    )
};
