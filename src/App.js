import React, { Component } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom'
import SearchPage from './SearchPage'
import Category from './Category'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
    books: []
  }

 componentDidMount() {
   BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
 }

  moveShelf = (book, shelf) => {
    BooksAPI.update(book, shelf);
    BooksAPI.getAll().then((books) => {
      book.shelf = shelf;
      this.setState((state) => ({
        books: state.books.filter(b => b.id !== book.id).concat([book])
      }))
    })
  }

  render() {
      return (
        <BrowserRouter>
          <div className="app">
            <Route exact path="/search" render={() => (
              <SearchPage
                books={this.state.books}
                moveShelf={this.moveShelf}/>)}/>
            <Route exact path="/" render={() => (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>myBookShelf</h1>
                </div>
                <div className="list-books-content">
                  <Category
                    title='Reading Now' books={this.state.books.filter((book) =>
                    book.shelf === 'currentlyReading')} moveShelf={this.moveShelf}/>
                  <Category
                    title='Next in Line' books={this.state.books.filter((book) =>
                    book.shelf === 'wantToRead')} moveShelf={this.moveShelf}/>
                  <Category
                    title='Happy & Done'
                    books={this.state.books.filter((book) => book.shelf === 'read')}
                    moveShelf={this.moveShelf}/>
                </div>
                <div className="open-search">
                  <Link to="/search">Add a book</Link>
                </div>
              </div>
            )}/>
          </div>
        </BrowserRouter>
      )
    }
  }

export default BooksApp
