import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(true);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
    if (e.target.checked) {
      navigate('/'); // Navigate to the "/edit" route if the checkbox is checked
    } else {
      navigate('/edit'); // Navigate to the "/" (list) route if the checkbox is unchecked
    }
  };

  return (
    <label className="inline-flex items-center cursor-pointer container fixed top-0 left-0  bg-slate-600 bg-opacity-30 backdrop-filter backdrop-blur-md min-w-full w-8 z-1">
      <input
        className="sr-only peer"
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <div className="peer rounded-2xl outline-none duration-300 after:duration-300 w-28 h-8 bg-blue-100 peer-focus:outline-none  peer-hover:ring-blue-500  after:content-['EDT'] after:absolute after:outline-none after:rounded-xl after:h-8 after:w-12 after:bg-white after:top-1 after:left-1 after:flex after:justify-center after:items-center  after:text-sky-800 after:font-bold peer-checked:after:translate-x-14 peer-checked:after:content-['LST'] peer-checked:after:border-white text-sm m-1">
      </div>
    </label>
  );
};

export default Navbar;
