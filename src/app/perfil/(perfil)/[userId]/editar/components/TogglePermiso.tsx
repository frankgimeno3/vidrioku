import { useState } from 'react';

interface TogglePermisoProps {
  setPermiso: any
}

const TogglePermiso: React.FC<TogglePermisoProps> = ({ setPermiso}) => {
  const [isChecked, setChecked] = useState(false);

  const handleToggle = () => {
    setChecked(!isChecked);
    setPermiso(isChecked)
  };

  return (
    <label htmlFor="togglePermiso" className="flex items-center cursor-pointer mx-auto my-3">
      <span className="ml-2">No</span>
      <input
        type="checkbox"
        id="togglePermiso"
        className="hidden"
        checked={isChecked}
        onChange={handleToggle}
      />
      <div className={`mx-4 relative w-12 h-6  rounded-full transition-all duration-300 ${isChecked ? 'bg-blue-500' : 'bg-gray-300'}`}>
        <div className={`absolute left-0 w-6 h-6 bg-white rounded-full transform ${isChecked ? 'translate-x-full' : 'translate-x-0'} transition-all duration-300`}></div>
      </div>
      <span className="ml-2">Sí</span>
    </label>
  );
};

export default TogglePermiso;