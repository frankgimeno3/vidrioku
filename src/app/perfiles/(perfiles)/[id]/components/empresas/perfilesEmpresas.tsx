import React, { FC } from 'react';

interface perfilesEmpresasProps {
  id:any
}

const perfilesEmpresas: FC<perfilesEmpresasProps> = ({id }) => {
  return (
    <div>perfilesEmpresas {id}</div>
  );
};

export default perfilesEmpresas;