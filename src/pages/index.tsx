import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { CompletedChalenges } from "../components/CompletedChalenges";

import styles from '../styles/pages/Home.module.css';


export default function Home() {
  return (
    <div className={styles.container}>
      <ExperienceBar />
      
      <section>
        <div className={styles.mainAppContainer}>
          <Profile />
          <CompletedChalenges />
        </div>
      </section>
    </div>
  )
}
