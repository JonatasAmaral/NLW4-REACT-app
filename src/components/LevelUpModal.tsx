import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/LevelUpModal.module.css';

export function LevelUpModal(){
    const socialMediaName = 'twitter' // twitter, facebook, linkedin, whatsapp, discord
    const {level, closeLevelUpModal} = useContext(ChallengesContext);
    return(
        
        <div className={styles.overlay}>
            <div className={`${styles.LevelUpModalContainer} sociaIcon-${socialMediaName}`}>
                <header>{level}</header> 
                <strong>Parabéns</strong>
                <p>Você alcançou um novo level</p>

                <button className={styles.shareButton}>
                    compartilhar{ socialMediaName? ' no ':'' }<span className="socialMedia">{socialMediaName}</span>
                    <span className={`icon-${socialMediaName || 'share'}`}></span>
                </button>

                <button type="button" className={styles.closeModal} onClick={closeLevelUpModal}>
                    {/* <img src="/icons/close.svg" alt="Fechar modal"/> */}
                    <span className="icon-" aria-label="fechar modal de levelup">✖</span>
                </button>
            </div>
        </div>
    )
}