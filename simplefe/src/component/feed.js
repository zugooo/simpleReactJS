import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getFeed} from '../store/action'

 class Feed extends Component {
    componentDidMount(){
        this.props.getFeed()
        
    }
    render() {
        const {feed} = this.props.feed
        console.log(feed)

        
        return (
            <div>
                {feed.map(u => 
                     <React.Fragment key={u.id}>
                         <h6 >{u.title}</h6> 
                     </React.Fragment>
                )}
            </div>
        )
    }
}

const mapStateToProps  = (state) => ({feed:state.feed})

export default connect(mapStateToProps, {getFeed})(Feed)