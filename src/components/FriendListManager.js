import React from 'react'
import Loading from './Loading'

function ActiveFriendsList (props) {
    return (
        <ul>
            {props.list.map((friend) => (
                <li key={friend.name}>
                    <span>{friend.name}</span>
                    <button onClick={() => props.onDeactivateFriend(friend.name)}>Deactivate</button>
                </li>
            ))}
        </ul>
    )
}

function InactiveFriendsList (props) {
    return (
        <ul>
            {props.list.map((friend) => (
                <li key={friend.name}>
                    <span>{friend.name}</span>
                    <button onClick={() => props.onActivateFriend(friend.name)}>Activate</button>
                    <button onClick={() => props.onRemoveFriend(friend.name)}>Remove</button>
                </li>
            ))}
        </ul>
    )
}

class FriendListManager extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            friends: [],
            input: '',
            loading:true
        }

        // Because we can apparently export the method statically
        //  we want to bind to this class
        this.handleRemoveFriend = this.handleRemoveFriend.bind(this)
        this.handleInputUpdate = this.handleInputUpdate.bind(this)
        this.handleAddFriend = this.handleAddFriend.bind(this)
        this.handleClearAll = this.handleClearAll.bind(this)
        this.handleToggleFriend = this.handleToggleFriend.bind(this)

        console.log("--constructor--")
    }

    componentDidMount() {
        window.API.fetchFriends().then((someObj) => {
            this.setState({
                friends: someObj,
                loading: false})
        })
        console.log("--did mount--")
    }

    componentWillUnmount() {
        console.log("--will unmount--")
    }

    componentDidUpdate() {
        console.log("--did update--")
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("--did update with args--")
        console.log("prevProps", prevProps)
        console.log("prevState", prevState)
    }

    handleInputUpdate(e) {
        this.setState({
            input: e.target.value
        })
    }

    handleRemoveFriend(name) { 
        this.setState((currentState) => {
            return {
                friends: currentState.friends.filter((friend) => friend.name !== name)
            }
        })
    }

    handleAddFriend() { 
        this.setState((currentState) => {
            return {
                friends: currentState.friends.concat(
                    {
                        name:this.state.input,
                        active:true
                    }),
                input:''
            }
        })
    }

    handleClearAll() { 
        this.setState((currentState) => {
            return {
                friends: currentState.friends.splice(0,0),
            }
        })
    }

    handleToggleFriend(name) {
        this.setState((currentState) => {
            const friend = currentState.friends.find((friend) => friend.name === name)
            return {
                friends: currentState.friends.filter((friend) => friend.name !== name)
                .concat([{
                    name,
                    active: !friend.active
                }])
            }
        })
    }

    render() {
        console.log("--render--")

        if (this.state.loading === true) {
            return <Loading/>
        }

         return (
            <div style={{display: 'inline-block', float:'left'}}>
                <input 
                    type='text'
                    placeholder='new friend'
                    value={this.state.input}
                    onChange={this.handleInputUpdate}
                />
                <button onClick={this.handleAddFriend}>Submit</button>
                <div>
                    <button onClick={this.handleClearAll}>Clear All</button>
                </div>
                <div>Active Friends </div>
                <ActiveFriendsList 
                    list={this.state.friends.filter((friend) => friend.active===true)}
                    onDeactivateFriend={this.handleToggleFriend}
                />
                <div>Inactive Friends </div>
                <InactiveFriendsList 
                    list={this.state.friends.filter((friend) => friend.active===false)}
                    onRemoveFriend={this.handleRemoveFriend}
                    onActivateFriend={this.handleToggleFriend}
                />
            </div>
        )
    }
}

export default FriendListManager