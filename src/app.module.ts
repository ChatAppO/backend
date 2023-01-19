import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {SocketServerModule} from "./socket-server/socket-server.module";

@Module({
  imports: [SocketServerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
