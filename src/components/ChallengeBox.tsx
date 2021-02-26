import { useContext, useRef } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox(){
    const {
        activeChallenge, completeChallenge, resetChallenge,
        
        chalengeRef,
    } =  useContext(ChallengesContext)

    // const chalengeRef = useRef();

    return(
        <div className={styles.challengeBoxContainer} ref={chalengeRef}>

            { activeChallenge? (
                <div className={styles.challengeActive}>
                    <header>Ganhe {activeChallenge.amount} xp</header>
                    
                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`}/>
                        <strong>Novo desafio</strong>
                        <p>
                           {activeChallenge.description}
                        </p>
                    </main>
                    
                    <footer>
                        <button
                            type='button'
                            className={styles.challengeFailedButton}
                            onClick={resetChallenge}
                        >
                            Falhei
                        </button>
                        <button
                            type='button'
                            className={styles.challengeSucceededButton}
                            onClick={()=>completeChallenge(activeChallenge.amount)}
                        >
                            Completei
                        </button>
                    </footer>
                </div>
            ) : (
                <div className={styles.challengeNotActive}>
                    <strong>Finalize um ciclo para desbloquear um desafio</strong>
                    <p>
                        <img src="icons/level-up.svg" alt="a leveling up icon: a green arrow pointing up"/>
                        Complete-os para ganhar experiência e subir de level.
                    </p>
                </div>
            ) }
            
        </div>
    )
}