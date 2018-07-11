import React from 'react'
import { Route } from 'react-router-dom'
import MainPage from './HomePage'
import SearchPage from './SearchPage'
// import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {

    showSearchPage: false
  }

  render() {


    return (
      <div className="app">
        //Routing to HomePage
        <Route exact path='/' render={ () => (
          <HomePage> //Component to follow

        )}
        //Routing to SearchPage
        <Route path='/search' render={ () => (
          <SearchPage>
        )}
        </div>


export default BooksApp
