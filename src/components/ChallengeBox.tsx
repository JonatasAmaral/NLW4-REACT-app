import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox(){
    const levelContext = useContext(ChallengesContext)
    const {
        currentExperience, gainExperience,
        activeChallenge,
        completedOneChallenge, resetChallenge, hasActiveChallenge
    } = levelContext


    return(
        <div className={styles.challengeBoxContainer}>

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
                            onClick={()=>completedOneChallenge(activeChallenge.amount)}
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