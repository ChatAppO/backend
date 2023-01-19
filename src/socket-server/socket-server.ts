import {
  ConnectedSocket,
  MessageBody,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { OnModuleInit } from '@nestjs/common';

interface MessageInterface {
  type: string;
  value: string;
  fromId: string;
  from: string;
  to: string;
}

interface ActiveUsersInterface {
  socketId: string;
  userName: string;
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketServer implements OnModuleInit, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private messages: MessageInterface[];
  private activeUsers: ActiveUsersInterface[];

  constructor() {
    this.messages = [];
    this.activeUsers = [];
  }

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('Connected with id: ', socket.id);

      // add message to array and later send message history to connected users
      this.messages.push({
        type: 'connection',
        value: '',
        fromId: socket.id,
        from: '',
        to: '',
      });
      this.activeUsers.push({
        socketId: socket.id,
        userName: '',
      });
    });
  }

  handleDisconnect(client: Socket) {
    console.log('Disconnected with id: ', client.id);

    // After disconnect send active users and message
    const disconnectedName = this.getUsernameById(client.id);

    const message = {
      type: 'disconnect',
      value: '',
      fromId: client.id,
      from: disconnectedName,
      to: '',
    };
    this.messages.push(message);

    // remove user from active users
    this.activeUsers = this.activeUsers.filter((user) => {
      if (user.socketId !== client.id) return 1;
      else return 0;
    });

    this.server.emit('onActiveUsers', this.activeUsers);
    this.server.emit('onReceivedGlobalMessage', message);
  }

  //Save username to messages
  @SubscribeMessage('FirstConnection')
  onNewConnection(@MessageBody() body, @ConnectedSocket() client: Socket) {
    // add username for connected user in messages
    this.messages?.forEach((msg) => {
      if (msg.fromId === client.id && msg.type === 'connection') {
        msg.from = body.from;
      }
    });

    // add username for connected user in active users
    this.activeUsers?.forEach((user) => {
      if (user.socketId === client.id) {
        user.userName = body.from;
      }
    });

    // send active users
    this.server.emit('onActiveUsers', this.activeUsers);

    // send all messages from global chat to connected user, without last message about him
    this.server.emit(this.getUsernameById(client.id), {
      messages: this.messages.filter(
        (el, index) => index !== this.messages.length - 1,
      ),
    });

    // send all users message about new connected user
    this.server.emit(
      'onReceivedGlobalMessage',
      this.messages[this.messages.length - 1],
    );
  }

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: any, @ConnectedSocket() client: Socket) {
    console.log('Message', body);

    // add message to array and use for message history
    body.to === 'global' &&
      this.messages.push({
        type: 'message',
        value: body.value,
        fromId: client.id,
        from: body.from,
        to: body.to,
      });

    this.server.emit(
      body.to === 'global' ? 'onReceivedGlobalMessage' : body.to,
      {
        type: 'message',
        value: body.value,
        fromId: client.id,
        from: body.from,
        to: body.to,
      },
    );
  }

  public getUsernameById = (id: string) => {
    for (let i = 0; i < this.activeUsers.length; i++) {
      let user = this.activeUsers[i];
      if (user.socketId === id) return user.userName;
    }
    return "User with given id doesn't exist";
  };
}
