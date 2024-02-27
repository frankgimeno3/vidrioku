import React, { FC, useState } from 'react'

interface operarioProps {
    user: any;
    cambioComponenteMostrar: any;
  }
  
  const operario: FC<operarioProps> = ({ user, cambioComponenteMostrar }) => {
  return (
    <div>operario</div>
  )
}

export default operario