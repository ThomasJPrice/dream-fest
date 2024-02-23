import { useState } from "react"
import ArtistCombobox from "./ArtistCombobox"
import Lineup from "./Lineup"

const LineupPicker = () => {
  const [currentlySelecting, setCurrentlySelecting] = useState(0)
  const [artistSelected, setArtistSelected] = useState('')
  const [lineup, setLineup] = useState(['','','','',''])

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
    </div>
  )
}

export default LineupPicker