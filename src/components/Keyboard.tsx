import React from 'react'

export default function Keyboard() {
  return (
    <div className="fixed inset-x-0 bottom-0 bg-gray-100 p-4 gap-x-1">
      <div className="flex justify-center gap-1 mb-2">
        <button
          className="border-2 w-10 h-10 text-xl md:w-12 md:h-12 md:text-3xl bg-slate-400"
          data-key="Q"
        >
          Q
        </button>
        <button
          className="border-2 w-10 h-10 text-xl md:w-12 md:h-12 md:text-3xl bg-slate-400"
          data-key="W"
        >
          W
        </button>
        <button
          className="border-2 w-10 h-10 text-xl md:w-12 md:h-12 md:text-3xl bg-slate-400"
          data-key="E"
        >
          E
        </button>
        <button
          className="border-2 w-10 h-10 text-xl md:w-12 md:h-12 md:text-3xl bg-slate-400"
          data-key="R"
        >
          R
        </button>
        <button
          className="border-2 w-10 h-10 text-xl md:w-12 md:h-12 md:text-3xl bg-slate-400"
          data-key="T"
        >
          T
        </button>
        <button
          className="border-2 w-10 h-10 text-xl md:w-12 md:h-12 md:text-3xl bg-slate-400"
          data-key="Y"
        >
          Y
        </button>
        <button
          className="border-2 w-10 h-10 text-xl md:w-12 md:h-12 md:text-3xl bg-slate-400"
          data-key="U"
        >
          U
        </button>
        <button
          className="border-2 w-10 h-10 text-xl md:w-12 md:h-12 md:text-3xl bg-slate-400"
          data-key="I"
        >
          I
        </button>
        <button
          className="border-2 w-10 h-10 text-xl md:w-12 md:h-12 md:text-3xl bg-slate-400"
          data-key="O"
        >
          O
        </button>
        <button
          className="border-2 w-10 h-10 text-xl md:w-12 md:h-12 md:text-3xl bg-slate-400"
          data-key="P"
        >
          P
        </button>
      </div>
      <div className="space-x-2"> </div>
      <div className="flex justify-center gap-1 mb-2">
        <button className="border-2 size-12 text-3xl bg-slate-400" data-key="A">
          A
        </button>
        <button className="border-2 size-12 text-3xl bg-slate-400" data-key="S">
          S
        </button>
        <button className="border-2 size-12 text-3xl bg-slate-400" data-key="D">
          D
        </button>
        <button className="border-2 size-12 text-3xl bg-slate-400" data-key="F">
          F
        </button>
        <button className="border-2 size-12 text-3xl bg-slate-400" data-key="G">
          G
        </button>
        <button className="border-2 size-12 text-3xl bg-slate-400" data-key="H">
          H
        </button>
        <button className="border-2 size-12 text-3xl bg-slate-400" data-key="J">
          J
        </button>
        <button className="border-2 size-12 text-3xl bg-slate-400" data-key="K">
          K
        </button>
        <button className="border-2 size-12 text-3xl bg-slate-400" data-key="L">
          L
        </button>
      </div>
      <div className="space-x-2"> </div>
      <div className="flex justify-center gap-1 mb-2">
        <button className="border-2 h-12 w-24 text-3xl bg-slate-400" data-enter>
          Enter
        </button>
        <button className="border-2 size-12 text-3xl bg-slate-400" data-key="Z">
          Z
        </button>
        <button className="border-2 size-12 text-3xl bg-slate-400" data-key="X">
          X
        </button>
        <button className="border-2 size-12 text-3xl bg-slate-400" data-key="C">
          C
        </button>
        <button className="border-2 size-12 text-3xl bg-slate-400" data-key="V">
          V
        </button>
        <button className="border-2 size-12 text-3xl bg-slate-400" data-key="B">
          B
        </button>
        <button className="border-2 size-12 text-3xl bg-slate-400" data-key="N">
          N
        </button>
        <button className="border-2 size-12 text-3xl bg-slate-400" data-key="M">
          M
        </button>
        <button
          className=" flex items-center justify-center border-2 h-12 w-24 bg-slate-400"
          data-delete
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
          >
            <path
              fill="var(--color-tone-1)"
              d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
