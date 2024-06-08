import { useMemo, useState } from 'react'
import FilterBar from './components/FilterBar'
import './App.css'
import Card from './components/Card'

export default function Home() {
  const [shiny, setShiny] = useState(false);
  const [filters, setFilters] = useState({ cat: '', habitat: '', stage: null });

  const shinyFunction = () => { setShiny(prevShiny => !prevShiny); };

  const handleFilterChange = (filterType, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: value
    }));
  };

  return (
    <>
      <label className="relative inline-flex items-center cursor-pointer">
      <input
        className="sr-only peer"
        type="checkbox"
        checked={shiny}
        onChange={shinyFunction}
      />
      <div className="peer rounded-2xl outline-none duration-300 after:duration-300 w-28 h-8 bg-blue-100 peer-focus:outline-none  peer-hover:ring-blue-500  after:content-['NORMAL'] after:absolute after:outline-none after:rounded-xl after:h-8 after:w-28 after:bg-white after:top-1 after:left-1 after:flex after:justify-center after:items-center  after:text-sky-800 after:font-bold peer-checked:after:translate-x-14 peer-checked:after:content-['SHINY'] peer-checked:after:border-white text-xs m-1">
      </div>
    </label>
        <FilterBar   filters={filters}  onFilterChange={handleFilterChange} />
        <Card   shiny={shiny}     filters={filters} />
    </>
  );
}
