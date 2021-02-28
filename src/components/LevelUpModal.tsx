import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/LevelUpModal.module.css';

export function LevelUpModal(){
    const {level, closeLevelUpModal} = useContext(ChallengesContext);
    let socialMediaName = '' // twitter, facebook, linkedin, whatsapp, discord
    let canUseShareAPI = false;
    
    try{
        if(navigator.share){
            canUseShareAPI = true;
        }
    }
    catch(err){}
    
    return(
        
        <div className={styles.overlay}>
            <div className={`${styles.LevelUpModalContainer} sociaIcon-${socialMediaName}`}>
                <header>{level}</header> 
                <strong>Parabéns</strong>
                <p>Você alcançou um novo level</p>

                {canUseShareAPI && (
                    <button
                        className={styles.shareButton}
                        onClick={()=>{
                            navigator.share({
                                title: `Avancei para o nivel ${level} no move.it!`,
                                text: `Eu avancei para o nivel ${level} no move.it. Da só uma olhada!`,
                                url: document.location.href
                            })
                        }}
                    >
                        compartilhar{ socialMediaName? ' no ':'' }<span className="socialMedia">{socialMediaName}</span>
                        <span className={`icon-${socialMediaName || 'share'}`}></span>
                    </button>
                )}

                <button type="button" className={styles.closeModal} onClick={closeLevelUpModal}>
                    <span className="icon-" aria-label="fechar modal de levelup">✖</span>
                </button>
            </div>
        </div>
    )
}