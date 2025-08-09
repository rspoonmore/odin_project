import { Link } from "react-router-dom";
import { server } from "../../public_fields";
import '../../styles/partials/PostView.css';

const PostView = ({posts}) => {
    function createView(post) {
        return (
            <div className='post-view' key={post.postid}>
                <div className='post-header'>
                    <span className='post-title'>{post.title}</span>
                    <Link className='btn' to={`/posts/${post.postid}`}>View</Link>
                </div> 
                <span className='post-details'>{post.email}</span>
                <span className='post-details'>{post.createdate}</span>
                <span className='post-details'>{post.likes} like{post.likes === 1 ? '' : 's'}</span>
            </div>
        )
    }

    // Return Function
    if(!posts) {
        return (
            <div>Loading...</div>
        )
    }
    return (
        <div>
            <h3>Posts:</h3>
            {posts.map(post => {
                return createView(post)
            })}
        </div>
    )

}

export default PostView