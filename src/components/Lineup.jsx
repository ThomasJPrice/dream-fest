import LineupArtist from "./LineupArtist";

const Lineup = ({ lineup, currentlySelecting }) => {
  const headliner = lineup[0]
  const supporters = [lineup[1], lineup[2], lineup[3], lineup[4]]

  console.log(lineup);

  return (
    <div className="text-center flex flex-col gap-4 mt-12 w-full items-center">
      <h2 className="font-bold text-4xl relative text-gray-900">Lineup <div className="w-full absolute h-1 gradientBg" /></h2>

      <div className="flex flex-col max-w-[500px] w-full mt-4 gap-4">
        <div>
          <p className="mb-4 font-medium text-gray-700 text-lg">HEADLINER</p>

          <ul>
            <LineupArtist artist={headliner} index={0} currentlySelecting={currentlySelecting} />
          </ul>
        </div>

        <div>
          <p className="mb-4 font-medium text-gray-700 text-lg">SUPPORTING</p>

          <ul className="flex flex-col gap-4">
            {supporters.map((artist, index) => (
              <LineupArtist key={artist+index} artist={artist} index={index + 1} currentlySelecting={currentlySelecting} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Lineup
