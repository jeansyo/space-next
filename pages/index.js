import Layout from '../components/Layout';

import Link from 'next/link'

import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <Layout 
      title={ "Space Tourism" } 
      description={ "You want to travel to Space" } 
    >

      <div className={ styles.main }>
      <div className={ `text-white mt-4 text-center ${ styles.home }` }>
        <div className={ styles.text_home }>
          <p className="fs-3 fw-light text-uppercase">so, you want to travel to</p>
          <h1 className={ `${ styles.title }` }>
            Space
          </h1>
          <p className="mt-5 fs-4 fw-light lh-lg">
            Let’s face it; if you want to go to space, you might as well genuinely go to outer space and not hover kind of on the edge of it. Well sit back, and relax because we’ll give you a truly out of this world experience! Explore
          </p>
        </div>
        <div className={ `rounded-50 bg-white mx-auto mt-5 ${ styles.button }` }>
          <Link href="/destination">
            <a className={ styles.button_link }>
              Explore
            </a>
          </Link>
        </div>
        </div>

      </div>
        
    </Layout>
  )
}
