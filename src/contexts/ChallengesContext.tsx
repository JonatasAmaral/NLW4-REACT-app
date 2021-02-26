import {createContext, useState} from 'react'
import { render } from 'react-dom';

export const ChallengesContext = createContext(null);

export function ChallengesProvider ({children}) {
    const [level, setLevel] = useState(1)

    function levelUp() {
        setLevel(level + 1);
    }

    return (
        <ChallengesContext.Provider value={{
            level,
            levelUp
        }}>
            {children}
        </ChallengesContext.Provider>
    )
};
