  
import {useState,useEffect} from 'react';

const useLocalStorage = (key,firstValue = null) => {
    const initialValues = localStorage.getItem(key) || firstValue;
    const [item,setItem] = useState(initialValues);

    useEffect(function putKeyInLocalStorage() {
        if(item ===null){
            localStorage.removeItem(key);
        }else{
            localStorage.setItem(key,item);
        }
    },[key,item])

    return [item,setItem];
    
};

export default useLocalStorage;