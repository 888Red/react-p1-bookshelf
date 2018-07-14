import React, { Component } from 'react';
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'

class SearchPage extends Component {
  state = {
     searchResults: [],
     searchQuery: ''
   }

   updateSearch = (query) => {
     this.setState({searchQuery: query})
     if (query <= 0) {
       this.setState({searchResults: []});
       return
     }
     if (query.length > 1){
       BooksAPI.search(query.trim(), 18).then(searchResults => {
             if (searchResults.error) {
                 searchResults = [];
                 alert('Sorry! The book you are searching is not included in this library.');
             }
             searchResults = searchResults.map((book) => {
                 const category = this.props.books.find(b => b.id === book.id)
                 if (category) {
                     book.shelf = category.shelf;
                 }
                 else {
                   book.shelf = 'none'
                 }
                 return book
             })
             this.setState({searchResults});
         })
       }
   }

   render() {
     return (
       <div className="search-books">
         <div className="search-books-bar">
           <Link className="close-search" to="/">
              Close
            </Link>
           <div className="search-books-input-wrapper">
             <input
                type="text"
                placeholder="Search by title or author" value={this.state.searchQuery}
                onChange={(event) =>
                  this.updateSearch(event.target.value)}/>
           </div>
         </div>
         <div className="search-books-results">
           <ol className="books-grid">
             {this.state.searchResults.map((book) => (
               <li key={book.id}>
                 <Book
                    book={book}
                    moveShelf={this.props.moveShelf}
                  />
               </li>
              ))}
           </ol>
         </div>
       </div>
     )
   }
 }

export default SearchPage
