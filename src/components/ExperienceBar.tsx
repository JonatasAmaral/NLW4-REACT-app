import {useState} from 'react';

export function ExperienceBar(){
    const [currentExperience, setExperience] = useState(0.4);
    const [minExp, maxExp] = [0, 600];

    const experiencePercent = ()=>currentExperience*100+'%'

    function gainExperience(amount: number = 0.1){

        let newExp = 0;

        if ( Math.abs(amount) < 1 ){
            newExp = (currentExperience + amount)
        } else {
            newExp = (currentExperience + amount/(maxExp-minExp))
        }

        newExp = newExp>1? 1: newExp = newExp<0? 0:newExp

        setExperience(newExp);
    }

    return(
        <div>
            <header className="experience-bar">
                <span>0 xp</span>
                <div>
                    <div className="current-experience-bar" style={{width: experiencePercent()}}/>
                    <span
                        className="current-experience-value"
                        style={{
                            left: experiencePercent()
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
        </div>
        
    )
}