import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getBooks} from '../actions'
import BookItem from '../widgetsUi/book_item'


 class HomeContainer extends Component {
   constructor(){
     super()


     this.renderItems= this.renderItems.bind(this)
     this.loadmore = this.loadmore.bind(this)
   }

  componentWillMount(){
    this.props.dispatch(getBooks(1,0,'desc'))

  }

  renderItems (books){
    return books.list ? 
    books.list.map( (item,key) =>{
      return <BookItem {...item} key={item._id}/>
  })
  
  : null

  }

  loadmore(){
    let count = this.props.books.list.length
    this.props.dispatch(getBooks(1,count,'desc',this.props.books.list))
    
  }
  render() {
   
    return (
     
      <div>
        {this.renderItems(this.props.books)}
        <div className="loadmore" onClick={this.loadmore}>Load more</div>
      </div>
    )
  }
}

 function mapStateToProps(state){
   return{
     books:state.books
     
  }
 }
 export default connect(mapStateToProps)(HomeContainer)


