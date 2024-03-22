import { Audio } from "react-loader-spinner"

const Loader = () => {
  return (
    <div className="w-full flex justify-center pt-8">
      <Audio
        height="50"
        width="50"
        color="#22868F"
        ariaLabel="audio-loading"
        wrapperStyle={{}}
        wrapperClass="wrapper-class"
        visible={true}
      />
    </div>
  )
}

export default Loader