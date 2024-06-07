
  
  export interface Conversation {
    colaborador1: any;
    colaborador2: any;
    conversationId: any;
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
  
  export interface ParamsState {
    id: string | null;
  }
  
  export interface User {
    id: any;
    apellidos: string;
    edad: number;
    genero: string;
    nombre: string;
    ubi: string;
    userEmail: string;
    conversations: any;
    profilepicture:any;
    unreadnotifications:any;
  }