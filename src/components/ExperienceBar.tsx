import {useState} from 'react';

export function ExperienceBar(){
    const [currentExperience, setExperience] = useState(0.4);
    const [minExp, maxExp] = [0, 600];

    const experiencePercent = ()=>currentExperience*100+'%'


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
        </div>
    )
}