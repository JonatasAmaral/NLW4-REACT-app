import {useState} from 'react';

export function ExperienceBar(){    
    return(
        <div>
            <header className="experience-bar">
                <span>0 xp</span>
                <div>
                    <div className="current-experience-bar" style={{width: '50%'}}/>
                    <span
                        className="current-experience-value"
                        style={{
                            left: '50%'
                        }}
                    >
                        300 xp
                    </span>
                </div>
                <span>600 xp</span>
            
            </header>
        </div>
    )
}