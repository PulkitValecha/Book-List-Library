import React from 'react'
import {graphql} from 'react-apollo'
import {getBookQuery} from "../queries/queries";

class BookDetails extends React.Component{

    constructor(props){
        super(props)
        this.displayBookDetails  = this.displayBookDetails.bind(this)
    }

    displayBookDetails = () =>{
        console.log(this.props)

        let book = this.props.data.book

        if(this.props.data.loading){
            return(
                <h2>Loading Details...{this.props.bookName}</h2>
            )
        }

        if(book){
            return(
                <div>
                    <h2>{book.name}</h2>
                    <p>{book.genre}</p>
                    <p>{book.author.name}</p>
                    <p>All Books By This Author : {book.author.books.length}</p>
                    <ul className={"other-books"}>
                        {
                            book.author.books.map((book,index)=>{
                                return (
                                    <li key={book.id}>{book.name}</li>
                                )
                            })
                        }
                    </ul>
                </div>
            )
        }

        else{
            return(
                <div>
                    <h1><center>HEY BOII!!</center></h1>
                    <h1><center> NO BOOK SELECTED</center></h1>
                </div>
            )
        }



    }

    render(){
        return(
            <div id={"book-details"}>
                {this.displayBookDetails()}
            </div>

        )
    }

}


export default graphql(getBookQuery,{
    options: (props)=>({
        variables:{
            id: props.bookId
        }
    })
})(BookDetails)