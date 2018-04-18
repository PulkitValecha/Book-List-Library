import React from 'react';
import {graphql,compose} from 'react-apollo'

import {getBooksQuery} from '../queries/queries';


class BookList extends React.Component {

    constructor(props){
        super(props)
        this.displayBooks = this.displayBooks.bind(this)
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
                    <li key={book.id}>{book.name}</li>
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
            </div>
        )
    }
}

export default compose(graphql(getBooksQuery,{name:"getBooksQuery"}))(BookList);
