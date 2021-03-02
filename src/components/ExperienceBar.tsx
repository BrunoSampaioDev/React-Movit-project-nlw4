import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExperienceBar.module.css';

export function ExpirienceBar(){

    const { currentExpirience, experienceToNextLevel } = useContext(ChallengeContext);

    const percentToNextLevel = Math.round(currentExpirience * 100) / experienceToNextLevel;
    return(
        <header className={styles.experienceBar}>
            <span>0 xp</span>
            <div>
                <div style={{width:`${percentToNextLevel}%`}}/>

                <span className={styles.currentExperience} style={{left: `${percentToNextLevel}%`}}>
                    {currentExpirience} xp
                </span>
                
            </div>
            <span>{experienceToNextLevel} xp</span>
        </header>
    )
}