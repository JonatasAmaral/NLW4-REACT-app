import {createContext, useState, ReactNode} from 'react'
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
    startNewChallenge: ()=> void;
    activeChallenge: Challenge;
    resetChallenge: ()=> void;
    experienceToNextLevel: number;
    percentToNextLevel: number;
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


    function levelUp(exeed?:number) {
        setLevel(level + 1);
        setCurrentExperience(exeed || 0);
    }

    function gainExperience(amount: number = 0){
        
        if (amount>0 && currentExperience === 1) return
        // if (amount<0) setGotTarget(false);
        
        let newExp = 0;
        
        if ( Math.abs(amount) < 1 ){
            //newExp = (currentExperience + amount)// todo: refacor this percent inclease

        } else {
        }
        newExp = (currentExperience + amount)

        if (newExp >= experienceToNextLevel ){
            let exeed = newExp-experienceToNextLevel
            setTimeout(()=>levelUp(exeed),1000)
        }
        newExp = newExp>experienceToNextLevel? experienceToNextLevel: newExp = newExp<0? 0:newExp
        
        setCurrentExperience(newExp);
        
        
        /*
         setTimeout(()=>{
            setGotTarget(newExp === 1);
            // alert('Parabéns, você atingiu a meta!');
        }, 500) */
    }

    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        setActiveChallenge(challenges[randomChallengeIndex]);
    }
    function completedOneChallenge(xp){
        setChallengesCompleted(challengesCompleted+1);
        gainExperience(xp);
        resetChallenge();
    }
    function resetChallenge(){
        setActiveChallenge(null);
    }
    

    return (
        <ChallengesContext.Provider value={{
            level, levelUp,
            currentExperience, gainExperience,
            challengesCompleted, setChallengesCompleted,
            activeChallenge,
            
            experienceToNextLevel, percentToNextLevel,
            startNewChallenge, completedOneChallenge, resetChallenge
        }}>
            {children}
        </ChallengesContext.Provider>
    )
};
