import React from 'react'
import '../css/App.css'
import NameComponent from './Name'
import HandleElement from './Handle'
import FriendListManager from './FriendListManager'
import Avatar from './Avatar'

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

function App(props) {
  return (
    <div id='container'>
      <Avatar/>
      <NameComponent name={props.name}/>
      <HandleElement handle={props.handle}/>
      <FriendListManager/>
    </div>
    )
}   

export default App;
