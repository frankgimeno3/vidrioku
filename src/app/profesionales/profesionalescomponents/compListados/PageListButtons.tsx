import { FC } from 'react';

const PageListButtons: FC = () => {
  return (
    <div className="flex flex-row justify-end items-center   px-2 ">
      <button className='px-3 py-1 rounded-lg shadow-xl text-gray-600 bg-white mx-2 hover:bg-gray-100'>1</button>
      <button className='px-3 py-1 rounded-lg shadow-xl text-gray-600 bg-white mx-2 hover:bg-gray-100'>2</button>
      <button className='px-3 py-1 rounded-lg shadow-xl text-gray-600 bg-white mx-2 hover:bg-gray-100'>3</button>
      <button className='px-3 py-1 rounded-lg shadow-xl text-gray-600 bg-white mx-2 hover:bg-gray-100'>4</button>
      <button className='px-3 py-1 rounded-lg shadow-xl text-gray-600 bg-white mx-2 hover:bg-gray-100'>5</button>
      <button className='px-3 py-1 rounded-lg shadow-xl text-gray-600 bg-white mx-2 hover:bg-gray-100'>6</button>
    </div>
  );
};

export default PageListButtons;