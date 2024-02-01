
class MarvelService {
    _ApiBase = 'https://gateway.marvel.com:443/v1/public/';
    _ApiKey = 'apikey=66b247cdb42bbc0925d48f02356f3889';
    _baseOffset = 210;
    getResource = async (url) => {
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    }
  
    getAllCharacters = async(offset = this._baseOffset) => {
         const res = await this.getResource(`${this._ApiBase}/characters?limit=9&offset=${offset}&${this._ApiKey}`)
         return res.data.results.map(this._transformCharacter)

    }
 
    getCharacters = async(id) => {
         const res = await  this.getResource(`${this._ApiBase}/characters/${id}?$&${this._ApiKey}`)
         return this._transformCharacter(res.data.results[0])
    }

    _transformCharacter = (char) => {
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
}

export default MarvelService 
