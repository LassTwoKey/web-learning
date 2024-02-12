import AppHeader from '../appHeader/AppHeader'
import AppBaner from '../appBanner/AppBanner'
import ComicsList from '../comicsList/ComicsList'

const ComicsPage = () => {
    return (
        <>
         <div className="app">
          <AppHeader/>
          <main>
          <div className="app-banner">
                 <AppBaner/>
            </div>
            <div className="comics__content">
                 <ComicsList/>
            </div>
            </main>
         </div>

        </>
    )
}

export default ComicsPage;