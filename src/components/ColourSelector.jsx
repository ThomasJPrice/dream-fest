const choices = ['purpleBluePosterBg', 'blueRedPosterBg', 'orangeYellowPosterBg', 'purpleSunriseBg']

const ColourSelector = ({ background, setBackground }) => {
  return (
    <div className="flex gap-2">
      {choices.map((choice, index) => (
        <div key={choice+index} onClick={() => setBackground(choice)} className={`hover:cursor-pointer w-8 h-8 p-1 rounded-full ${background === choice ? 'bg-gray-900' : 'bg-white'}`}>
          <div className={`w-full h-full bg-black rounded-full ${choice}`}>

          </div>
        </div>
      ))}
    </div>
  )
}

export default ColourSelector