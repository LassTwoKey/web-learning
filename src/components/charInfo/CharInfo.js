import './charInfo.scss';
import { Component } from 'react';
import PropTypes from 'prop-types';
import MarvelService from '../../services/MarvelService';
import Spiner from '../Spiner/Spiner';
import ErrorMessage from '../error/Error';
import Skeleton from '../skeleton/Skeleton'

class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false,
    }
    marvelService = new MarvelService;

    onCharLoaded = (char) => {
        this.setState({ char, loading: false, })
    }

    onCharLoading = () => {
        this.setState({ loading: true, error: false })
    }

    onError = () => {
        this.setState({ loading: false, error: true })
    }

    componentDidMount() {
        this.updateChar()
    }

    componentDidUpdate(prevProps){
        const { charId } = this.props;
       if(charId !== prevProps.charId){
        this.updateChar()
       }
    }

    updateChar = () => {
        const { charId } = this.props;
        if (!charId) {
            return;
        }

        this.onCharLoading();
        this.marvelService
            .getCharacters(charId)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }
    
    


    render() {
        let {char,loading,error} = this.state;
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
}

const View = ({ char }) => {
    let imgStyle = {'objectFit' : 'cover'};
    const { name,description,thumbnail,wiki,homepage,comics} = char
    const comicsItems = comics.map((item,i) => {
        return (
            <li key = {i} className="char__comics-item">
                    {item.name}
                 </li>
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