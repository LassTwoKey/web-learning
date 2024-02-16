import { useEffect, useState } from 'react';
import {AnimatePresence, motion} from 'framer-motion/dist/framer-motion'
import mjolnir from '../../resources/img/mjolnir.png';
import useMarvelService from '../../services/MarvelService';
import Spiner from '../Spiner/Spiner';
import ErrorMessage from '../error/Error';
import './randomChar.scss';


const RandomChar = () => { 
    const [char,setChar] = useState({});
    const {loading,error,getCharacters,clearError} = useMarvelService();

    const onCharLoaded = (char) => {
         setChar(char)
    }
   
   const updateChar = () => {
    clearError()
     let id = Math.floor(Math.random() * (1011355  - 1009224) + 1009224)
         getCharacters(id)
         .then(onCharLoaded)
    }
  
    useEffect(() => {
        updateChar()
    },[])
  
     const variantsAnimate = {
         hidden:{opacity:0,x:-150},
         animation:{
            opacity:1,
            x:0,
            transition:{
                duration:0.5,
             }
         },
        
     }

      const errorMessage = error ? <ErrorMessage/> : null;
      const spinerElement = loading ? <Spiner/> : null;
      const content = !(loading || error )  ? <View variantsAnimate = {variantsAnimate} char = {char}/> : null;
     return (
        <>
        <div className="randomchar">
            {errorMessage}
            {spinerElement}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main">
                    <div  onClick = {updateChar}className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
     </>
    )
}

const View = ({char,variantsAnimate}) => {
    let {name,description,thumbnail,homepage,wiki} = char;
    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }

    return (
        <motion.div 
        initial = 'hidden'
        animate = 'animation'
        variants = {variantsAnimate}
        className="randomchar__block">
        <img src= {thumbnail} alt="Random character" className= 'randomchar__img' style = {imgStyle}/>
        <div className="randomchar__info">
            <p className="randomchar__name">{name}</p>
            <p className="randomchar__descr">
                {description}
            </p>
            <div className="randomchar__btns">
                <a href={homepage} className="button button__main">
                    <div className="inner">homepage</div>
                </a>
                <a href={wiki} className="button button__secondary">
                    <div className="inner">Wiki</div>
                </a>
            </div>
        </div>
    </motion.div>
    )
}


export default RandomChar;