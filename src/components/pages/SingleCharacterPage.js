import {useEffect, useState} from 'react'
import {Link,useParams} from 'react-router-dom'
import { Helmet } from 'react-helmet';
import AppHeader from '../appHeader/AppHeader'
import AppBanner from '../appBanner/AppBanner'
import ErrorMessage from '../error/Error'
import Spiner from '../Spiner/Spiner'
import useMarvelService from '../../services/MarvelService'
import {AnimatePresence, motion} from 'framer-motion/dist/framer-motion'
import './SingleCharacterPage.scss'


const SingleCharacterPage = () => {
    const characterId = useParams();
    const [character,setCharacter] = useState(null)
    const {charId} = characterId
    const {loading,error,getCharacters,clearError} = useMarvelService()

   useEffect(() => {
     updateCharacter()
   },[charId])

    const updateCharacter = () => {
         clearError()
         getCharacters(charId)
         .then(res => setCharacter(res))
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinerElement = loading ? <Spiner/> : null;
    const content = !(loading || error || !character)  ? <View character = {character}/> : null;


    return (
        <>
            {errorMessage}
            {spinerElement}
            {content}
        </>
    )
 }
 
const AppBamerVariantsAnimation = {
     initial:{opacity:0,transform:'scale(0.4) translateY(-50%)'},
     animation:{
      opacity:1,
      transform:'scale(1) translateY(0%)',
      transition:{
         duration:0.5
      }
    }
}

const NameAndDescrVariantsAnimation = {
  initial:{opacity:0,transform:'scale(0.4) translateX(-50%)'},
  animation:{opacity:1,transform:'scale(1) translateX(0%)',
   transition:{
     duration:0.5
   }
}
}


 const View = ({character}) => {
    const {name,description,thumbnail} = character
     return (
        <>
           <Helmet>
                <meta
                    name="description"
                    content={`${name} character`}
                />
                <title>{name}</title>
            </Helmet>
        <div className='app'>
        <AppHeader />
         </div>
         <div className='container'>
          <motion.div 
          initial = 'initial'
          animate = 'animation'
          variants = {AppBamerVariantsAnimation}
          className='app-banner'>
          <AppBanner/>
          </motion.div>
        <div className="single-character">
        <motion.img
         initial = 'initial'
         animate = 'animation'
         variants = {NameAndDescrVariantsAnimation}
         src={thumbnail} 
         alt = {name} 
         className="single-character__img" />
        <motion.div 
         initial = 'initial'
         animate = 'animation'
         variants = {NameAndDescrVariantsAnimation}
        className="single-character__info">
            <h2 className="single-character__name">{name}</h2>
            <p className="single-character__descr">{description}</p>
        </motion.div> 
          <Link to='/' className="single-comic__back">Back to all</Link>
        </div>
        </div>
        </>
     )
 }

 export default SingleCharacterPage