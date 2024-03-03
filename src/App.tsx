import './styles/home.css'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Home from "./pages/home.tsx";
import AppContext from "./app_context.tsx";
import {useState} from "react";
import WatchList from "./pages/watch_list.tsx";
import Search from "./pages/search.tsx";
import ErrorPage from "./pages/error_page.tsx";
import PageUnderDevelopment from "./pages/page_under_development.tsx";

export const base_route = "/react_movies_app"

function App() {

    //Inits

    if(localStorage.getItem('watchlist') === null){
        localStorage.setItem('watchlist', JSON.stringify([]));
    }

    const [movies_list, update_list]
        = useState<[{ title: string, year: string, img: string, id: string, backdrop: string }]>([{
            title: '',
            year: '',
            img: '',
            id: '',
            backdrop: ''
        }]);

    const [tv_list, update_tv_list]
        = useState<[{ title: string, year: string, img: string, id: string, backdrop: string  }]>([{
        title: '',
        year: '',
        img: '',
        id: '',
        backdrop: ''
    }]);

    const [search_result_list, update_search_result_list]
        = useState<[{ title: string, year: string, img: string, id: string, backdrop: string  }]>([{
        title: '',
        year: '',
        img: '',
        id: '',
        backdrop: ''
    }]);

    const [watchlist, update_watchlist]
        = useState<[{ title: string, year: string, img: string, id: string, backdrop: string  }]>([{
        title: '',
        year: '',
        img: '',
        id: '',
        backdrop: ''
    }]);

    const router = createBrowserRouter([
        {
            path: `*`,
            element: <ErrorPage />,
        },
        {
                path: `${base_route}/`,
                errorElement: <ErrorPage/>,
                element: <Home />,
        },
        {
            path: `${base_route}/movies`,
            element: <PageUnderDevelopment />,
        },

        {
            path: `${base_route}/series`,
            element: <PageUnderDevelopment />,
        },

        {
            path: `${base_route}/watch_list`,
            element: <WatchList />,
        },

        {
            path: `${base_route}/search`,
            element: <Search />,
        },

        ]
    );


    return (
        <div style={{background: "#141414"}}>
            <AppContext.Provider value={{movies_list,
                update_list, tv_list, update_tv_list,
                search_result_list, update_search_result_list,
                watchlist, update_watchlist}}>
                {/*<Home/>*/}
                <RouterProvider router={router} />

            </AppContext.Provider>

        </div>
    )
}


export default App

