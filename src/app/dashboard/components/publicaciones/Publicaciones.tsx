import React, { FC, useState, useEffect } from 'react';
import PublicationCard from './PublicationCard';

interface PublicacionesProps {
 }

const Publicaciones: FC<PublicacionesProps> = ({ }) => {
  const [receivedPublicaciones, setReceivedPublicaciones] = useState<any[]>([]); // Especifica el tipo de datos que tienes en el array
// esto se supone que son publications de otros usuarios

//aqui un useEffect que tome user del estado, y del mismo un los SEGUIDOS
//Luego, para cada seguido, se debe buscar el publicationsarray
// luego, con cada uno de estos hacemos un superarray de publicaciones, y con el hacemos uno nuevo de objetos, haciendo fetch al collection publicaciones
//luego lo reordenamos segun publication date
// una vez obtenido y reordenado, se pasa a publicationcard la info a renderizar

  return (
    <div>
      {receivedPublicaciones.map((publicacion, index) => (
        <PublicationCard key={index} publicacion={publicacion} />
      ))}
    </div>
  );
};

export default Publicaciones;
