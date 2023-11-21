import { useState } from 'react';

interface ToggleVehiculoProps {
  setVehiculo:any
  vehiculoActualizado:any
 }

const ToggleVehiculo: React.FC<ToggleVehiculoProps> = ({ setVehiculo, vehiculoActualizado}) => {
  const [isChecked, setChecked] = useState(vehiculoActualizado || false);

  const handleToggle = () => {
    setChecked(!isChecked);
    setVehiculo(!isChecked)
  };

  return (
    <label htmlFor="toggleVehiculo" className="flex items-center cursor-pointer mx-auto my-3">
      <span className="ml-2">No</span>
      <input
        type="checkbox"
        id="toggleVehiculo"
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

export default ToggleVehiculo;