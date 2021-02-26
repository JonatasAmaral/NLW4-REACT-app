import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox(){
    const hasActiveChallenge = true;

    return(
        <div className={styles.challengeBoxContainer}>

            { hasActiveChallenge? (
                <div className={styles.challengeActive}>
                    <header>Ganhe 400 xp</header>
                    
                    <main>
                        <img src="icons/body.svg"/>
                        <strong>Novo desafio</strong>
                        <p>Levanta e paga dez</p>
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