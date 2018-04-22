import React from 'react';
import {graphql,compose} from 'react-apollo'

import {getBooksQuery} from '../queries/queries';

//Components
import BookDetails from './BookDetails'

class BookList extends React.Component {

    constructor(props){
        super(props)
        this.displayBooks = this.displayBooks.bind(this)
        this.state = {
            selectedBookId:null,
            bookName:null
        }
    }

    //Output to display books from props object
    displayBooks = ()=>{
        let data = this.props.getBooksQuery

        if(data.loading){
            return (<div>Loading Books...</div>)
        }
        else{
            return (data.books.map((book,index)=>{
                return (
                    <li key={book.id}  onClick={(e)=>this.setState({selectedBookId:book.id,bookName:book.name})}>{book.name}</li>
                )
            }))
        }
    }
    render() {
        return (
            <div>
                <ul id="book-list">
                    {this.displayBooks()}
                </ul>
                <BookDetails bookId={this.state.selectedBookId} bookName={this.state.bookName}/>
            </div>
        )
    }
}

export default compose(graphql(getBooksQuery,{name:"getBooksQuery"}))(BookList);
