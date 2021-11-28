import Image from "next/image"
import Layout from "../../components/Layout"
import { useRouter } from 'next/router'

import Destination from '../../models/destination';
import dbConnect from "../../lib/dbConnect"

import styles from '../../styles/Destination.module.css'
import { useEffect } from "react";

export default function Index({results}) {

    const router = useRouter();

    useEffect(() => {
        router.push(`?q=${ results[0].name.toLowerCase() }`);
    }, [router,results])

    const { q } = router.query || '';

    const handleOnClick = (name) => {
        router.push(`?q=${ name.toLowerCase() }`)
    }

    return (
        <Layout
            title="Space Tourism | Destination"
            description={ `Pick your destination - ${ !!q && q.toUpperCase() }` }
        >
            <div className={ ` ${ styles.content }` }>
                <div className="container row mx-auto">
                    <div className={ `col-12 d-flex title justify-content-center justify-content-lg-start` }>
                        <b className="me-2">
                            01
                        </b> 
                        <p className="text-uppercase" >
                            pick your destination
                        </p>
                    </div>
                    <div className="col-12 d-flex flex-wrap">
                        <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center">
                            <Image
                                src="/assets/destination/image-moon.png"
                                width={ 445 }
                                height={ 445 }
                                className={ `${ styles.image }` }
                                alt={ results.map(val => (val.name.toLowerCase() === q)? ( val.name ): "Space Tourism | Destination") }
                            />
                        </div>
                        <div className="col-12 col-lg-6">
                            <div className="col-12">
                                <ul className={ `${ styles.destination_nav } nav` }>
                                    {
                                        results.map( ({name, _id}) => ( 
                                            <li onClick={ () => handleOnClick(name) } key={ _id } className="nav-item text-uppercase me-3 pointer">
                                                {
                                                    name
                                                }
                                            </li>
                                         ) )
                                    }
                                </ul>
                            </div>
                            {
                                results.map( ({ name, description, _id, distance, travel }) => (
                                    ( name.toLowerCase() === q )
                                        &&(
                                            <div key={ _id }>
                                                <div className={ `col-12 text-uppercase text-white text-lg-start ${ styles.title_destination }` }>
                                                    {
                                                        name
                                                    }
                                                </div>
                                                <div className={ `col-11 text-center text-lg-start lh-lg mx-auto ms-lg-0 ${ styles.destination_description }` }>
                                                    {
                                                        description
                                                    }
                                                </div>
                                                <div className="col-12 pb-5 mt-5 d-flex flex-wrap mt-lg-1">
                                                    <div className="col-12 col-sm-6 mt-4 pb-3">
                                                        <p className={ `text-uppercase text-center color2 fw-light ${ styles.text_infoo }` }>
                                                            Avg. distance
                                                        </p>
                                                        <p className={ `text-center color3 ${ styles.text_info }` }>
                                                            {
                                                                distance
                                                            }
                                                        </p>
                                                    </div>
                                                    <div className="col-12 col-sm-6 pt-4">
                                                        <p className={ `text-uppercase text-center color2 fw-light ${ styles.text_infoo }`}>
                                                            Avg. travel
                                                        </p>
                                                        <p className={ `text-center color3 ${ styles.text_info }` }>
                                                            {
                                                                travel
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                ) )
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getStaticProps() {

    await dbConnect();

    let results = await Destination.find({}).select('_id name images description distance travel');

    results = results.map( ({ name, _id, description, images, distance, travel }) => ({
        name,
        description,
        distance,
        travel,
        images: images[0],
        _id: _id.toString()
    }));

    return {
        props: {
            results
        },
        revalidate: 86400
    }

}