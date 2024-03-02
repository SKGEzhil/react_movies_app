import {createContext} from "react";

const AppContext = createContext({
        movies_list: [{ title: '', year: '', img: '', id: '', backdrop: ''}],
        update_list: (list: [{ title: string; year: string; img: string; id: string; backdrop: string }]) => {console.log(list)},
        tv_list: [{ title: '', year: '', img: '',   id: '', backdrop: '' }],
        update_tv_list: (list: [{ title: string; year: string; img: string; id: string; backdrop: string }]) => {console.log(list)},
        search_result_list: [{ title: '', year: '', img: '', id: '', backdrop: '' }],
        update_search_result_list: (list: [{ title: string; year: string; img: string; id: string; backdrop: string }]) => {console.log(list)},

    }
)

export default AppContext;