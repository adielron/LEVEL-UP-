import { Navbar, Welcome, Footer } from './components'

const App = () => {

  return (
    <div className="App">

      <div className='min-h-screen'>
        <div className='gradient-bg-welcome'>
          <Navbar />
          <Welcome />
        </div>
 
        {/* <Transactions /> */}
        <Footer />
      </div>


    </div>
  )
}

export default App
