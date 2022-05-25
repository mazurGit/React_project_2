
import { useHttp } from "../hooks/http.hook";

const  useMarvelRequsest = () =>{

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    const _apiKey = 'apikey=1c5c829de93d910b90c4d75325f90eb8'

    const {request, error, loading, setError, setLoading} = useHttp()

 
    const getComicsList = async(offset) => {
        // comics?format=magazine&limit=8&apikey=1c5c829de93d910b90c4d75325f90eb8
        const res = await request (`${_apiBase}comics?format=magazine&limit=8&offset=${offset}&${_apiKey}`)
        if(res){
            return res.data.results.map(item => parseComicsData(item))
        }
    }

    const getCharData = async (id) =>{
            const res = await request(`${_apiBase}characters/${id}?${_apiKey}`)
            if (res){
                return parseCharDat(res.data.results[0]) 
            }
                
                 
    }

    const getCharsData = async(offset = 0) =>{
            const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`)
            if (res){
                return res.data.results.map(item => parseCharDat(item)) 
            }
                 
    }

    const parseCharDat = (char) =>{
        const {name, description,thumbnail:{extension, path},urls, id, comics} = char;
        return {
            name,
            description:description.length === 0? 'There is no data in our server about this character':`${description.slice(0,213)}...`,
            thumbnail:`${path}.${extension}`,
            wiki:urls[1].url,
            homepage:urls[0].url,
            id,
            comics: comics.items
        }
    }

    const parseComicsData = (comics) => {
        const {id, title, prices, thumbnail:{path, extension}} = comics;
        return{
            id,
            title,
            price:prices[0].price,
            image: `${path}.${extension}`
        }
    }
    return {getCharData, getCharsData, getComicsList, error, loading, setError, setLoading}
}

export default useMarvelRequsest;

