import Head from "next/head";
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from "next/router";

import styles from '../styles/Layout.module.css'

export default function Layout({ children, title, description }) {

    const { pathname } =useRouter();


    return (
        <>
            <Head>
                <link rel="icon" href="/logo.png"/>
                <title>
                    {
                        title
                    }
                </title>
                <meta name="description" content={ description }/>
            </Head>

            
            <header
                className={ styles.header }
            >
                <div className={ styles.icon }>
                    <Image
                        src="/assets/shared/logo.svg"
                        width={ 40 }
                        height={ 40 }
                        className={ styles.icon_img }
                        alt="Space Tourism"
                    />
                </div>
                <div className={ `d-none d-md-inline-block ${ styles.line_navbar }` }></div>

                <div
                     data-bs-toggle="offcanvas" 
                     data-bs-target="#offcanvasMain" 
                     aria-controls="offcanvasMain"
                     className={ `fs-1 ${ styles.main_hamburger }` }
                >
                    <Image
                        src="/assets/shared/icon-hamburger.svg"
                        width={ 20 }
                        height={ 20 }
                        className={ styles.pointer }
                        alt="Space Tourism"
                    />
                </div>

                <div 
                    className={ `offcanvas offcanvas-end ${ styles.offcanvas_bg }` } 
                    tabIndex="-1" 
                    id="offcanvasMain" 
                    aria-labelledby="offcanvasRightLabel"
                >
                    <div className={ `offcanvas-header fs-2 text-white ${ styles.main_responsive, styles.btn_close }` }>
                        <h5 id="offcanvasRightLabel"></h5>
                        <button 
                            className="text-white btn-close text-reset" 
                            type="button" 
                            data-bs-dismiss="offcanvas" 
                            aria-label="Close"
                        >
                            <Image 
                                src="/assets/shared/icon-close.svg"
                                width={ 30 }
                                height={ 30 }
                                alt="Space Tourism"
                            />
                        </button>
                    </div>
                    <div className={ `offcanvas-body fs-2 fs-md-3 text-white ${ styles.main_responsive }` }>
                        <div className={ `mb-4 d-flex ${ styles.pointer, styles.navbar }` }>
                            <b className={ `ms-5 me-3 ${ (pathname === "/")? (styles.navbar_num_active): (styles.navbar_num) }` }>00</b> 
                            <Link href="/" className={ `text-light` }>
                                <a className={ (pathname==="/")? (styles.link_navbar_active): (styles.link_navbar) }>
                                HOME
                                </a>
                            </Link>
                        </div>
                        <div className={ `mb-4 d-flex ${ styles.pointer, styles.navbar}` }>
                            <b className={ `ms-5 me-3 ${ (pathname === "/destination")? (styles.navbar_num_active): (styles.navbar_num) }` }>01</b> 
                            <Link href="/destination" className={ `text-light ` }>
                                <a className={ (pathname==="/destination")? (styles.link_navbar_active): (styles.link_navbar) }>
                                DESTINATION
                                </a>
                            </Link>
                        </div>
                        <div className={ `mb-4 d-flex ${ styles.pointer, styles.navbar }` }>
                            <b className={ `ms-5 me-3 ${ (pathname === "/crew")? (styles.navbar_num_active): (styles.navbar_num) }` }>02</b> 
                            <Link href="/crew" className={ `text-light` }>
                                <a className={ (pathname==="/crew")? (styles.link_navbar_active): (styles.link_navbar) }>
                                CREW
                                </a>
                            </Link>
                        </div>
                        <div className={ `mb-4 d-flex ${ styles.pointer, styles.navbar }` }>
                            <b className={ `ms-5 me-3 ${ (pathname === "/technology")? (styles.navbar_num_active): (styles.navbar_num) }` }>03</b> 
                            <Link href="/technology" className={ `text-light` }>
                                <a className={ (pathname==="/technology")? (styles.link_navbar_active): (styles.link_navbar) }>
                                TECHNOLOGY
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
            <main
                className={ `container-fluid p-0` }
            >
                { 
                    children
                }
            </main>
        </>
    )
}
