import React from 'react'
import {graphql,compose} from 'react-apollo'

import {getAuthorsQuery,addBookMutation,getBooksQuery} from '../queries/queries'

class AddBook extends React.Component{

    constructor(props){
        super(props)
        this.displayAuthors = this.displayAuthors.bind(this)
        this.state = {
            name:"",
            genre:"",
            authorId:""
        }

    }

    displayAuthors = () =>{

        let data = this.props.getAuthorsQuery


        if(data.loading){

            return (
                <option>Loading Authors...</option>
            )
        }


        else{

            return data.authors.map((author)=>{
                return(
                    <option key={author.id} value={author.id}>{author.name}</option>
                )
            })

        }

    }


    submitForm = (e) =>{
        e.preventDefault()
        this.props.addBookMutation({
            variables:{
                name:this.state.name,
                genre:this.state.genre,
                authorId:this.state.authorId
            },
            refetchQueries:[{query:getBooksQuery}]
        })
    }

    render(){
        return(
            <form id={"add-book"} onSubmit={this.submitForm.bind(this)}>

                <div className="field">
                    <label>Book name: </label>
                    <input required onChange={(e)=>this.setState({name:e.target.value})} type="text"/>
                </div>

                <div className="field">
                    <label>Genre: </label>
                    <input required onChange={(e)=>this.setState({genre:e.target.value})} type="text"/>
                </div>

                <div className="field">
                    <label>Author: </label>
                    <select onChange={(e)=>this.setState({authorId:e.target.value})}>
                        {this.displayAuthors()}
                    </select>
                </div>

                <button>+</button>

            </form>

        )
    }
}

export default compose(graphql(getAuthorsQuery,{name:"getAuthorsQuery"}),graphql(addBookMutation,{name:"addBookMutation"}))(AddBook)