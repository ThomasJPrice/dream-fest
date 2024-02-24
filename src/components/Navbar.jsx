const Navbar = () => {
  return (
    <nav className="w-full flex justify-between pt-4 items-center">
      <a href='/' className="text-3xl font-bold gradientBg bg-clip-text text-transparent">DreamFest</a>
      <a href="https://github.com/ThomasJPrice/dream-fest" target="_blank" className="gradientBg py-2 px-6 rounded-full font-semibold text-white">Github</a>
    </nav>
  )
}

export default Navbar