"use client";

export default function NeumorphicInputs() {
  return (
    <div className="min-h-screen w-full bg-[#d6d6d6] flex items-center justify-center">
      <div className="flex flex-col gap-10">

        {/* Radios */}
        <div className="flex items-center justify-center gap-8">

          {/* Without Dot */}
          {[1, 2, 3].map((i) => (
            <label
              key={i}
              className="relative grid place-items-center rounded-full
              border-[7px] border-[#d6d6d6]
              bg-[linear-gradient(145deg,#fcfcfc,#b0b0b0)]
              shadow-[10px_10px_20px_#b0b0b0,-10px_-10px_20px_#fcfcfc]"
            >
              <input
                type="radio"
                name="radio1"
                className="
                peer
                appearance-none
                w-11
                h-11
                rounded-full
                cursor-pointer
                bg-transparent
                shadow-[inset_-2px_-2px_4px_#b0b0b0,inset_2px_2px_4px_#fcfcfc]
                checked:shadow-[inset_2px_2px_4px_#b0b0b0,inset_-2px_-2px_4px_#fcfcfc]"
              />
            </label>
          ))}

          {/* With Dot */}
          {[1, 2, 3].map((i) => (
            <label
              key={i}
              className="relative grid place-items-center rounded-full
              border-[7px] border-[#d6d6d6]
              bg-[linear-gradient(145deg,#fcfcfc,#b0b0b0)]
              shadow-[10px_10px_20px_#b0b0b0,-10px_-10px_20px_#fcfcfc]"
            >
              <input
                type="radio"
                name="radio2"
                className="
                peer
                appearance-none
                w-11
                h-11
                rounded-full
                cursor-pointer
                bg-transparent
                shadow-[inset_-2px_-2px_4px_#b0b0b0,inset_2px_2px_4px_#fcfcfc]
                checked:shadow-[inset_2px_2px_4px_#b0b0b0,inset_-2px_-2px_4px_#fcfcfc]"
              />

              <div
                className="
                pointer-events-none
                absolute
                text-[30px]
                text-[#d6d6d6]
                transition-all
                [text-shadow:-2px_-2px_4px_#fcfcfc,2px_2px_4px_#b0b0b0]
                peer-checked:scale-90
                peer-checked:translate-y-[2px]
                peer-checked:text-[rgb(40,140,80)]"
              >
                ●
              </div>
            </label>
          ))}
        </div>

        {/* Checkboxes */}
        <div className="flex items-center justify-center gap-8">

          {/* Without Tick */}
          {[1, 2, 3].map((i) => (
            <label
              key={i}
              className="relative grid place-items-center rounded-xl
              border-[7px] border-[#d6d6d6]
              bg-[linear-gradient(145deg,#fcfcfc,#b0b0b0)]
              shadow-[10px_10px_20px_#b0b0b0,-10px_-10px_20px_#fcfcfc]"
            >
              <input
                type="checkbox"
                className="
                peer
                appearance-none
                w-11
                h-11
                rounded
                cursor-pointer
                bg-transparent
                shadow-[inset_-2px_-2px_4px_#b0b0b0,inset_2px_2px_4px_#fcfcfc]
                checked:shadow-[inset_2px_2px_4px_#b0b0b0,inset_-2px_-2px_4px_#fcfcfc]"
              />
            </label>
          ))}

          {/* With Tick */}
          {[1, 2, 3].map((i) => (
            <label
              key={i}
              className="relative grid place-items-center rounded-xl
              border-[7px] border-[#d6d6d6]
              bg-[linear-gradient(145deg,#fcfcfc,#b0b0b0)]
              shadow-[10px_10px_20px_#b0b0b0,-10px_-10px_20px_#fcfcfc]"
            >
              <input
                type="checkbox"
                className="
                peer
                appearance-none
                w-11
                h-11
                rounded
                cursor-pointer
                bg-transparent
                shadow-[inset_-2px_-2px_4px_#b0b0b0,inset_2px_2px_4px_#fcfcfc]
                checked:shadow-[inset_2px_2px_4px_#b0b0b0,inset_-2px_-2px_4px_#fcfcfc]"
              />

              <div
                className="
                absolute
                pointer-events-none
                text-[30px]
                text-[#d6d6d6]
                transition-all
                [text-shadow:-2px_-2px_4px_#fcfcfc,2px_2px_4px_#b0b0b0]
                peer-checked:scale-90
                peer-checked:translate-y-[2px]
                peer-checked:text-[rgb(40,140,80)]"
              >
                ✓
              </div>
            </label>
          ))}
        </div>

        {/* Switches */}
        <div className="flex gap-10 justify-center">

          {["#0319DD", "#4AB230", "#4AB230", "#0319DD"].map(
            (color, index) => (
              <label
                key={index}
                className="relative inline-block w-[100px] h-[44px] cursor-pointer"
              >
                <input type="checkbox" className="peer sr-only" />

                <span
                  className="absolute inset-0 rounded-full
                  shadow-[inset_3px_3px_3px_#b0b0b0,inset_-3px_-3px_3px_-1px_#fcfcfc]"
                />

                <span
                  style={{ backgroundColor: color }}
                  className="
                  absolute
                  left-0
                  top-0
                  h-[44px]
                  w-[44px]
                  rounded-full
                  transition-all
                  duration-200
                  ease-[cubic-bezier(.5,.01,.5,1)]
                  shadow-[inset_2px_2px_3px_rgba(0,0,0,.49),inset_-2px_-2px_3px_rgba(255,255,255,.3)]
                  peer-checked:w-[100px]"
                />

                <span
                  style={{
                    borderColor: "#aaa",
                  }}
                  className="
                  absolute
                  -top-[7px]
                  -left-[7px]
                  h-[58px]
                  w-[58px]
                  rounded-full
                  border-[3px]
                  bg-[#d6d6d6]
                  transition-all
                  duration-200
                  ease-[cubic-bezier(.5,.01,.5,1)]
                  shadow-[2px_2px_3px_rgba(0,0,0,.49),-2px_-2px_3px_rgba(255,255,255,.3)]
                  peer-checked:translate-x-[56px]"
                />
              </label>
            )
          )}
        </div>
      </div>
    </div>
  );
}