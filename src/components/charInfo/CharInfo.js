import './charInfo.scss';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useMarvelService from '../../services/MarvelService';
import Spiner from '../Spiner/Spiner';
import ErrorMessage from '../error/Error';
import Skeleton from '../skeleton/Skeleton'
import { Link } from 'react-router-dom'

const CharInfo = (props) =>  {
    const [char,setChar] = useState(null);
    

   const  onCharLoaded = (char) => {
        setChar(char)
    }

    const {loading,clearError,getCharacters,error} = useMarvelService();


    useEffect(() => {
       updateChar()
    },[props.charId])


   const updateChar = () => {
        const { charId } = props;
        if (!charId) {
            return;
        }
         clearError()
            getCharacters(charId)
            .then(onCharLoaded)
    }
        const skeleton = char || loading || error ? null : <Skeleton/>
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinerElement = loading ? <Spiner/> : null;
        const content = !(loading || error || !char)  ? <View char = {char}/> : null;
        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinerElement}
                {content}
            </div>
        )
}

const View = ({ char }) => {
    let imgStyle = {'objectFit' : 'cover'};
    const { name,description,thumbnail,wiki,homepage,comics} = char
    const comicsItems = comics.map((item,i) => {
        return (
            <Link to = {`/comics/${item.resourceURI.substring(43)}`}><li key = {i} className="char__comics-item">
                    {item.name}
                 </li></Link>
        )
    })  
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'unset'};
    }
    return (
        <>
            <div className="char__basics">
                <img style = {imgStyle} src={thumbnail} alt={name} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">Homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
               {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                 {comicsItems.length === 0 ? 'There is no comics with this character' : comicsItems}
            </ul>
        </>
    )
}

CharInfo.propTypes = {
     CharId: PropTypes.number
}

export default CharInfo;