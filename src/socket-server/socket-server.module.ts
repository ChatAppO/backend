import {Module} from "@nestjs/common";
import {SocketServer} from "./socket-server";

@Module({
    providers: [SocketServer]
})
export class SocketServerModule {
}