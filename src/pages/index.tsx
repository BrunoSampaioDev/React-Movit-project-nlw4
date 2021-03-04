import Head from 'next/head';
import { GetServerSideProps } from 'next'
import { ExpirienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ChallengeBox } from "../components/ChallengeBox";

import { signIn, signOut, useSession } from 'next-auth/client'

import styles from '../styles/pages/Home.module.css';
import { CountdownProvider } from '../contexts/CountdouwnContext';
import { ChallengeProvider } from '../contexts/ChallengesContext';
import {FaGithub} from "react-icons/fa"
import {Login} from '../components/Login';

interface HomeProps {
  level: number;
  currentExpirience: number;
  challengesComplited: number;
}

export default function Home(props: HomeProps) {

  const [session, loading] = useSession()

  return (

    <>
      {!session && <>
        <div className={styles.ContainerLogin}>
          <div>
            <img className={styles.simbolo} src="/icons/Simbolo.png"/>
          </div>

          <div className={styles.boxLogin}>
            <img src="/icons/Logo.png"/>
            <h3>Bem-Vindo</h3>
            <button className={styles.btnLogin} onClick={() => signIn('github')}><FaGithub className={styles.iconGit}/>Entre com GitHub</button>
            
            
          </div>
        </div>
        </>
      }



      {session && <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
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
      </>}
    </>


    /* <ChallengeProvider 
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
          </ChallengeProvider> */
  )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { level, currentExpirience, challengesComplited } = ctx.req.cookies;

  return {

    props: {

      level: Number(level),
      currentExpirience: Number(currentExpirience),
      challengesComplited: Number(challengesComplited),

    }

  }


}