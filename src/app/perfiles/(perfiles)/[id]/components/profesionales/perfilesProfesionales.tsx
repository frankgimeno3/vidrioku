import React, { FC } from 'react';

interface perfilesProfesionalesProps {
  id:any
}

const perfilesProfesionales: FC<perfilesProfesionalesProps> = ({id }) => {
  return (
    <div>perfilesProfesionales  {id}</div>
  );
};

export default perfilesProfesionales;