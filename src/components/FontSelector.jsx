const choices = ['posterFont1', 'posterFont3']

const FontSelector = ({ font, setFont }) => {
  return (
    <div className="flex gap-2">
      {choices.map((choice, index) => (
        <div key={choice+index} onClick={() => setFont(choice)} className={`rounded-sm hover:cursor-pointer w-8 h-8 p-1  ${font === choice ? 'bg-gray-900' : 'bg-white'}`}>
          <div className={`w-full h-full bg-[#f5f5f5] rounded-sm text-lg flex justify-center items-center ${choice}`}>
            Aa
          </div>
        </div>
      ))}
    </div>
  )
}

export default FontSelector