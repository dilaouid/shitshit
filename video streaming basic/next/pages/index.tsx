import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Streaming Page</title>
        <meta name="description" content="Please learn how to do streaming ffs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Chainsaw Man
        </h1>
        <video
          src="/api/streaming?id=chainsawman"
          controls={true}
        />
      </main>

    </div>
  )
}
