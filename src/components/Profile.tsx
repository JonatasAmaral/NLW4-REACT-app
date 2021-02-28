import { useContext } from 'react';
import {ChallengesContext} from '../contexts/ChallengesContext'
import styles from '../styles/components/Profile.module.css';

export function Profile(){
    const {level} = useContext(ChallengesContext);
    const user = 'Jonatas Amaral'
    
    return(
        <div className={styles.profileContainer}>
            <img src={`https://github.com/${user.replace(/\s/g, "")}.png`} alt={`Foto de perfil de ${user}`}/>
            <div className={styles.profileInfo} >
                <strong>{user}</strong>
                <p>
                    <span className="icon-" aria-hidden>⬆</span>
                    Level {level}
                </p>
            </div>
        </div>
    )
}