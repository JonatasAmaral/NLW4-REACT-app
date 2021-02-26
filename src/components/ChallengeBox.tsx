import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox(){
    const levelContext = useContext(ChallengesContext)
    const {
        currentExperience, gainExperience,
        completedOneChallenge, failedOneChallenge, hasActiveChallenge
    } = levelContext
    const experiencePointsToGain = 400;


    return(
        <div className={styles.challengeBoxContainer}>

            { hasActiveChallenge? (
                <div className={styles.challengeActive}>
                    <header>Ganhe {experiencePointsToGain} xp</header>
                    
                    <main>
                        <img src="icons/body.svg"/>
                        <strong>Novo desafio</strong>
                        <p>
                            É isso ai, mandou bem<br />
                            Agora caminhe por 3 minutos pra ficar saudável.
                        </p>
                    </main>
                    
                    <footer>
                        <button
                            type='button'
                            className={styles.challengeFailedButton}
                            onClick={()=>failedOneChallenge(experiencePointsToGain)}
                        >
                            Falhei
                        </button>
                        <button
                            type='button'
                            className={styles.challengeSucceededButton}
                            onClick={()=>completedOneChallenge(experiencePointsToGain)}
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