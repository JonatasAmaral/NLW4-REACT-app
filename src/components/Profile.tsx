import { useContext } from 'react';
import {ChallengesContext} from '../contexts/ChallengesContext'
import styles from '../styles/components/Profile.module.css';

export function Profile(){
    const levelContext = useContext(ChallengesContext)

    console.log(levelContext);
    

    return(
        <div className={styles.profileContainer}>
            <img src="https://github.com/JonatasAmaral.png" alt="Foto de perfil do Jonatas Amaral"/>
            <div className={styles.profileInfo} >
                <strong>Jonatas Amaral</strong>
                <p onClick={levelContext.levelUp}>
                    <img src="icons/level.svg" alt="icone de nivel do perfil"/>
                    Level {levelContext.level}
                </p>
            </div>
        </div>
    )
}