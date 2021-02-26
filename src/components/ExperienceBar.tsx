import {useContext, useState} from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExperienceBar.module.css';

export function ExperienceBar(){    
    const {
        currentExperience, setCurrentExperience,
        experienceActualLevel, experienceToNextLevel
    } = useContext(ChallengesContext);
    
    const [gotTarget, setGotTarget] = useState(false);
    const [barWidth, setBarWidth] = useState(0)
    const [expValueWidth, setExpValueWidth] = useState(0)

    const experiencePercent = ()=>currentExperience*100+'%'

    function expAnchorPos(){

        let expBarWidthCalc = currentExperience*barWidth

        if (
            expBarWidthCalc < expValueWidth/2
            ||
            (barWidth - expBarWidthCalc) < expValueWidth/2
        ){
            //  deslocamento de ancora fluido (0->100). Movimentos menores, movimento mais agravel em espaço pequeno, 'vai e vem' em espaços médios
            // return '-'+experiencePercent();
            // deslocamento de ancora 'compassado' (0,50,100). Transições geralmente mais bruscas, comportamento mais adequado em grande espaço
            return currentExperience>0.5? '-100%':'0%'
        }

        return '-50%'
    }
    function expPoint(){
        
        let expBarWidthCalc = currentExperience*barWidth

        // tamanhos harcoded do global.css (pois o ponto tem tamanho fixo)
        if (expBarWidthCalc < 3) return `3px`
        if ((barWidth-expBarWidthCalc) < 3) return `calc(100% - 3px)`

        
        return experiencePercent()
    }

    return(
        <div>
            <header className={styles.experienceBar}>
                <span>{experienceActualLevel} xp</span>
                <div
                    ref={el => {
                        if (!el) return
                        setBarWidth(el.getBoundingClientRect().width)
                    }}
                >
                    <div className={styles.currentExperienceBar} style={{width: experiencePercent()}}/>
                    <span className={styles.currentExperiencePoint} style={{left: expPoint()}}></span>
                    <span
                        className={styles.currentExperienceValue}
                        style={{
                            left: experiencePercent(),
                            transform: `translateX(${expAnchorPos()})`
                        }}
                        ref={el => {
                            if (!el) return
                            setExpValueWidth(el.getBoundingClientRect().width)
                        }}
                    >
                        {Math.floor((experienceToNextLevel-experienceActualLevel)*currentExperience)} xp
                        {console.log(experienceActualLevel)}
                        
                    </span>
                </div>
                <span>{experienceToNextLevel} xp</span>
            
            </header>
            
            
        </div>
        
    )
}