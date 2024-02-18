import { useState } from "react";
import { AnimatePresence, motion } from 'framer-motion/dist/framer-motion'
import { Helmet } from "react-helmet";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import AppHeader from '../appHeader/AppHeader'
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import SearchPanel from "../searchPanel/SearchPanel";
import decoration from '../../resources/img/vision.png';
import './MainPage.scss'



const MainPage = () => {
    const [selectedChar, setChar] = useState(null)

    const onCharSelected = (id) => {
        setChar(id)
    }

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel information portal"
                />
                <title>Marvel information portal</title>
            </Helmet>
            <div className="app">
                <AppHeader />
                <main>
                    <motion.div
                        initial={{
                            transform: 'scale(0.5) translateX(100%)'
                        }}
                        animate={{
                            transform: 'scale(1) translateX(0%)'
                        }}
                        transition={{
                            duration: 0.7
                        }}
                        className="random__char">
                        <RandomChar />
                    </motion.div>
                    <div className="char__content">
                        <ErrorBoundary>
                            <CharList onCharSelected={onCharSelected} />
                        </ErrorBoundary>
                        <div className="char__content_search">
                            <ErrorBoundary>
                                <CharInfo charId={selectedChar} />
                            </ErrorBoundary>
                            <div className="search">
                                <SearchPanel />
                            </div>
                        </div>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision" />
                </main>
            </div>
        </>
    )
}

export default MainPage