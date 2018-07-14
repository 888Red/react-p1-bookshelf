import React, {Component} from 'react';

class Book extends Component {
  moveBook = (event) => {
   this.props.moveShelf(this.props.book, event.target.value)
 }
 render() {
   const {book} = this.props
   return (
     <div className="book">
       <div className="book-top">
         <div className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: book.imageLinks ? 'url('+book.imageLinks.smallThumbnail+')': '' }}>
          </div>
         <div className="book-shelf-changer">
           <select
              defaultValue={book.shelf}
              onChange={this.moveBook}>
             <option value="" disabled>Move to...</option>
             <option value="currentlyReading">Reading Now</option>
             <option value="wantToRead">Next in Line</option>
             <option value="read">Happy & Done</option>
             <option value="none">None</option>
           </select>
         </div>
       </div>
       <div className="book-title">{this.props.book.title}</div>
       <div className="book-authors">
        {this.props.book.authors
          ? this.props.book.authors.join(", ")
          : ""}
        </div>
     </div>
   )
 }
}

export default Book
