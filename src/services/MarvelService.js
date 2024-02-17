import { useHttp } from "../hooks/http.Hook";


const  useMarvelService = () =>{
    const {loading,request,error,clearError} = useHttp();    

    const _ApiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _ApiKey = 'apikey=66b247cdb42bbc0925d48f02356f3889';
    const  _baseOffset = 210;
    const _baseOffsetForComics = 10;
 
  
    const getAllCharacters = async(offset = _baseOffset) => {
         const res = await request(`${_ApiBase}/characters?limit=9&offset=${offset}&${_ApiKey}`)
         return res.data.results.map(_transformCharacter)

    }
 
   const getCharacters = async(id) => {
         const res = await  request(`${_ApiBase}/characters/${id}?${_ApiKey}`)
         return _transformCharacter(res.data.results[0])
    }

    const getCharacterByName  = async(name) => {
      const res = await request(`${_ApiBase}characters?name=${name}&${_ApiKey}`)
      return res.data.results.map(_transformCharacter)
    }

   const  _transformCharacter = (char) => {
        return {
                name:char.name,
                description:char.description ===  '' ? 'About this person, no information...' : char.description.slice(0,210) + '...',
                thumbnail:char.thumbnail.path  + '.' + char.thumbnail.extension,
                homepage:char.urls[0].url,
                wiki:char.urls[1].url,
                id:char.id,
                comics: char.comics.items.length > 10 ? char.comics.items.slice(0,10) : char.comics.items,
                activeChar: false,
        }
    }



    const getAllComics = async(offset = _baseOffsetForComics) => {
     const res = await request(`${_ApiBase}/comics?limit=8&offset=${offset}?&${_ApiKey}`);
     return res.data.results.map(_transformComics)
    }

    const getComicById = async(id) => {
     const res = await request(`${_ApiBase}/comics/${id}?${_ApiKey}`);
     return  _transformComics(res.data.results[0])
    }

    const _transformComics = (comics) => {
         return {
             id:comics.id,
             title:comics.title,
             description:comics.description,
             price:comics.prices[0].price === 0 ? 'NOT AVAILABLE' : comics.prices[0].price + '$',
             thumbnail:comics.thumbnail.path + '.' + comics.thumbnail.extension,
             language: comics.textObjects[0]?.language || "en-us",
             page:comics.pageCount ? comics.pageCount + 'p.' : 'No information about the number of pages'
         }
    }

    
    return {loading,error,getAllCharacters,getCharacters,clearError,getAllComics,getComicById,getCharacterByName}
}

export default useMarvelService 
