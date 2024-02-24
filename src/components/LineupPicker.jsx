import { useState } from "react"
import ArtistCombobox from "./ArtistCombobox"
import Lineup from "./Lineup"

import { CiTrash } from "react-icons/ci";

const LineupPicker = () => {
  // artistTemplate = {
  //   name: '',
  //   image: '',
  // }

  const [currentlySelecting, setCurrentlySelecting] = useState(localStorage.getItem('currentlySelecting') ? JSON.parse(localStorage.getItem('currentlySelecting')) : 0)
  const [artistSelected, setArtistSelected] = useState('')
  const [lineup, setLineup] = useState(localStorage.getItem('lineup') ? JSON.parse(localStorage.getItem('lineup')) : ['', '', '', '', ''])

  const resetLineup = () => {
    setLineup(['', '', '', '', ''])
    setCurrentlySelecting(0)
    setArtistSelected('')

    localStorage.clear()
  }

  return (
    <div className="mt-16 w-full flex flex-col items-center">
      <ArtistCombobox
        currentlySelecting={currentlySelecting}
        setCurrentlySelecting={setCurrentlySelecting}
        artistSelected={artistSelected}
        setArtistSelected={setArtistSelected}
        lineup={lineup}
        setLineup={setLineup}
      />

      <Lineup currentlySelecting={currentlySelecting} lineup={lineup} />

      <div className="mt-12 flex gap-4 items-center">
        <a href='/create' className="gradientBg py-2 px-6 text-lg rounded-full font-semibold text-white">Create</a>
        <button onClick={resetLineup} className="bg-gray-900 text-white rounded-full text-lg h-10 w-10 flex items-center justify-center"><CiTrash /></button>
      </div>
    </div>
  )
}

export default LineupPicker