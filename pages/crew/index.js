import Image from 'next/image';
import { useRouter } from 'next/router'

import Layout from "../../components/Layout";
import styles from '../../styles/Crew.module.css';
import dbConnect from "../../lib/dbConnect";
import Crew from "../../models/crew";
import { useEffect } from "react";
import { usePagination } from '../../hooks/usePagination';

export default function Index({ results }) {
    
    const router = useRouter()
    const { q } = router.query;

    useEffect(() => {
        router.push(`?q=${ results[0].name.toLowerCase() }`)
    }, [router,results])

    const [interval, hanldeOnPrev, hanldeOnNext] = usePagination(0, 3, results.length);

    const { min, max } = interval;

    const handleOnClick = (name) => {
        router.push(`?q=${ name.toLowerCase() }`)
    }

    return (
        <Layout
            title={ `Space Tourism | Crews` }
            description={ `Meet your crew - ${ !!q && ( q.toUpperCase() ) }` }
        >
            <div
                className={ styles.content }
            >
                <div className="container row mx-auto pb-4">
                    <div className="col-12 order-1">
                        <div className={ `col-12 d-flex title justify-content-center justify-content-md-start` }>
                            <b className="me-2">
                                01
                            </b> 
                            <p className="text-uppercase">
                                meet your crew
                            </p>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 orde order-2 order-sm-3">
                        <Image
                            src="/assets/crew/image-victor-glover.png"
                            width={549}
                            height={645}
                            className={ styles.image }
                            alt={ results.map(val => (val.name.toLowerCase() === q)? ( val.name ): "Space Tourism | Crews") }
                        />
                    </div>
                    <div className="col-12 col-md-6 d-flex flex-column align-items-center mt-3 order-3 order-sm-2 align-items-md-start justify-content-center">
                        
                        {
                            results.map( ({_id, name, bio, role}) => (
                                ( name.toLowerCase() === q )
                                    &&(
                                        <div key={_id} className="col-12 order-1 order-sm-2">
                                            <div className="text-center text-md-start">
                                                <div className={ `col-12 d-flex flex-column title justify-content-center justify-content-lg-start` }>
                                                    <b className="me-2 d-block fw-light text-uppercase">
                                                        {
                                                            role
                                                        }
                                                    </b> 
                                                    <p className="text-uppercase fw-100">
                                                        {
                                                            name
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                            <div className={ `mt-2 text-center text-md-start ${ styles.description }` }>
                                                {
                                                    bio
                                                }
                                            </div>
                                        </div>
                                    )
                            ) )
                        }

                        <nav className="Page navigation example pagination-dark order-2 order-sm-1">
                            <ul className="pagination">
                                <li onClick={ hanldeOnPrev } className={`page-item nav-link ${ styles.item_navbar }`}>
                                    <span aria-hidden="true">&laquo;</span>
                                </li>
                                {
                                    results.map( ( val, idx ) => (
                                        <li 
                                            key={ val._id }
                                            className={`page-item nav-link ${ styles.item_navbar }`}
                                            onClick={ () => handleOnClick(val.name) }
                                        >
                                            {
                                                idx+1
                                            }
                                        </li>
                                    ) ).slice( min, max )
                                }
                                <li onClick={ hanldeOnNext } className={`page-item nav-link ${ styles.item_navbar }`}>
                                    <span aria-hidden="true">&raquo;</span>
                                </li>
                            </ul>
                        </nav>

                    </div>
                </div>
            </div>

        </Layout>
    )
}

export async function getStaticProps() {

    await dbConnect();

    let results = await Crew.find({}).select('_id name images role bio');
    results = results.map( ({ 
                                _id,
                                name,
                                images,
                                role,
                                bio ,
                            }) => ({
                                _id: _id.toString(),
                                name,
                                images: images[0],
                                role,
                                bio,
                            }))

    return {
        props: {
            results
        },
        revalidate: 86400
    }
    
}

