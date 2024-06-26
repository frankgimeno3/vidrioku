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
  empresaNombre: string,
  publicacion: Timestamp,
  id: any,
  titulo: string,
  cargo: string,
  jornada: string,
  tipoubi: string,
  ubicacion: string,
  descripcion: string,
  experiencia: any,
  adicional: string,
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
  actividad: string;
  anoCreacion: string;
  apellidos: string;
  carta: any;
  conversations: any;
  descripcion: any;
  departamentos: Array<string>;
  DNI: any;
  email: string;
  empleados: any;
  edad: number;
  genero: string;
  linkedin: string;
  mensajesnoleidos: any;
  NIE: string;
  nombre: string;
  ofertascreadas: any;
  pais: string;
  permiso: any;
  posicionesMap: any;
  profilepicture: any;
  readnotifications: any;
  seguidos: any;
  solicitudes: any;
  solicitudesAceptadasNoLeidas: any;
  solicitudesnocontestadas: any;
  tel: any;
  ubi: string;
  unreadnotifications: any;
  userEmail: string;
  userType: string;
  vehiculo: any;
  web: string;
}  