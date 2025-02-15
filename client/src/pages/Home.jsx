import React from 'react';
import dodoImg from "../assets/dodo-svg.svg";
import { Pencil, Star } from 'lucide-react';
import GridComponent from '../components/GridComponent';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="relative w-full text-white h-screen dm-sans bg-black overflow-hidden">
            <div className="absolute inset-0 z-0">
                <GridComponent />
            </div>

            <header className="relative p-4 md:p-10 lg:p-16 -top-2 md:-top-8 z-10 flex items-center justify-between">
                <h1 className="flex montserrat items-center text-gray-200 gap-1">
                    <img src={dodoImg} className="w-8 h-5 sm:w-10 sm:h-6 md:w-14 md:h-7 bg-purple-300 p-0.5 rounded-full" />
                    <span className="text-lg sm:text-xl md:text-3xl font-semibold">Neo</span>
                    <i className="mt-1 sm:mt-2 text-sm sm:text-base md:text-lg">dodo</i>
                </h1>
                <a
                    href="https://github.com/Prudvi0033/DoDo"
                    className="flex items-center gap-2 bg-purple-600 px-3 py-1 md:px-4 md:py-2 rounded-lg text-white hover:bg-purple-700 transition text-xs sm:text-sm md:text-base"
                >
                    <Star size={15} />
                    Star on GitHub
                </a>
            </header>

            <div className='relative montserrat flex items-center flex-col text-center justify-center px-6 sm:px-10'>
                <div className='flex flex-wrap items-center gap-2 text-3xl sm:text-4xl md:text-5xl font-semibold'>
                    Turn <i className="bg-gradient-to-tl from-slate-600 via-violet-500 to-zinc-400 bg-clip-text text-transparent">Scribbles</i> into, <i className="bg-gradient-to-tl from-slate-600 via-violet-500 to-zinc-400 bg-clip-text text-transparent">Smart Notes</i> with AI.
                </div>
                <h2 className='text-sm sm:text-lg md:text-xl mt-2 text-gray-300'>
                    From Rough Ideas to Refined Insights—Let AI Elevate Your Notes.
                </h2>
                <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 mt-4'>
                    <Link to="/login" className='btn glass text-white px-4 py-2 text-sm sm:text-base flex items-center gap-2'>
                        Start Writing <Pencil size={16} />
                    </Link>
                    <Link to="/signup" className='btn glass text-white bg-purple-700 hover:bg-purple-600 px-4 py-2 text-sm sm:text-base'>
                        Register
                    </Link>
                </div>
            </div>

            <div className="flex items-center justify-center relative z-10 -bottom-[3rem] px-4 opacity-80">
                <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[50%] bg-zinc-950 bg-clip-padding backdrop-filter backdrop-blur-md backdrop-opacity-50 backdrop-saturate-150 rounded-2xl p-6 sm:p-10 md:p-16 flex flex-col gap-6 shadow-[0px_20px_207px_10px_rgba(165,_39,_255,_0.48)]">
                    <div className="flex flex-wrap justify-between gap-2">
                        <div className="skeleton h-4 w-20 sm:w-28 bg-purple-700/40"></div>
                        <div className='flex flex-wrap gap-2'>
                            <div className="skeleton h-4 w-20 sm:w-28 bg-purple-600/40"></div>
                            <div className="skeleton h-4 w-20 sm:w-28 bg-purple-500/40"></div>
                            <div className="skeleton h-4 w-20 sm:w-28 bg-purple-400/40"></div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="skeleton h-6 sm:h-8 w-full bg-purple-700/50"></div>
                        <div className="skeleton h-4 w-full bg-purple-600/50"></div>
                        <div className="skeleton h-4 w-40 sm:w-56 bg-purple-500/50"></div>
                    </div>

                    <div>
                        <div className="skeleton bg-purple-800/60 h-24 sm:h-36 w-full"></div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Home;
