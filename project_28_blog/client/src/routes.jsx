import HomePage from './components/HomePage';
import RegisterOrUpdate from './components/RegisterOrUpdate';
import PostPage from './components/PostPage';
import NewPost from './components/NewPost';

const routes = [
    {
        path: "/",
        element: <HomePage />,
        // errorElement: <ErrorPage />,
        children: [
            
        ]
    },
    {
        path: '/register',
        element: <RegisterOrUpdate type='register'></RegisterOrUpdate>
    },
    {
        path: '/users/:userid/update',
        element: <RegisterOrUpdate type='update'></RegisterOrUpdate>
    },
    {
        path: '/posts/:postid',
        element: <PostPage></PostPage>
    },
    {
        path: '/posts/new',
        element: <NewPost></NewPost>
    }
    
];

export default routes;