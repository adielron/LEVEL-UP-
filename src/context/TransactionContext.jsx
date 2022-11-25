import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants'


export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {

    
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);


    return transactionContract;
}

//passing data through all app components
export const TransactionProvider = ( { children } ) => {
    const [currentAccount, setCurrentAccount] = useState('')
    const [formData, setFormData] = useState({ addressTo:'', amount:'', keyword:'',message:''});
    const [bookFormData, setBookFormData] = useState({ name:''});

    const [isLoading,setIsLoading] = useState(false);
    const [ transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
    const [transactions, setTransactions] = useState([]);


    const checkIfWalletIsConnected = async () => {
        try {
            if(!ethereum) return alert("Please Install MetaMask");

            const accounts = await ethereum.request({ method: 'eth_accounts'});
    
            if(accounts.length){
                setCurrentAccount(accounts[0]);
                getAllTransactions();
            }
    
            
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.")
        }
    }


    const checkIfTransactionExist = async () => {
        try {
            const transationContract = getEthereumContract();
            const transactionCount = await transationContract.getTransactionCount();
            window.localStorage.setItem("transactionCount", transactionCount);
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.")
        }
    }

     //calls function only at the load of app
     useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionExist();
    }, []);







    const handleChange2 = (e, name) => {
        setBookFormData((prevState) => ({...prevState, [name]:e.target.value}))
    }


    const handleChange = (e, name) => {
        setFormData((prevState) => ({...prevState, [name]:e.target.value}))
    }





    const getAllTransactions = async () =>{
        try {
            if(!ethereum) return alert("Please Install MetaMask");
            const transationContract = getEthereumContract();
            const availableTransaction = await transationContract.getAllTransactions();
            const structuredTransactions = availableTransaction.map((transaction)=>({
                addressTo: transaction.receiver,
                addressFrom: transaction.sender,
                timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                message: transaction.message,
                keyword: transaction.keyword,
                amount: parseInt(transaction.amount._hex) / (10**18)

            }))

            setTransactions(structuredTransactions);

        } catch (error) {
            console.log(error);

        }
    }


    const connectWallet = async () => {
        try {
            if(!ethereum) return alert("Please Install MetaMask");
            const accounts = await ethereum.request({ method: 'eth_requestAccounts'});

            setCurrentAccount(accounts[0]);

        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.")
        }
    }

    const searchBook = async () => {
        try {
            const { name } = bookFormData
        } catch (error) {
            console.log(error);
            throw new Error("no book object")
        }
    }   

    const sendTransaction = async () => {
        try {
            if(!ethereum) return alert("Please Install MetaMask");
            const { addressTo, amount, keyword, message } = formData;
            const transationContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);

            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208', //21000 gwei
                    value: parsedAmount._hex,
                }]

            });

            const transactionHash = await transationContract.addToBlockchain(addressTo, parsedAmount, message, keyword);
            setIsLoading(true);
            console.log(`loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoading(false);
            console.log(`success - ${transactionHash.hash}`);
            const transactionCount = await transationContract.getTransactionCount();

            setTransactionCount(transactionCount.toNumber());

        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.")
        }
    }

 





   
    return (
        <TransactionContext.Provider value={{ connectWallet,
         currentAccount,
          formData,
           setFormData,
            handleChange,
             sendTransaction,
              transactions,
               setTransactions,
                isLoading,
                bookFormData,
                setBookFormData,
                handleChange2

            }}>
            {children}
        </TransactionContext.Provider>
    )
}