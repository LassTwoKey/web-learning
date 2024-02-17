import { useEffect, useRef, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import './comicsList.scss';
import ErrorMessage from '../error/Error';
import Spiner from '../Spiner/Spiner';
import { Link } from 'react-router-dom';
import {AnimatePresence, motion} from 'framer-motion/dist/framer-motion'


const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffest] = useState(310);
    const [newComicsLoad, setNewComicsLoad] = useState(false)
    const [comicsEnded,setComicsEnded] = useState(false)
    const {loading, error, getAllComics } = useMarvelService()

    useEffect(() => {
        updateComics(offset,true)
    }, [])

    const onComicsLoad = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true
        }
        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setOffest(offset + 15);
        setComicsEnded(ended)
        setNewComicsLoad(false)
    }
    const updateComics = (offset,initial) => {
        initial ? setNewComicsLoad(false) : setNewComicsLoad(true)
        getAllComics(offset)
            .then(onComicsLoad)
    }

    
    //    const itemsRef = useRef([]);

    //    const focusOnItem = (id) => {
    //       itemsRef.current.forEach(item => item.classList.remove('comics__item_active'));
    //       itemsRef.current[id].classList.add('comics__item_active')
    //       itemsRef.current[id].focus()
    //    }

    function renderItems(arr) {
        const comicsListItem = comicsList.map((item, i) => {
            return (
                <motion.li
                initial = {{
                    transform:'scale(0.4) translateX(-100%)'
                  }}
                  animate = {{
                    transform:'scale(1) translateY(0%)'
                  }}
                  transition = {{
                     duration:0.3
                  }} 
                    key={i}
                    tabIndex={0}
                    className="comics__item">
                    <Link to = {`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img" />
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </motion.li>
            )
        })
        return (
            <ul className="comics__grid">
                {comicsListItem}
            </ul>
        )
    }
    const comicsItems = renderItems(comicsList);
    const errorMessage = error ? <ErrorMessage /> : null;
    const loadingSpinner = loading && !newComicsLoad ? <Spiner /> : null;
    return (
        <div className="comics__list">
            {errorMessage}
            {comicsItems}
            {loadingSpinner}
            <button
                onClick={() => updateComics(offset)}
                style={{'display:': comicsEnded ? 'none' : 'block'}}
                disabled={newComicsLoad}
                className="button button__main button__long">
                <div

                    className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;