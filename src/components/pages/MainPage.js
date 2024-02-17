import { useState } from "react";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import AppHeader from '../appHeader/AppHeader'
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import SearchPanel from "../searchPanel/SearchPanel";
import decoration from '../../resources/img/vision.png';
import './MainPage.scss'



const MainPage = () => {
    const [selectedChar,setChar] = useState(null)
    
    const onCharSelected = (id) => {
         setChar(id)
     }

    return (
        <>
         <div className="app">
          <AppHeader/>
          <main>
           <RandomChar/>
                <div className="char__content">
                <ErrorBoundary>
                    <CharList  onCharSelected = {onCharSelected}/>
                    </ErrorBoundary>
                    <div className="char__content_search">
                    <ErrorBoundary>
                        <CharInfo charId = {selectedChar}/>
                    </ErrorBoundary>
                    <div className="search">
                         <SearchPanel/>
                    </div>
                    </div>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
                </div>
        </>
    )
}

export default MainPage