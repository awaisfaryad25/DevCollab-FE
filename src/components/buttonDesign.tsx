import React from "react";

const ButtonDesign = () => {
  return (
    <div className="space-y-6">
      <div className="toggles-grid">
        <div className="toggles-container">
          <div className="toggle-container a">
            <input className="toggle-input" type="checkbox" />
            <div className="toggle-handle"></div>
            <svg
              className="toggle-icon"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.7072 5.70718L7.00008 11.4143L3.29297 7.70718L4.70718 6.29297L7.00008 8.58586L11.293 4.29297L12.7072 5.70718Z" />
            </svg>
            <svg
              className="toggle-icon"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6.58594 8.00015L4.29297 5.70718L5.70718 4.29297L8.00015 6.58594L10.2931 4.29297L11.7073 5.70718L9.41436 8.00015L11.7072 10.293L10.293 11.7072L8.00015 9.41436L5.70733 11.7072L4.29312 10.293L6.58594 8.00015Z" />
            </svg>
          </div>

          <div className="toggle-container a">
            <input className="toggle-input" type="checkbox" checked />
            <div className="toggle-handle"></div>
            <svg
              className="toggle-icon"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.7072 5.70718L7.00008 11.4143L3.29297 7.70718L4.70718 6.29297L7.00008 8.58586L11.293 4.29297L12.7072 5.70718Z" />
            </svg>
            <svg
              className="toggle-icon cross"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6.58594 8.00015L4.29297 5.70718L5.70718 4.29297L8.00015 6.58594L10.2931 4.29297L11.7073 5.70718L9.41436 8.00015L11.7072 10.293L10.293 11.7072L8.00015 9.41436L5.70733 11.7072L4.29312 10.293L6.58594 8.00015Z" />
            </svg>
          </div>
        </div>

        <div className="toggles-container">
          <div className="toggle-container b">
            <input className="toggle-input" type="checkbox" />
            <div className="toggle-handle">
              <div className="toggle-handle-dot"></div>
              <div className="toggle-handle-dot"></div>
              <div className="toggle-handle-dot"></div>
              <div className="toggle-handle-dot"></div>
              <div className="toggle-handle-dot"></div>
              <div className="toggle-handle-dot"></div>
            </div>
            <p className="toggle-text off" aria-hidden="true">
              OFF
            </p>
            <p className="toggle-text on" aria-hidden="true">
              ON
            </p>
          </div>

          <div className="toggle-container b">
            <input className="toggle-input" type="checkbox" checked />
            <div className="toggle-handle">
              <div className="toggle-handle-dot"></div>
              <div className="toggle-handle-dot"></div>
              <div className="toggle-handle-dot"></div>
              <div className="toggle-handle-dot"></div>
              <div className="toggle-handle-dot"></div>
              <div className="toggle-handle-dot"></div>
            </div>
            <p className="toggle-text on" aria-hidden="true">
              ON
            </p>
            <p className="toggle-text off" aria-hidden="true">
              OFF
            </p>
          </div>
        </div>

        <div className="toggle-container c">
          <input className="toggle-input" type="checkbox" />
          <p className="toggle-text" aria-hidden="true">
            OFF
          </p>
          <div className="toggle-track-wrapper-wrapper">
            <div className="toggle-handle"></div>
            <div className="toggle-track-wrapper">
              <div className="toggle-track"></div>
            </div>
          </div>
          <p className="toggle-text" aria-hidden="true">
            ON
          </p>
        </div>

        <div className="toggles-container">
          <div className="toggle-container d">
            <input className="toggle-input" type="checkbox" />
            <div className="toggle-handle">
              <p className="toggle-text off">OFF</p>
              <p className="toggle-text on">ON</p>
            </div>
          </div>

          <div className="toggle-container d">
            <input className="toggle-input" type="checkbox" checked />
            <div className="toggle-handle">
              <p className="toggle-text off">OFF</p>
              <p className="toggle-text on">ON</p>
            </div>
          </div>
        </div>
      </div>


    <div className="grid grid-cols-3 gap-6">
      <button className=" relative inline-flex items-center justify-center px-8 py-2.5 overflow-hidden tracking-tighter text-white bg-gray-800 rounded-md group">
        <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-orange-600 rounded-full group-hover:w-56 group-hover:h-56"></span>
        <span className="absolute bottom-0 left-0 h-full -ml-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-auto h-full opacity-100 object-stretch"
            viewBox="0 0 487 487"
          >
            <path
              fill-opacity=".1"
              fill-rule="nonzero"
              fill="#FFF"
              d="M0 .3c67 2.1 134.1 4.3 186.3 37 52.2 32.7 89.6 95.8 112.8 150.6 23.2 54.8 32.3 101.4 61.2 149.9 28.9 48.4 77.7 98.8 126.4 149.2H0V.3z"
            ></path>
          </svg>
        </span>
        <span className="absolute top-0 right-0 w-12 h-full -mr-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="object-cover w-full h-full"
            viewBox="0 0 487 487"
          >
            <path
              fill-opacity=".1"
              fill-rule="nonzero"
              fill="#FFF"
              d="M487 486.7c-66.1-3.6-132.3-7.3-186.3-37s-95.9-85.3-126.2-137.2c-30.4-51.8-49.3-99.9-76.5-151.4C70.9 109.6 35.6 54.8.3 0H487v486.7z"
            ></path>
          </svg>
        </span>
        <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-linear-to-b from-transparent via-transparent to-gray-200"></span>
        <span className="relative text-base font-semibold">Hover Me !</span>
      </button>

      <button
        className="font-sans flex justify-center gap-2 items-center mx-auto shadow-xl text-lg text-gray-50 bg-[#0A0D2D] backdrop-blur-md lg:font-semibold isolation-auto before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
        type="submit"
      >
        Get Plan
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 19"
          className="w-8 h-8 justify-end bg-gray-50 group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
        >
          <path
            className="fill-gray-800 group-hover:fill-gray-800"
            d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
          ></path>
        </svg>
      </button>

    

    </div>

    <div className="grid grid-cols-4 gap-6">
      <div className="relative">  
      <button
        className="absolute bg-green-500 text-white w-14 h-14 rounded-full flex justify-center items-center shadow-lg hover:bg-green-600 transition-all duration-300 ease-out group z-50 hover:scale-105 active:scale-95"
        aria-label="Chat on WhatsApp"
      >
        <div className="absolute -right-1 -top-1 z-10">
          <div className="flex h-6 w-6 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
              1
            </span>
          </div>
        </div>

        <svg
          viewBox="0 0 16 16"
          className="w-7 h-7"
          fill="currentColor"
          height="24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"></path>
        </svg>

        <span className="absolute inset-0 rounded-full border-4 border-white/30 scale-100 animate-pulse"></span>

        <div className="absolute right-full mr-3 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
          <div className="bg-gray-800 text-white text-sm px-3 py-1 rounded shadow-lg">
            Do you need help?
          </div>
          <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800"></div>
        </div>
      </button>
    </div>

      <button className="group w-12 hover:w-44 h-12 hover:bg-sky-600 relative bg-sky-700 rounded text-neutral-50 duration-700 before:duration-700 before:hover:500 font-bold flex justify-start gap-2 items-center p-2 pr-6 before:absolute before:-z-10 before:left-8 before:hover:left-40 before:w-6 before:h-6 before:bg-sky-700 before:hover:bg-sky-600 before:rotate-45">
          <svg
            y="0"
            xmlns="http://www.w3.org/2000/svg"
            x="0"
            width="100"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
            height="100"
            className="w-8 h-8 shrink-0 fill-neutral-50"
          >
            <path d="M92.86,0H7.12A7.17,7.17,0,0,0,0,7.21V92.79A7.17,7.17,0,0,0,7.12,100H92.86A7.19,7.19,0,0,0,100,92.79V7.21A7.19,7.19,0,0,0,92.86,0ZM30.22,85.71H15.4V38H30.25V85.71ZM22.81,31.47a8.59,8.59,0,1,1,8.6-8.59A8.6,8.6,0,0,1,22.81,31.47Zm63,54.24H71V62.5c0-5.54-.11-12.66-7.7-12.66s-8.91,6-8.91,12.26V85.71H39.53V38H53.75v6.52H54c2-3.75,6.83-7.7,14-7.7,15,0,17.79,9.89,17.79,22.74Z"></path>
          </svg>
          <span className="origin-left inline-flex duration-100 group-hover:duration-300 group-hover:delay-500 opacity-0 group-hover:opacity-100 border-l-2 px-1 transform scale-x-0 group-hover:scale-x-100 transition-all">
            Your Name
          </span>
      </button>

      <button className="group w-12 hover:w-44 h-12 bg-linear-to-r from-purple-500 via-pink-500 to-orange-500 relative rounded text-neutral-50 duration-700 before:duration-700 before:hover:500 font-bold flex justify-start gap-2 items-center p-2 pr-6 before:absolute before:-z-10 before:left-8 before:hover:left-40 before:w-6 before:h-6 before:bg-pink-600 before:hover:bg-pink-500 before:rotate-45">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-8 h-8 shrink-0 fill-neutral-50"
        >
          <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
        </svg>
        <span className="origin-left inline-flex duration-100 group-hover:duration-300 group-hover:delay-500 opacity-0 group-hover:opacity-100 border-l-2 px-1 transform scale-x-0 group-hover:scale-x-100 transition-all">
          @username
        </span>
      </button>

      <button className="group w-12 hover:w-44 h-12 hover:bg-gray-800 relative bg-gray-900 rounded text-neutral-50 duration-700 before:duration-700 font-bold flex justify-start gap-2 items-center p-2 pr-6 before:absolute before:-z-10 before:left-8 before:hover:left-40 before:w-6 before:h-6 before:bg-gray-900 before:hover:bg-gray-800 before:rotate-45">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-8 h-8 shrink-0 fill-neutral-50"
        >
          <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.93c.58.1.79-.25.79-.55v-1.94c-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.73.08-.72.08-.72 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.72 1.26 3.38.96.1-.76.4-1.26.72-1.55-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.28 1.2-3.08-.12-.3-.52-1.5.12-3.1 0 0 .98-.32 3.2 1.18a11.1 11.1 0 0 1 5.82 0c2.22-1.5 3.2-1.18 3.2-1.18.64 1.6.24 2.8.12 3.1.75.8 1.2 1.82 1.2 3.08 0 4.44-2.7 5.4-5.28 5.68.4.34.76 1.02.76 2.06v3.05c0 .3.2.66.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"></path>
        </svg>
        <span className="origin-left inline-flex duration-100 group-hover:duration-300 group-hover:delay-500 opacity-0 group-hover:opacity-100 border-l-2 px-1 transform scale-x-0 group-hover:scale-x-100 transition-all">
          GitHub
        </span>
      </button>



      <button className="text-zinc-700 hover:text-green-600 backdrop-blur-lg bg-linear-to-tr from-transparent via-[rgba(121,121,121,0.16)] to-transparent rounded-md py-2 px-6 shadow hover:shadow-green-600 duration-700">
        Button
      </button>
    </div>
      <button className="bg-[linear-gradient(#e9e9e9,#e9e9e9_50%,#fff)] group w-50 h-16 inline-flex transition-all duration-300 overflow-visible p-1 rounded-full group">
        <div className="w-half h-full bg-[linear-gradient(to_top,#ececec,#fff)] overflow-hidden shadow-[0_0_1px_rgba(0,0,0,0.07),0_0_1px_rgba(0,0,0,0.05),0_3px_3px_rgba(0,0,0,0.25),0_1px_3px_rgba(0,0,0,0.12)] p-1 rounded-full hover:shadow-none duration-300">
          <div className="w-full h-full text-xl gap-x-0.5 gap-y-0.5 justify-center text-[#101010] bg-[linear-gradient(#f4f4f4,#fefefe)] group-hover:bg-[linear-gradient(#e2e2e2,#fefefe)] duration-200 items-center text-[18px] font-medium gap-4 inline-flex overflow-hidden px-4 py-2 rounded-full black group-hover:text-blue-600">
            <svg
              xmlnsXlink="http://www.w3.org/1999/xlink"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              viewBox="0 0 64 64"
              height="32px"
              width="24px"
            >
              <g fill-rule="evenodd" fill="none" stroke-width="1" stroke="none">
                <g
                  fill-rule="nonzero"
                  transform="translate(3.000000, 2.000000)"
                >
                  <path
                    fill="#4285F4"
                    d="M57.8123233,30.1515267 C57.8123233,27.7263183 57.6155321,25.9565533 57.1896408,24.1212666 L29.4960833,24.1212666 L29.4960833,35.0674653 L45.7515771,35.0674653 C45.4239683,37.7877475 43.6542033,41.8844383 39.7213169,44.6372555 L39.6661883,45.0037254 L48.4223791,51.7870338 L49.0290201,51.8475849 C54.6004021,46.7020943 57.8123233,39.1313952 57.8123233,30.1515267"
                  ></path>
                  <path
                    fill="#34A853"
                    d="M29.4960833,58.9921667 C37.4599129,58.9921667 44.1456164,56.3701671 49.0290201,51.8475849 L39.7213169,44.6372555 C37.2305867,46.3742596 33.887622,47.5868638 29.4960833,47.5868638 C21.6960582,47.5868638 15.0758763,42.4415991 12.7159637,35.3297782 L12.3700541,35.3591501 L3.26524241,42.4054492 L3.14617358,42.736447 C7.9965904,52.3717589 17.959737,58.9921667 29.4960833,58.9921667"
                  ></path>
                  <path
                    fill="#FBBC05"
                    d="M12.7159637,35.3297782 C12.0932812,33.4944915 11.7329116,31.5279353 11.7329116,29.4960833 C11.7329116,27.4640054 12.0932812,25.4976752 12.6832029,23.6623884 L12.6667095,23.2715173 L3.44779955,16.1120237 L3.14617358,16.2554937 C1.14708246,20.2539019 0,24.7439491 0,29.4960833 C0,34.2482175 1.14708246,38.7380388 3.14617358,42.736447 L12.7159637,35.3297782"
                  ></path>
                  <path
                    fill="#EB4335"
                    d="M29.4960833,11.4050769 C35.0347044,11.4050769 38.7707997,13.7975244 40.9011602,15.7968415 L49.2255853,7.66898166 C44.1130815,2.91684746 37.4599129,0 29.4960833,0 C17.959737,0 7.9965904,6.62018183 3.14617358,16.2554937 L12.6832029,23.6623884 C15.0758763,16.5505675 21.6960582,11.4050769 29.4960833,11.4050769"
                  ></path>
                </g>
              </g>
            </svg>
            <span className="ml-2">Sign In with Google</span>
          </div>
        </div>
      </button>
    </div>
  );
};

export default ButtonDesign;
