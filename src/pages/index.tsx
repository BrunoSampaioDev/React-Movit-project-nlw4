import Head from 'next/head';
import { GetServerSideProps } from 'next'
import { ExpirienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ChallengeBox } from "../components/ChallengeBox";

import styles from '../styles/pages/Home.module.css';
import { CountdownProvider } from '../contexts/CountdouwnContext';
import { ChallengeProvider } from '../contexts/ChallengesContext';


interface HomeProps {
  level:number;
  currentExpirience:number;
  challengesComplited:number;
}

export default function Home(props: HomeProps) {
  return (
    <ChallengeProvider 
    level={props.level}
    currentExpirience={props.currentExpirience}
    challengesComplited={props.challengesComplited}
    >
      <div className={styles.container}>
        <Head>
          <title>Inicio | move.it</title>
        </Head>

        <ExpirienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>

            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
      </ChallengeProvider>
  )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { level, currentExpirience, challengesComplited } = ctx.req.cookies;

  return {

    props: {

      level: Number(level),
      currentExpirience:Number(currentExpirience),
      challengesComplited:Number(challengesComplited),

    }

  }


}