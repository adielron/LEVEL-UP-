
// 
const BookCard = ({title,author,subtitle, publisher, img, categories, url   }) => {

    return (
        <div className="bg-[#181918] m-4 flex flex-1
        2xl:min-w-[450px]
        2xl:max-w-[500px]
        sm:min-w-[270px]
        sm:min-w-[300px]
        flex-col p-3 rounded-md hover:shadow-2xl
        ">
            <div className="flex flex-col items-center w-full mt-3">
                <div className="w-full mb-6 p-2">



                    <p className="text-white text-base font-bold">{title}</p>
                    <br />
                    <p className="text-white text-base ">Author: {author}</p>
                     <p className="text-white text-base">-{subtitle}-</p>
                     <br />
                    <p className="text-white text-base">publisher: {publisher}</p>
                    <br />
                    <a href={`${url}`} target="_blank" rel="noreferrer">
                        <p className=" underline text-white text-base ;">
                            Press here to learn more...</p>
                    </a>

                </div>
                    <img src={ img } 
                    alt="gif" 
                    className="w-full h-64 2x:h-96 rounded-md shadow-lg object-cover"
                    />

                    <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow=2xl">
                        <p className="text-[#37c7da] font-bold ">{categories}</p>
                    </div>
            </div>
        </div>
    )
}


const Collection = ({data}) => {
    // const { currentAccount, transactions } = useContext(TransactionContext);
    console.log(data);  
    return (
        <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
            <div className="flex flex-col md:p-12 py-12 px-4">
            {/* {currentAccount ? (
                <h3 className="text-white text-3xl text-center my-2"> Latest Transactions</h3>
            ): (
                <h3 className="text-white text-3xl text-center my-2"> Connect Your Account To See Latest Transactions</h3>
            )} */}

                <div className="flex flex-wrap justift-center items-center mt-10">
                   {data.map((book, i)=>(
                    <BookCard 
                    key={i}
                    title={book?.volumeInfo.title}
                    subtitle={book?.volumeInfo.subtitle}
                    author={book?.volumeInfo.authors[0]}
                    publisher={book?.volumeInfo.publisher}
                    img={book?.volumeInfo?.imageLinks?.smallThumbnail}
                    categories={book?.volumeInfo?.language}
                    url={book?.volumeInfo?.infoLink}
                    />
                   ))} 

                </div>
            </div>
        </div>
    );
}

export default Collection;
