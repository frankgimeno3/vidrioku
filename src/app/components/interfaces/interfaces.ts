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
  titulo: any,
  cargo: any,
  jornada: any,
  tipoubi: any,
  ubicacion: any,
  descripcion: any,
  experiencia: any,
  adicional: any,
  empresa: any,
  estado: any,
  id: any
  publicacion: Timestamp,
};


export interface ParamsState {
  id: string | null;
}

export interface Solicitud {
  id: string;
  offerId: string;
  userId: string;
  presentacion: any;
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
  pais:string;
     anoCreacion: string;
    empleados: any;
    actividad: string;
     web: string;
    email: string;
     linkedin: string;
    descripcion: any;
    departamentos: Array<string>;
}  