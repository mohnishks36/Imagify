import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { AppContext } from '../context/AppContext';

const Result = () => {

  const [image,setImage]=useState(assets.sample_img_1);
  const [isImageLoaded,setIsImageLoaded]=useState(false);
  const [loading,setLoading]=useState(false);
  const [input,setInput]=useState('');

  const {generateImage}=useContext(AppContext)
  const onSubmitHandler=async(e)=>{

    e.preventDefault();
    setLoading(true);
    if(input){
      const image=await generateImage(input);
      if(image){
        setImage(image);
        setIsImageLoaded(true);
       
      }
    }
     setLoading(false);
  }

  return (
    <motion.form onSubmit={onSubmitHandler} className="flex flex-col min-h-[90vh] justify-center items-center px-4"
    initial={{opacity:0.2,y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}>
      {/* Image with loading bar */}
      <div className="w-full max-w-md">
        <div className="relative w-full">
          <img src={image} alt="Sample" className="w-full rounded-lg shadow-md" />
          <span className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${loading?'w-full animate-pulse transition-all duration-[10s]':'w-0'}`} />
        </div>
        {loading&&<p className="text-center mt-2 text-gray-600">Loading...</p>}
      </div>

      {/* Input and button */}
      {!isImageLoaded &&<div className="flex w-full max-w-xl bg-neutral-600 text-white text-sm p-1 mt-10 rounded-full shadow-lg">
        <input
        onChange={e=>setInput(e.target.value)} value={input}
          type="text"
          placeholder="Describe what you want to generate"
          className="flex-1 bg-transparent outline-none ml-6 text-white placeholder-color"
        />
        <button
          type="submit"
          className="bg-zinc-900 hover:bg-zinc-800 transition px-6 sm:px-10 py-2 sm:py-3 rounded-full text-white font-medium"
        >
          Generate
        </button>
      </div>}
      {isImageLoaded &&   <div className="flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full">
  <p onClick={()=>setIsImageLoaded(false)} className="bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer">
    Generate Another
  </p>
  <a href={image} download className="bg-zinc-900 px-10 py-3 rounded-full cursor-pointer">
    Download
  </a>
</div>}
    

    </motion.form>
  );
};

export default Result;
