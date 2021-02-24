import {useState} from 'react';
import styles from '../styles/components/ExperienceBar.module.css';

export function ExperienceBar(){
    const [currentExperience, setExperience] = useState(0.4);
    const [gotTarget, setGotTarget] = useState(false);
    const [minExp, maxExp] = [0, 600];
    
    
    const [barWidth, setBarWidth] = useState(0)
    const [expValueWidth, setExpValueWidth] = useState(0)

    const experiencePercent = ()=>currentExperience*100+'%'

    function gainExperience(amount: number = 0.1){

        if (amount>0 && currentExperience === 1) return
        if (amount<0) setGotTarget(false);

        let newExp = 0;

        if ( Math.abs(amount) < 1 ){
            newExp = (currentExperience + amount)
        } else {
            newExp = (currentExperience + amount/(maxExp-minExp))
        }

        newExp = newExp>1? 1: newExp = newExp<0? 0:newExp

        setExperience(newExp);

        setTimeout(()=>{
            setGotTarget(newExp === 1);
            // alert('Parabéns, você atingiu a meta!');
        }, 500)
    }
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
                <span>0 xp</span>
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
                        {Math.floor((maxExp-minExp)*currentExperience)} xp
                    </span>
                </div>
                <span>600 xp</span>
            
            </header>
            <br />
            
            {/* remover, usado para teste*/}
            <button style={{
                padding: "0.5rem",
                margin: "0.3rem",
                backgroundColor: "var(--text-highlight)",
                borderRadius: "50px",
                border: 0
            }} onClick={()=>{gainExperience(-50)}}>- exp</button>
            
            <button style={{
                padding: "0.5rem",
                margin: "0.3rem",
                backgroundColor: "var(--text-highlight)",
                borderRadius: "50px",
                border: 0
            }} onClick={()=>gainExperience(50)}>+ exp</button>
            <br />
            <br />
            <h2 style={{
                // opacity: gotTarget? 1 : 0.0,
                // display: gotTarget? 'default' : 'none',
                visibility: gotTarget? 'visible' : 'hidden',
                textAlign: "center",
                color: "var(--green)"
            }}>
                Parabéns, você atingiu a meta!
            </h2>
        </div>
        
    )
}