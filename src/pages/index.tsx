import React from "react";
import styles from '../styles/pages/Home.module.css';

import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { CompletedChalenges } from "../components/CompletedChalenges";
import { Countdown } from "../components/Countdown";


export default function Home() {
  return (
    <div className={styles.container}>
      <ExperienceBar />
      
      <section>
        <div className={styles.mainAppContainer}>
          <Profile />
          <CompletedChalenges />
          <Countdown />
        </div>
      </section>
    </div>
  )
}
