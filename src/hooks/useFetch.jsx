import { useEffect, useState } from "react";


const API_KEY = import.meta.env.VITE_GIPHY_API;

const useFetch = ({keyword}) => {
    // const [gifUrl, setGifURl] = useState('');

    const fetchGifs = async () => {
        try {
            const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword.split("").join("")}&limit=1`)
            const { data }  = await response.json();
            console.log(data[0]?.images?.downsized_medium?.url);
            setGifURl(data[0]?.images?.downsized_medium?.url)
        } catch (error) {
            setGifURl("https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284")
            console.log(error);
        }
    }

    useEffect(() => {
        if (keyword) fetchGifs();
    }, [keyword])


    return gifUrl;
}



const searchBooks = async (bookname) => {
        // const [books, setBooks] = useState('');

        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookname}`)
            const  data   = await response.json();
            const {items} = data;
            // console.log(items);
            

            return items

            // setBooks(items)
        } catch (error) {
            // setBooks([])
            // console.log(error);
        }

        
        return books;
    
}



export default searchBooks;