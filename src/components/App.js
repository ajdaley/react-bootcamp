import React from 'react'
import '../css/App.css'
import NameComponent from './Name'
import HandleElement from './Handle'
import FriendListManager from './FriendListManager'
import Avatar from './Avatar'
import {
    BrowserRouter,
    Route,
    Link
} from 'react-router-dom'

window.API = {
  fetchFriends() {
      return new Promise((res, rej) => {
          const friendsConst = [
              {
                  name:'Alex',
                  active:true
              },
              {
                  name:'John',
                  active:true
              },
              {
                  name:'Claire',
                  active:false
              }
          ]

          setTimeout(() => res(friendsConst), 2000)
      })
  }
}

function All(props) {
    return (
        <div>
            <Avatar/>
            <NameComponent name={props.name}/>
            <HandleElement handle={props.handle}/>
            <FriendListManager/>
        </div>
    )
}

function Topic() {
    return (<div>Topic</div>)
}

function App(props) {
  return (
        <BrowserRouter>
            <div>
                <ul>
                    <li><Link to='/'>All</Link></li>
                    <li><Link to='/avatar'>Avatar</Link></li>
                    <li><Link to='/topics'>Topics</Link></li>
                </ul>

                <hr/>

                <Route exact path='/' component={All}/>
                <Route path='/avatar' component={Avatar}/>
                <Route path='/topics' component={Topic}/>
            </div>
        </BrowserRouter>
    )
}   

export default App;
