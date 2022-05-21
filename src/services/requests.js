
class MarvelRequsest  {

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
        const {name, description,thumbnail:{extension, path},urls, id} = char;
        return {
            name,
            description:description.length === 0? 'There is no data in our server about this character':`${description.slice(0,213)}...`,
            thumbnail:`${path}.${extension}`,
            wiki:urls[1].url,
            homepage:urls[0].url,
            id
        }
    }
}

export default MarvelRequsest;

