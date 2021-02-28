import { useContext } from 'react';
import {ChallengesContext} from '../contexts/ChallengesContext'
import styles from '../styles/components/Profile.module.css';

export function Profile(){
    const {level} = useContext(ChallengesContext);
    
    return(
        <div className={styles.profileContainer}>
            <img src="https://github.com/JonatasAmaral.png" alt="Foto de perfil do Jonatas Amaral"/>
            <div className={styles.profileInfo} >
                <strong>Jonatas Amaral</strong>
                <p>
                    <span className="icon-" aria-hidden>⬆</span>
                    Level {level}
                </p>
            </div>
        </div>
    )
}