
class MarvelRequsest  {
    // https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=210&apikey=1c5c829de93d910b90c4d75325f90eb8
    //https://gateway.marvel.com:443/v1/public/characters/1011005?apikey=1c5c829de93d910b90c4d75325f90eb8

    _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    _apiKey = 'apikey=1c5c829de93d910b90c4d75325f90eb8'


    getData = async(url)=> {
        const res = await fetch(url);
        if(!res.ok){
            throw new Error(`Could not fetch ${url}, status: ${res.status}`,)
        }
        return await res.json()
    }

    getCharData = async (id) =>{
        const res = await this.getData(`${this._apiBase}characters/${id}?${this._apiKey}`)
        return this.parseDat(res.data.results[0])
    }

    getCharsData = async() =>{
        const res = await this.getData(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`)
        return res.data.results.map(item => this.parseDat(item))
    }

    parseDat = (char) =>{
        const {name, description,thumbnail:{extension, path},urls} = char;
        return {
            name,
            description,
            thumbnail:`${path}.${extension}`,
            wiki:urls[1].url,
            homepage:urls[0].url
        }
    }
}

export default MarvelRequsest;