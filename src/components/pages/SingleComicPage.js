import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import AppHeader from '../appHeader/AppHeader';
import useMarvelService from '../../services/MarvelService';
import Spiner from '../Spiner/Spiner';
import ErrorMessage from '../error/Error';
import './singleComicPage.scss'
import {AnimatePresence, motion} from 'framer-motion/dist/framer-motion'




const SingleComicPage = () => {
    const { comicId } = useParams();
    const [comic, setComic] = useState([]);
    const { clearError, getComicById, loading, error } = useMarvelService();

    const onComicLoaded = (comic) => {
        setComic(comic)
    }

    useEffect(() => {
        updateComic()
    }, [comicId])



    const updateComic = () => {
        clearError()
        getComicById(comicId)
            .then(onComicLoaded)
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinerElement = loading ? <Spiner /> : null;
    const content = !(loading || error || !comic) ? <View comic={comic} /> : null;

    return (
        <>
            {errorMessage}
            {spinerElement}
            {content}
        </>
    )
}

const NameAndDescrVariantsAnimation = {
    initial: { opacity: 0, transform: 'scale(0.4) translateX(-50%)' },
    animation: {
        opacity: 1, transform: 'scale(1) translateX(0%)',
        transition: {
            duration: 0.5
        }
    }
}

const imgVariantsAnimation = {
    initial: { opacity: 0, transform: 'scale(0.4) translateX(-60%)' },
    animation: {
        opacity: 1, transform: 'scale(1) translateX(0%)',
        transition: {
            duration: 0.5
        }
    }
}



const View = ({ comic }) => {
    const { thumbnail, title, description, page, language, price } = comic;
    return (
        <>
          <Helmet>
          <meta
                    name="description"
                    content={`${title} comics book`}
                />
                <title>{`${title}`}</title>
          </Helmet>
            <div className='app'>
                <AppHeader />
            </div>
            <div className='container'>
                <div className="single-comic">
                    <motion.img 
                    initial = 'initial'
                    animate = 'animation'
                    variants = {imgVariantsAnimation}
                    src={thumbnail} alt={title} className="single-comic__img" />
                            <motion.div
                            initial = 'initial'
                            animate = 'animation'
                              variants = {NameAndDescrVariantsAnimation}
                              className="single-comic__info">
                                <h2 className="single-comic__name">{title}</h2>
                                <p className="single-comic__descr">{description}</p>
                                <p className="single-comic__descr">{page}</p>
                                <p className="single-comic__descr">Language: {language}</p>
                                <div className="single-comic__price">{price}</div>
                            </motion.div>
                    <Link to='/comics' className="single-comic__back">Back to all</Link>
                </div>
            </div>
        </>
    )
}

export default SingleComicPage;