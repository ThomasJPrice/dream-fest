import './App.css'

import { Navbar } from './components'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home, Create } from './pages'

function App() {
  return (
    <Router>
      <main>
        {/* <div className="main">
          <div className="gradient" />
        </div> */}

        <div className=' z-10 pb-20 flex justify-center items-center flex-col max-w-7xl mx-auto sm:px-16 px-6'>
          <Navbar />

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/create' element={<Create />} />
          </Routes>
        </div>
      </main>
    </Router>
  )
}

export default App
