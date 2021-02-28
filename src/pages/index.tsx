import React from "react";
import Head from 'next/head'
import {GetServerSideProps} from 'next'

import styles from '../styles/pages/Home.module.css';

import { CountdownProvider } from "../contexts/CountdownContext";
import { ChallengesProvider, ChallengesProviderProps } from "../contexts/ChallengesContext";

import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { CompletedChalenges } from "../components/CompletedChalenges";
import { Countdown } from "../components/Countdown";
import { ChallengeBox } from "../components/ChallengeBox";


export default function Home(props:ChallengesProviderProps) {  
  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    
    >

      <div className={styles.container}>

        <Head>
          <title>Início | move.it</title>
        </Head>
        
        <ExperienceBar />
        
        <CountdownProvider>
          <section>
            <div className={styles.mainAppContainer}>
              <Profile />
              <CompletedChalenges />
              <Countdown />
            </div>
            <ChallengeBox />
          </section>
        </CountdownProvider>
      </div>

    </ChallengesProvider>
  )
}

export const getServerSideProps:GetServerSideProps = async (ctx)=>{
  
  const {level,
      currentExperience,
      challengesCompleted} = ctx.req.cookies

  const user = {
    level: Number(level),
    currentExperience: Number(currentExperience),
    challengesCompleted: Number(challengesCompleted)
  }
  
  return {
    props: user
  }
}