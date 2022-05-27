
import { useHttp } from "../hooks/http.hook";

const  useMarvelRequsest = () =>{

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    const _apiKey = 'apikey=1c5c829de93d910b90c4d75325f90eb8'

    const {request, error, loading, resetError} = useHttp()

 
    const getComicsList = async(offset) => {
        const res = await request (`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`)
        if(res){
            return res.data.results.map(item => parseComicsData(item, true))
        }
    }

    const getSingleComic = async(id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        if(res){
            return parseComicsData(res.data.results[0])
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
        const {id, title, prices, thumbnail:{path, extension}, description, pageCount, textObjects:{language}} = comics;
        return{
            id,
            title,
            price: prices[0].price == 0? 'Free': `${prices[0].price}$`,
            image: `${path}.${extension}`,
            description: description || 'There is no description',
            pageCount: pageCount? `${pageCount} p.`: 'No information about the number of pages',
            language:language || 'en-us'
        }
    }
    return {getCharData, getCharsData, getComicsList, getSingleComic, error, loading, resetError}
}

export default useMarvelRequsest;

