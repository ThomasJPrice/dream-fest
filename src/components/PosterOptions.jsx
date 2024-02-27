import { useState } from "react";
import { GrUpdate } from "react-icons/gr";

import ColourSelector from "./ColourSelector";

const PosterOptions = ({ posterOptions, setPosterOptions, backgrounds }) => {
  const [title, setTitle] = useState(posterOptions.title)
  const [font, setFont] = useState(posterOptions.font)
  const [backgroundIndex, setBackgroundIndex] = useState(posterOptions.backgroundIndex)
  const [isRotating, setIsRotating] = useState(false);

  const handleUpdate = () => {
    setIsRotating(true)
    setPosterOptions({
      title: title,
      backgroundIndex: backgroundIndex,
      font: font,
      headliner: posterOptions.headliner,
      supports: posterOptions.supports
    })

    setTimeout(() => {
      setIsRotating(false);
    }, 1000);
  }

  return (
    <div className="text-gray-900 flex flex-col gap-4 items-start">
      <h1 className="text-3xl sm:text-4xl font-bold">Create your <span className="gradientBg bg-clip-text text-transparent">festival poster!</span></h1>

      <div className="w-full flex flex-col gap-4">
        <div className="w-full">
          <p className="text-lg mb-1">Name your festival</p>
          <div className="gradientBg p-[2px] rounded-lg md:w-1/2 w-full">
            <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} className="rounded-lg p-1 w-full focus:outline-none" />
          </div>
        </div>

        <div>
          <p className="text-lg mb-1">Background colour</p>
          <ColourSelector backgrounds={backgrounds} backgroundIndex={backgroundIndex} setBackgroundIndex={setBackgroundIndex} />
        </div>

        {/* <div>
          <p className="text-lg mb-1">Font</p>
          <FontSelector font={font} setFont={setFont} />
        </div> */}
      </div>

      <button onClick={handleUpdate} className={`gradientBg py-2 px-6 rounded-full font-semibold text-white flex gap-2 items-center`}>Update <GrUpdate className={isRotating ? 'rotate-on-click' : ''} /></button>
    </div>
  )
}

export default PosterOptions