import { Link } from "react-router-dom";
import { server } from "../../public_fields";
import '../../styles/partials/UserView.css';

const UserView = ({currentUser, users, onDelete}) => {
    function editButton(userid) {
        if(!currentUser) {return null}
        if(!currentUser.admin && currentUser.userid !== userid) {return null}
        return <Link to={`/users/${userid}/update`} className='btn'>Update</Link>
    } 

    function deleteButton(user) {
        if(!currentUser) {return null}
        if(!currentUser.admin && currentUser.userid !== user.userid) {return null}
        
        async function deletePressed() {
            if (window.confirm(`Are you sure you want to delete the user ${user.email}?`)) {
                try {
                    fetch(`${server}/users/${user.userid}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        credentials: 'include'
                    })
                    .then(res => res.json())
                    .then(res => {
                        if(!res.message) {return}
                        window.alert(res.message)
                        onDelete()
                    })
                } catch(error) {
                    console.log(error)
                }
            }
        }

        return <button className='btn' onClick={deletePressed}>Delete</button>
    }


    // Return Function
    if(!users) {
        return (
            <div>Loading...</div>
        )
    }
    return (
        <div>
            <h3>Users:</h3>
            {users.map(user => {
                return (
                    <div className='user-view' key={user.userid}>
                        {user.email}
                        <div className='user-view-buttons'>
                            {editButton(user.userid)}
                            {deleteButton(user)}
                        </div>
                    </div>
                )
            })}
        </div>
    )

}

export default UserView