const ShareButton = ({ text, icon, action, main }) => {
  return (
    <button
      onClick={action}
      className={`
      w-full
      text-lg
      font-semibold
      flex
      items-center
      justify-center
      gap-2
      py-2
      rounded-lg
      ${main ? 'gradientBg text-white' : ''}
    `}

    // className="gradientBg w-full text-white font-semibold text-lg flex items-center justify-center gap-2 py-2 rounded-lg">
    >
      {text} {icon}
    </button >
  )
}

export default ShareButton