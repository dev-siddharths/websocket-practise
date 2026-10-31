import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
interface JoinRoomPayload {
  roomId: string;
}
interface SendMessagePayload {
  roomId: string;
  message: string;
}
interface LeaveRoomPayload {
  roomId: string;
}
@WebSocketGateway() //registers the class as gateway
export class ChatGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('message')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: unknown,
  ): void {
    // client.broadcast.emit('newMessage', payload);
    this.server.emit('newMessageToAll', payload);
  }

  @SubscribeMessage('joinRoom')
  handleMessageRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: JoinRoomPayload,
  ): void {
    const roomId = payload.roomId;
    client.join(roomId);
  }

  @SubscribeMessage('sendToRoom')
  handleSendToRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: SendMessagePayload,
  ): void {
    const roomId = payload.roomId;
    this.server.to(roomId).emit('newMessageToRoom', payload);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: LeaveRoomPayload,
  ): void {
    const roomId = payload.roomId;
    client.leave(roomId);
  }
}
