import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox(){
    const hasActiveChallenge = true;
    const levelContext = useContext(ChallengesContext)    

    return(
        <div className={styles.challengeBoxContainer}>

            { hasActiveChallenge? (
                <div className={styles.challengeActive}>
                    <header>Ganhe 400 xp</header>
                    
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
                            onClick={null}
                        >
                            Falhei
                        </button>
                        <button
                            type='button'
                            className={styles.challengeSucceededButton}
                            onClick={null}
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