import { lazy,Suspense } from "react";
import {Route,Routes} from "react-router-dom";
import MainPage from "../pages/MainPage";
import ComicsPage from "../pages/ComicsPage";
import SingleComicPage from "../pages/SingleComicPage";
import SingleCharacterPage from "../pages/SingleCharacterPage";
import Spiner from "../Spiner/Spiner";

const PageNotFound = lazy(() => import('../pages/404'))

const App = () =>  {
    return (
      <Suspense fallback = {<Spiner/>}>
       <Routes>
         <Route path="/" element = {<MainPage/>}></Route>
         <Route path="/comics" element = {<ComicsPage/>}></Route>
         <Route path = '*' element = {<PageNotFound/>}></Route>
         <Route path = '/comics/:comicId' element = {<SingleComicPage/>}></Route>
         <Route path = '/characters/:charId' element = {<SingleCharacterPage/>}></Route>
       </Routes>
       </Suspense>
    )
}

export default App;