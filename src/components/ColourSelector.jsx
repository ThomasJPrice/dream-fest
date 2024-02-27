const ColourSelector = ({ backgroundIndex, setBackgroundIndex, backgrounds }) => {
  const backgroundNames = ['Festival', 'Grass', 'Bunting', 'Black']

  return (
    <div className="flex flex-col">
      <div className="flex gap-2">
        {backgrounds.map((choice, index) => (
          <div key={choice + index} onClick={() => setBackgroundIndex(index)} className={`hover:cursor-pointer w-12 h-12 p-1 ${backgroundIndex === index ? 'bg-gray-900' : 'bg-white'}`}>
            <div className={`w-full h-full aspect-square rounded-full ${choice}`}>
              <img src={choice} alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-1">{backgroundNames[backgroundIndex]}</p>
    </div>
  )
}

export default ColourSelector