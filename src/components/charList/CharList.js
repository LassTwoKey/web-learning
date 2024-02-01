import './charList.scss';

import { Component, createRef } from 'react';
import ErrorMessage from '../error/Error';
import PropTypes from 'prop-types';
import MarvelService from '../../services/MarvelService';
import Spinner from '../Spiner/Spiner';
import { act } from 'react-dom/test-utils';

class CharList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            char: [],
            error: false,
            loading: true,
            newItemLoading: false,
            offset: 210,
            isEndOfScreen: false,
            charEnded: false,
            activeChar:false,
        }
       
    }


    componentDidMount() {
        this.onRequest()
        window.addEventListener('scroll', this.onRequestScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onRequestScroll)
    }

    onCharLoad = (newChar) => {
        let ended= false;
        if(newChar.length < 9){
            ended = true;
        }
        this.setState(({ offset, char }) => ({
            char: [...char, ...newChar],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            isEndOfScreen: false,
            charEnded: ended
        }))
    }

    onError = () => {
        this.setState({ loading: false, error: true })
    }

    marvelService = new MarvelService;
    ongetAllCharacters = () => {
        this.marvelService.getAllCharacters()
            .then(this.onCharLoad)
            .catch(this.onError)
    }



    onCharListLoading = () => {
        this.setState({ newItemLoading: true })
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.setState({ isEndOfScreen: true })
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharLoad)
            .catch(this.onError)

    }

    onRequestScroll = () => {
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;
        const bodyHeight = document.body.offsetHeight;

        if (windowHeight + scrollY >= bodyHeight && !this.state.isEndOfScreen) {
            this.onRequest(this.state.offset)
        }
    }

    itemsRef = [];
    
    setRef = (ref) => [
        this.itemsRef.push(ref)
    ]

   focusOnItem = (id) => {
     this.itemsRef.forEach(item => item.classList.remove('char__item_selected'));
     this.itemsRef[id].classList.add('char__item_selected');
     this.itemsRef[id].focus()
   }
        

    renderItems(arr) {
        console.log(this.itemsRef)
        const { onCharSelected } = this.props;
        const Charitems = arr.map((item,i)=> {
            let imgStyle = { 'objectFit': 'cover' };
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = { 'objectFit': 'unset' };
            }
            return (
                <li 
                ref = {this.setRef}  
                onClick={() => {onCharSelected(item.id);this.focusOnItem(i)}}
                onKeyPress={(e) => {
                    if (e.key === ' ' || e.key === "Enter") {
                        this.props.onCharSelected(item.id);
                        this.focusOnItem(i);
                    }
                }}
                tabIndex={0}
                key={item.id} 
                className='char__item'>

                    <img src={item.thumbnail} alt={item.name} style={imgStyle}></img>
                    <div className='char__name'>{item.name}</div>
                </li>
            )
        })
        return (
            <ul className="char__grid">
                {Charitems}
            </ul>
        )
    }



    render() {
        const { char, loading, error, charEnded } = this.state
        const items = this.renderItems(char)
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button onClick={() => this.onRequest(this.state.offset)}
                    disabled={this.state.newItemLoading}
                    style={{'display:': charEnded ? 'none' : 'block'}}
                    className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;