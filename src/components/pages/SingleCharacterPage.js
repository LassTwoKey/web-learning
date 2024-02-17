import {useEffect, useState} from 'react'
import {Link,useParams} from 'react-router-dom'
import AppHeader from '../appHeader/AppHeader'
import AppBanner from '../appBanner/AppBanner'
import ErrorMessage from '../error/Error'
import Spiner from '../Spiner/Spiner'
import useMarvelService from '../../services/MarvelService'
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

 const View = ({character}) => {
    const {name,description,thumbnail} = character
     return (
        <>
        <div className='app'>
        <AppHeader />
         </div>
         <div className='container'>
         <AppBanner/>
        <div className="single-character">
        <img src={thumbnail} alt = {name} className="single-character__img" />
        <div className="single-character__info">
            <h2 className="single-character__name">{name}</h2>
            <p className="single-character__descr">{description}</p>
        </div> 
          <Link to='/' className="single-comic__back">Back to all</Link>
        </div>
        </div>
        </>
     )
 }

 export default SingleCharacterPage