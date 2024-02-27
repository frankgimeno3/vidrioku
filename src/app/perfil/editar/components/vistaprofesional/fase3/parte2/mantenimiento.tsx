import React, { FC, useState } from 'react'

interface mantenimientoProps {
    user: any;
    cambioComponenteMostrar: any;
  }
  
  const mantenimiento: FC<mantenimientoProps> = ({ user, cambioComponenteMostrar }) => {
  return (
    <div>mantenimiento</div>
  )
}

export default mantenimiento