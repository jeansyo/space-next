import { usePagination } from "../../hooks/usePagination";
import { useRouter } from 'next/router';

import Layout from "../../components/Layout";
import styles from '../../styles/Technology.module.css'
import imageStyle from '../../styles/technology'
import dbConnect from "../../lib/dbConnect";
import Technology from "../../models/technology";
import { useEffect } from "react";

export default function Index({results}) {

    const router = useRouter();
    const { q } = router.query;

    useEffect(() => {
        router.push(`?q=${ results[0].name.toLowerCase() }`)
    }, [router,results])

    const [ interval, hanldeOnPrev, handleOnNext ] = usePagination(0, 3, results.length);
    const { min, max } = interval;

    const handleOnClick = (name) => {
        router.push(`?q=${ name.toLowerCase() }`)
    }

    return (
        <Layout
            title="Space Tourism | Technologies"
            description={ `Space Technology - ${ !!q && q.toUpperCase() }` }
        >
            <div className={ styles.content }>
            
            <div className="container row mx-auto pb-4 pt-5">
                    <div className="col-12 order-1">
                        <div className={ `col-12 d-flex title justify-content-center justify-content-md-start` }>
                            <b className="me-2">
                                03
                            </b> 
                            <p className="text-uppercase">
                                Space launch 101
                            </p>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 order-2 order-md-3">
                        <div 
                            className='contentImage'
                        >
                        </div>
                        <style jsx>{imageStyle}</style>
                    </div>
                    <div className="col-12 col-md-6 d-flex flex-column align-items-center mt-3 order-3 order-md-2 align-items-md-start justify-content-center">
                        
                        {
                            results.map( (val) => (
                                ( val.name.toLowerCase() === q)
                                    &&(
                                        <div key={ val._id } className="col-12 order-1 order-sm-2">
                                            <div className="text-center text-md-start">
                                                <div className={ `col-12 d-flex flex-column title justify-content-center justify-content-lg-start` }>
                                                    <b className="me-2 d-block fw-light text-uppercase">
                                                        The technology...
                                                    </b> 
                                                    <p className="text-uppercase fw-100">
                                                        {
                                                            val.name
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                            <div className={ `mt-2 text-center text-md-start ${ styles.description }` }>
                                                {
                                                    val.description
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
                                <li onClick={ handleOnNext } className={`page-item nav-link ${ styles.item_navbar }`}>
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

    let results = await Technology.find({}).select('_id name images description');

    results = results.map(({_id, name, images, description}) => ({
        _id: _id.toString(),
        name,
        images: images[0],
        description
    }))

    return {
        props: {
            results
        },
        revalidate: 86400
    }

}
