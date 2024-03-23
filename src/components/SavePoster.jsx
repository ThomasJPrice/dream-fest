import * as htmlToImage from 'html-to-image';
import download from "downloadjs";

import { useState } from 'react';
import { Dialog } from '@headlessui/react';

import { IoMdDownload, IoMdShare } from "react-icons/io";
import { IoClose } from "react-icons/io5";

import '../App.css';
import Loader from './Loader';
import ShareButton from './ShareButton';

const SavePoster = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [capturedImageUrl, setCapturedImageUrl] = useState('');

  const handleCapture = () => {
    if (document.getElementById('poster')) {
      htmlToImage.toPng(document.getElementById('poster'))
        .then(function (dataUrl) {
          setCapturedImageUrl(dataUrl);
        })
        .catch(function (error) {
          console.error('Error capturing image:', error);
        });
    }
  }

  handleCapture()

  const downloadImage = () => {
    download(capturedImageUrl, title)
  }

  const shareImage = () => {
    if (navigator.share) {
      // If Web Share API is supported (Mobile devices)
      const blob = dataURLtoBlob(capturedImageUrl);
      const file = new File([blob], `${title}.png`, { type: blob.type });

      navigator.share({
        text: 'I just created my dream music festival on this site, you can too! https://dreamfest.netlifty.app 🎵🎵',
      }).then(() => {
        console.log('Shared successfully');
      }).catch((error) => {
        console.error('Error sharing:', error);
      });
    } else {
      // Fallback for non-supported browsers (Desktop)
      // You can implement your custom sharing functionality here
      console.log('Web Share API is not supported');
    }
  }

  // Function to convert base64 data to Blob
  function dataURLtoBlob(dataUrl) {
    const parts = dataUrl.split(';base64,');
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
  }


  return (
    <>
      <button type='button' onClick={() => setIsOpen(true)} className='redtext py-2 px-6 w-full rounded-full font-semibold text-lg shadow-md text-white'>Share Festival!</button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className='absolute p-4 rounded-lg shadow-xl bg-[#FCFCFC] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-40'>
        <Dialog.Panel className='flex flex-col gap-4'>
          <div className='flex justify-between items-center'>
            <h3 className='font-bold text-2xl gradientBg bg-clip-text text-transparent'>Share your festival</h3>
            <button onClick={() => setIsOpen(false)}>
              <IoClose className='text-3xl' />
            </button>
          </div>

          {capturedImageUrl ? <img src={capturedImageUrl} alt="Captured Poster" /> : <Loader />}

          <div className='flex md:flex-row flex-col gap-4'>
            <ShareButton text='Download' icon={<IoMdDownload />} action={downloadImage} main />
            <ShareButton text='Share' icon={<IoMdShare />} action={shareImage} main />
          </div>

        </Dialog.Panel>

      </Dialog>

      {isOpen ? <div className='bg-gray-500 absolute w-screen h-screen top-0 left-0 opacity-40'></div> : ''}
    </>
  );
}

export default SavePoster;
