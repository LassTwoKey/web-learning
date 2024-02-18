import AppHeader from '../appHeader/AppHeader'
import { Helmet } from 'react-helmet'
import AppBaner from '../appBanner/AppBanner'

import ComicsList from '../comicsList/ComicsList'
import {AnimatePresence, motion} from 'framer-motion/dist/framer-motion'

const ComicsPage = () => {
    return (
        <>
        <Helmet>
        <meta
      name="description"
      content="Page with list of our comics"
    />
    <title>Comics Page</title>
        </Helmet>
         <div className="app">
          <AppHeader/>
          <main>
          <motion.div
                initial = {{
                    opacity:0,
                    transform:'scale(0.4) translateY(-70%)'
                  }}
                  animate = {{
                    opacity:1,
                    transform:'scale(1) translateY(0%)'
                  }}
                  transition = {{
                     duration:0.6
                  }} 
          className="app-banner">
                 <AppBaner/>
            </motion.div>
            <div
            className="comics__content">
                 <ComicsList/>
            </div>
            </main>
         </div>

        </>
    )
}

export default ComicsPage;