import React, { useState } from "react";
import {Link} from "react-router-dom"
import axios from "axios"

function Home(){
    console.log("Rending Books components");
    const[bookData,setBookData]= useState([]);
    const [searchText,setSearchText] = useState('');
    const[filteredBooks,setFilteredBooks]=useState([]);
    const[showSuggestion,setShowSuggestions]=useState(true);

    function handleInputChange(event){
        const userInput = event.target.value;
        setSearchText(userInput);
        setShowSuggestions(userInput !=='');

        const filtered = bookData.filter(
            item => item.title.toLowerCase().inculdes(userInput.toLowerCase())

        );
        setFilteredBooks(filtered);
    }
    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const respone = await axios.get(
                    'https://reactnd-books-api.udacity.com/books',
                    {
                        headers : {Authorization:'whatever-you-want'},
                    }

                );
                setBookData(respone.data.books);
                setFilteredBooks(respone.data.books);
                console.log(respone.data.books);
            } catch(error){
                console.log('Error fetching data:',error);
            }
        };
        fetchData();
    },[]);

    return(
        <div className="main">
        <div className="navbar">
          <h2 className="Name">Kalvium Books</h2>
          <input
            type="text"
            placeholder="Enter the book name"
            list="suggestions"
            onChange={handleInputChange}
            value={searchText} 
            className="BookInp"
          />
          <Link to="/form">
            <button className="Register">Register</button>
          </Link>
        </div>
        <div className="contain">
          {filteredBooks.map(book => (
            <div key={book.id} className="book">
              <h2>{book.title}</h2>
              <img src={book.imageLinks.smallThumbnail} alt="" />
              <p>Page Count: {book.pageCount}</p>
              <p>Rating ⭐: {book.averageRating}</p>
              <p>Free</p>
            </div>
          ))}
        </div>
      </div>
    );
}
export default Home;


