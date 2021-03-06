import {useContext, useState} from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExperienceBar.module.css';

export function ExperienceBar(){    
    const {
        currentExperience,
        experienceToNextLevel, percentToNextLevel
    } = useContext(ChallengesContext);

    const [barWidth, setBarWidth] = useState(0)
    const [expValueWidth, setExpValueWidth] = useState(0)

    let expBarWidthCalc = (currentExperience/barWidth)*100;

    function expAnchorPos(){

        let expBarWidthCalc = percentToNextLevel/100*barWidth


        if (
            expBarWidthCalc < expValueWidth/2
            ||
            (barWidth - expBarWidthCalc) < expValueWidth/2
        ){
            //  deslocamento de ancora fluido (0->100). Movimentos menores, movimento mais agravel em espaço pequeno, 'vai e vem' em espaços médios
            // return '-'+percentToNextLevel+'%';
            // deslocamento de ancora 'compassado' (0,50,100). Transições geralmente mais bruscas, comportamento mais adequado em grande espaço
            return percentToNextLevel>50? '-100%':'0%'
        }
        else return '-50%'
    }
    function expPercentage(offset){
        
        expBarWidthCalc = offset;      

        // tamanhos harcoded do global.css (pois o ponto tem tamanho fixo)
        if (expBarWidthCalc < 3) return (offset+3)+'px'
        if ((barWidth-expBarWidthCalc) < 3) return (offset-3)+'px'

        return offset+'%'
    }

    return(
        <div>
            <header className={styles.experienceBar} >
                <span>0 xp</span>
                <div
                    ref={el => {
                        if (!el) return
                        setBarWidth(el.getBoundingClientRect().width)
                    }}
                >
                    <div className={styles.currentExperienceBar} style={{width: `${percentToNextLevel}%`}}/>
                    <span className={styles.currentExperiencePoint} style={{left: `${percentToNextLevel}%`}}></span>
                    <span
                        className={styles.currentExperienceValue}
                        style={{
                            left: `${percentToNextLevel}%`,
                            transform: `translateX(${expAnchorPos()})`
                        }}
                        ref={el => {
                            if (!el) return
                            setExpValueWidth(el.getBoundingClientRect().width)
                        }}
                    >
                        {`${currentExperience} xp`}
                    </span>
                </div>
                <span>{`${experienceToNextLevel} xp`}</span>
            </header>
        </div>
    )
}