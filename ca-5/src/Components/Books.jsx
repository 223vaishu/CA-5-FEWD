import React, { useEffect, useState } from 'react';
import './Books.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Books() {
  //State Variable
  const [bookData, setBookData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
//Fectching the data 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://reactnd-books-api.udacity.com/books', {
          headers: { Authorization: 'whatever-you-want' }
        });
        setBookData(response.data.books);
        setFilteredBooks(response.data.books);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleInput = (event) => {
    const userInput = event.target.value;
    setSearchText(userInput);

    const filtered = bookData.filter(
      item => item.title.toLowerCase().includes(userInput.toLowerCase())
    );
    setFilteredBooks(filtered);
  };
  //Rendering the JSX
  return (
    <div className="main">
      <div className="navbar">
        <h1 className="Name">Kalvium Books</h1>
        <input className="input"
          type="text"
          placeholder="Enter the book name"
          list="suggestions"
          onChange={handleInput}
          value={searchText}
          
        />
        <Link to="/form">
          <button className="Register">Register</button>
        </Link>
      </div>
      <div className="contain">
        {/* Mapping used */}
        {filteredBooks.map(book => (
          <div key={book.id} className="book">
            <h2>{book.title}</h2>
            <img src={book.imageLinks.smallThumbnail} alt="" />
            <p>Page Count: {book.pageCount}</p>
            <p>Rating : {book.averageRating}</p>
            <p>Free</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Books;
