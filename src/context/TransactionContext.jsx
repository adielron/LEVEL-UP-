import React, { useEffect, useState } from 'react';



export const TransactionContext = React.createContext();


export const TransactionProvider = ( { children } ) => {

    const [bookFormData, setBookFormData] = useState({ name:''});

 





    const handleChange2 = (e, name) => {
        setBookFormData((prevState) => ({...prevState, [name]:e.target.value}))
    }


  

    const searchBook = async () => {
        try {
            const { name } = bookFormData
        } catch (error) {
            console.log(error);
            throw new Error("no book object")
        }
    }   





   
    return (
        <TransactionContext.Provider value={{
      
                bookFormData,
                setBookFormData,
                handleChange2

            }}>
            {children}
        </TransactionContext.Provider>
    )
}