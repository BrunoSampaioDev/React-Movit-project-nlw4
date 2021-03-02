import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';


interface Challenge {
    type: 'body | eye';
    description: string;
    amount: number;
}


interface ChallengesContextData {
    currentExpirience: number;
    challengesComplited: number;
    level: number;
    levelUp: () => void;
    startNewChallenge: () => void;
    activeChallenge: Challenge;
    resetChallenge: () => void;
    completeChallenge: () => void;
    experienceToNextLevel: number;
    closeLevelUpModal: () => void;
}

export const ChallengeContext = createContext({} as ChallengesContextData);


interface ChallengeProviderProps {
    children: ReactNode,
    level:number;
    currentExpirience:number;
    challengesComplited:number;
}


export function ChallengeProvider({ children,  ...rest}: ChallengeProviderProps) {

    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExpirience, setCurrentExpirience] = useState(rest.currentExpirience ?? 0);
    const [challengesComplited, setChallengesComplited] = useState(rest.challengesComplited ?? 0);

    const [activeChallenge, setActiveChallenge] = useState(null);

    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(()=>{
        Notification.requestPermission();
    }, [])


    useEffect(()=>{
            Cookies.set('level', String(level));
            Cookies.set('currentExpirience', String(currentExpirience));
            Cookies.set('challengesComplited', String(challengesComplited));
    },[level, currentExpirience, challengesComplited]);


    function levelUp() {
        setLevel(level + 1);
        setIsLevelUpModalOpen(true);
    }

    function closeLevelUpModal(){
        setIsLevelUpModalOpen(false);
    }



    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];
        setActiveChallenge(challenge);

        new Audio ('/notification.mp3').play();

        if(Notification.permission == 'granted'){
            new Notification('Novo Desafio', {
                body:`Valendo ${challenge.amount} xp`
            })
        }
    }

    function resetChallenge(){
        setActiveChallenge(null)
    }

    function completeChallenge(){
        
        if(!activeChallenge){
            return;
        }

        const {amount} = activeChallenge;

        let finalExpirience = currentExpirience + amount;

        if(finalExpirience >= experienceToNextLevel){
            finalExpirience = finalExpirience - experienceToNextLevel
            levelUp();
        }

        setCurrentExpirience(finalExpirience);
        setActiveChallenge(null);
        setChallengesComplited(challengesComplited + 1);
    }


    return (
        <ChallengeContext.Provider
            value={{
                currentExpirience,
                challengesComplited,
                level,
                levelUp,
                startNewChallenge,
                activeChallenge,
                resetChallenge,
                experienceToNextLevel,
                completeChallenge,
                closeLevelUpModal,
            }}>
            {children}
           {isLevelUpModalOpen && <LevelUpModal/>}
        </ChallengeContext.Provider>
    )

}
