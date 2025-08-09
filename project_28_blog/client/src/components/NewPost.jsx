import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../context/AuthContext";
import '../styles/NewPost.css';
import { server } from '../public_fields'
import TopBar from "./partials/TopBar";
import OutcomeBanner from "./partials/OutcomeBanner";
import { setCurrentUserIfCookie } from "../cookies/CookieHandler";

const NewPost = () => {
    const blankEntries = {'title': '', 'text': ''};
    const [formEntries, setFormEntries] = useState(blankEntries);
    const [showForm, setShowForm] = useState(true);
    const [outcome, setOutcome] = useState(null);
    const { currentUser, setCurrentUser } = useContext(AuthContext);

    const loadScreen = () => {
        setCurrentUserIfCookie(setCurrentUser)
    }

    useEffect(loadScreen, []);

    async function createPost(e) {
        e.preventDefault();
        try {
            const formData = new FormData();
            for(const key in formEntries) {
                formData[key] = formEntries[key];
            }
            await fetch(`${server}/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            })
                .then(res => res.json())
                .then(res => {
                    if(res.success) {
                        setFormEntries(blankEntries);
                        setShowForm(false);
                    }
                    if (setOutcome) {setOutcome(res)}
                })
        } catch(error) {
            console.log(error)
        }
    }

    const form = () => {
        if(!showForm) return <></>
        return (
            <>
                <h1>Create a New Post</h1>
                <form className='form-new-post' onSubmit={createPost}>
                    <fieldset>
                        <label htmlFor='title'>Title*</label>
                        <input 
                            id='title' 
                            name='title' 
                            type='title' 
                            value={formEntries['title']}
                            onChange={(e) => {setFormEntries(prev => ({...prev, title: e.target.value}))}}
                        required/>

                        <label htmlFor='text'>Post*</label>
                        <textarea 
                            id='text' 
                            name='text' 
                            type='text' 
                            value={formEntries['text']}
                            cols='35'
                            rows='25'
                            onChange={(e) => {setFormEntries(prev => ({...prev, text: e.target.value}))}}
                        required></textarea>
                        
                    </fieldset>
                    <button type='submit'>Post</button>
                    <div>*Required</div>
                </form>
            </>
        )
    }

    return (
        <>
            <TopBar></TopBar>
            <OutcomeBanner outcome={outcome}></OutcomeBanner>
            {form()}
        </>
    )
}

export default NewPost;