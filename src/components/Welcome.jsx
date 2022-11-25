import React, { useContext, useState } from 'react';

import { BsInfoCircle } from 'react-icons/bs';

import { TransactionContext } from '../context/TransactionContext';
import { Loader } from './';


const commonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

import searchBooks from "../hooks/useFetch";


import Collection from './Collection'

const Input = ( {placeholder, name, type, value, handleChange} ) => (
    <input 
    placeholder={placeholder}
    type={type}
    name={name}
    value={value}
    step='0.0001'
    onChange={(e)=> handleChange(e, name)}
    className='my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism'/>

);







const Welcome = () => {

    const {  bookFormData, handleChange2, isLoading } = useContext(TransactionContext);
    const [books, setBooks] = useState();
  


    const handleSubmit2 = async (e) => {

        const { book } = bookFormData;
        e.preventDefault();
        if( book.length < 3 || !book ) return;
        const data = await searchBooks(book);
        setBooks(data);


    }


    return (
        <div className='flex w-full justify-center items-center'>
            <div className='flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4'>
                <div className='flex flex-1 justify-start flex-col mf:mr-10'>
                    <h1 className='text-3xl sm:text-5xl text-whit text-gradient py-1'>
                        Find Your Books <br/> search books from the biggest liebrary in the world
                    </h1>
                    <p className='text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base'>
                        explore, read and find your love 
                    </p>

                    
                    <div className='grid sm:grid-cols-3 grid-cols-2 w-full mt-10'>

                        <div className={`rounded-tl-2xl ${commonStyles}`}>
                            Reliability
                        </div>
                        <div className={commonStyles}>Security</div>
                        <div className={`rounded-tr-2xl ${commonStyles}`}>
                            Fast
                        </div>
                        <div className={`rounded-bl-2xl ${commonStyles}`}>
                            Endlless
                        </div>
                        <div className={commonStyles}>Free</div>
                        <div className={`rounded-br-2xl ${commonStyles}`}>
                            Full
                        </div>

                    </div>
                </div>

                <div className='flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10'>
                    <div className='p-3 justify-end items-start flex-cl rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphisim'>
                        <div className='flex justify-between flex-col w-full h-full'>
                            <div className='flex justify-between items-start'>

                                <div className='w-10 h-10 rounded-full border-2 border-white flex justify-center items-center'>
                                </div>

                                <BsInfoCircle  fontSize={17} color='#fff'/>
                            </div>
                            <div>
                                <p className='text-white font-light text-sm'>
                                    #32342342
                                </p>
                                <p className='text-white font-semibold text-lg mt-1'>
                                   Your Library Card
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism'>

                        <Input placeholder="Enter A Book's Name" name='book'  type="text" handleChange={handleChange2}   />

                        <div className='h-[1px] w-full bg-gray-400 my-2'/>

                        {isLoading ? (
                            <Loader />
                        ) : 
                            <button
                            type='button'
                            onClick={handleSubmit2}
                            className='text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer'
                            >
                                Search
                            </button>
                        }

                    </div>
                </div>


                {books && (<Collection data={books} />)}
            </div>
        </div>

        
    );
}

export default Welcome;
