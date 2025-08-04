import HomePage from './components/HomePage';
import RegisterOrUpdate from './components/RegisterOrUpdate';

const routes = [
    {
        path: "/",
        element: <HomePage />,
        // errorElement: <ErrorPage />,
        // loader: 
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
    }
    
];

export default routes;