import { useContext } from 'react'
import { ChallengeContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/Profile.module.css'

export function Profile (){

    const { level } = useContext(ChallengeContext);

    return (
        <div className={styles.profileContainer}>
            <img src="http://github.com/BrunoSampaioDev.png" alt="Bruno"/>
            <div>
                <strong>Bruno Sampaio</strong>
                <p>
                    <img src="icons/level.svg"/>
                    Level {level}
                </p>
            </div>
        </div>
    )
}