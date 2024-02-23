import './App.css'

import { Hero, LineupPicker, Navbar } from './components'

function App() {
  return (
    <main>
      <div className="main">
        <div className="gradient" />
      </div>

      <div className='relative z-10 pb-20 flex justify-center items-center flex-col max-w-7xl mx-auto sm:px-16 px-6'>
        <Navbar />
        <Hero />
        <LineupPicker />
      </div>
    </main>
  )
}

export default App
