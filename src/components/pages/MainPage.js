import { useState } from "react";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import AppHeader from '../appHeader/AppHeader'
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import decoration from '../../resources/img/vision.png';


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
                    <ErrorBoundary>
                        <CharInfo charId = {selectedChar}/>
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
                </div>
        </>
    )
}

export default MainPage