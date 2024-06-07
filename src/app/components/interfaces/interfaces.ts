import { Timestamp } from "firebase/firestore";


export interface Conversation {
  colaborador1: any;
  colaborador2: any;
  conversation: any;
  lastMessageSeenc1: any;
  lastMessageSeenc2: any;
  lastMessageSent: any;
  messagesArray: any;
}

export interface Mensaje {
  content: any;
  conversationId: any;
  emisor: any;
  messageId: any;
  readc1: any;
  readc2: any;
  receptor: any;
  sent: any;
}

export interface MessageListComponentProps {
  conversation: any;
  paramsId: any;
}


export interface Oferta {
  empresa: any,
  publicacion: Timestamp,
  id: any,
  titulo: string,
  cargo: string,
  jornada: string,
  tipoubi: string,
  ubicacion: string,
  descripcion: string,
  experiencia: string,
  adicional: string,
  empresaNombre: string,
  estado: string,
  solicitudes: any;
};


export interface ParamsState {
  id: string | null;
}

export interface Solicitud {
  id: any;
  offerId: any;
  userId: any;
  presentacion: any;
  solicitudId: any;
};

export interface User {
  id: string;
  apellidos: string;
  edad: number;
  genero: string;
  nombre: string;
  ubi: string;
  userEmail: string;
  conversations: any;
  profilepicture: any;
  unreadnotifications: any;
  userType: string;
  posicionesMap: any;
  tel: any;
  DNI: any;
  permiso: any;
  vehiculo: any;
  carta: any;
  NIE: string;
  pais: string;
  anoCreacion: string;
  empleados: any;
  actividad: string;
  web: string;
  email: string;
  linkedin: string;
  descripcion: any;
  departamentos: Array<string>;
}  