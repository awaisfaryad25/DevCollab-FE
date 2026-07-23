import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'

const inputClass = "w-full px-4 py-2.5 4xl:py-3 rounded-lg border border-[#EAECF3] focus:border-[#013A8D] focus:ring-0 outline-none transition-all duration-300 bg-white placeholder:text-xs 4xl:placeholder:text-sm"
const labelClass = "block text-sm font-medium text-gray-700 mb-1"

type SearchableDropdownProps = {
  id: string
  name: string
  label: string
  placeholder: string
  options: string[]
}

const SearchableDropdown = ({ id, name, label, placeholder, options }: SearchableDropdownProps) => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState('')
  const wrapperRef = useRef<HTMLDivElement>(null)

  const filtered = options.filter((option) =>
    option.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
        setSearch('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={wrapperRef} className="relative">
      <label htmlFor={id} className={labelClass}>{label}</label>

      <button
        type="button"
        id={id}
        onClick={() => setOpen((prev) => !prev)}
        className={`${inputClass} flex items-center justify-between text-left ${!selected ? 'text-gray-400' : ''}`}
      >
        <span className="text-sm truncate">{selected || placeholder}</span>
        <ChevronDown className={`size-4 shrink-0 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      <input type="hidden" name={name} value={selected} required />

      {open && (
        <div className="absolute z-20 mt-1 w-full bg-white border border-[#EAECF3] rounded-lg shadow-lg overflow-hidden">
          <input
            type="text"
            autoFocus
            placeholder={`Search ${label.toLowerCase()}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 text-sm border-b border-[#EAECF3] outline-none"
          />

          <ul className="max-h-48 overflow-y-auto">
            {filtered.length > 0 ? (
              filtered.map((option) => (
                <li key={option}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelected(option)
                      setOpen(false)
                      setSearch('')
                    }}
                    className="w-full flex items-center justify-between px-4 py-2 text-sm text-left hover:bg-[#F7FAFC] transition-colors"
                  >
                    <span className="truncate">{option}</span>
                    {selected === option && <Check className="size-4 shrink-0 text-brand-blue" />}
                  </button>
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-sm text-gray-400">No results found.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

export default SearchableDropdown