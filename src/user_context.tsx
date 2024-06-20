import {createContext} from "react";

const UserContext = createContext({
    username: '',
    setUsername: (value: string) => {console.log(value)}
});

export default UserContext;