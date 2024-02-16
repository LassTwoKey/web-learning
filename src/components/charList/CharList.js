import './charList.scss';

import { useState,useEffect,useRef} from 'react';
import {AnimatePresence, motion} from 'framer-motion/dist/framer-motion'
import ErrorMessage from '../error/Error';
import PropTypes from 'prop-types';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../Spiner/Spiner';

const CharList = (props) => {
    const [char,setChar] = useState([]);
    const [newItemLoading,setNewItemLoading] = useState(false);
    const [offset,setOffest] = useState(210);
    const [isEndOfScreen,setIsEndOfScreen] = useState(false)
    const [charEnded,setCharEnded] = useState(false)

    const {loading,error,getAllCharacters} =  useMarvelService();


    useEffect(() => {
        onRequest(offset,true)
    },[])
   
    const liVariants = {
         visible:i => ({
             opacity:1, 
             y:300,
             transform:'scale(1) translateX(0%)',
             transition:{
                duration:0.7,
             }
         }),
         hidden:{opacity:0,transform:'scale(0.5) translateX(-100%)'},
    }


   const  onCharLoad = (newChar) => {
        let ended= false;
        if(newChar.length < 9){
            ended = true;
        }
        setChar(char => [...char,...newChar])
        setNewItemLoading(newItemLoading => false)
        setOffest(offset => offset + 9);
        setIsEndOfScreen(isEndOfScreen => false)
        setCharEnded(charEnded => ended)
    }


   const onRequest = (offset,initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true)
         setIsEndOfScreen(true)
        getAllCharacters(offset)
            .then(onCharLoad)
   }

  
   const onRequestScroll = () => {
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;
        const bodyHeight = document.body.offsetHeight;

        if (windowHeight + scrollY >= bodyHeight && !isEndOfScreen) {
            onRequest(offset)
        }
    }

   const itemsRef = useRef([]);
    
  

   const focusOnItem = (id) => {
     itemsRef.current.forEach(item => item.classList.remove('char__item_selected'));
     itemsRef.current[id].classList.add('char__item_selected');
     itemsRef.current[id].focus()
   }
    
 

   function renderItems(arr) {
        const { onCharSelected } = props;
        const Charitems = arr.map((item,i)=> {
            let imgStyle = { 'objectFit': 'cover' };
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = { 'objectFit': 'unset' };
            }
            return (
                <AnimatePresence >
                <motion.li
                initial = 'hidden'
                animate = 'visible'
                variants = {liVariants}
                ref = {el => itemsRef.current[i] = el }  
                onClick={() => {onCharSelected(item.id);focusOnItem(i)}}
                onKeyPress={(e) => {
                    if (e.key === ' ' || e.key === "Enter") {
                        props.onCharSelected(item.id);
                        focusOnItem(i);
                    }
                }}
                tabIndex={0}
                key={item.id} 
                className='char__item'>

                    <img src={item.thumbnail} alt={item.name} style={imgStyle}></img>
                    <div className='char__name'>{item.name}</div>
                </motion.li>
                </AnimatePresence>
            )
        })
        return (
            <ul className="char__grid">
                   {Charitems}
            </ul>
        )
    }
        const items = renderItems(char)
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading && !newItemLoading ? <Spinner /> : null;
        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {items}
                <button onClick={() => onRequest(offset)}
                    disabled={newItemLoading}
                    style={{'display:': charEnded ? 'none' : 'block'}}
                    className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;