import './styles/App.css'
import Home from "./pages/home.tsx";
import AppContext from "./app_context.tsx";
import {useState} from "react";

function App() {

    //Inits

    if(localStorage.getItem('watchlist') === null){
        localStorage.setItem('watchlist', JSON.stringify([]));
    }

    const [movies_list, update_list]
        = useState<[{ title: string, year: string, img: string }]>([{
            title: '',
            year: '',
            img: ''
        }]);


    return (
        <div>
            <AppContext.Provider value={{movies_list, update_list}}>
                <Home/>
            </AppContext.Provider>
        </div>
    )
}


export default App
