import { UserRepository } from './user.repository';
import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { DatabaseModule } from "src/Database/Database.module";
import { User, UserSchema } from "./model/user.schema";
import { UserService } from "./user.service";

@Module({
    imports: [
        DatabaseModule.forFeature([
            { name: User.name, schema: UserSchema}
        ])
    ],
    controllers: [UserController],
    providers: [UserService, UserRepository],
    exports: [UserRepository],
})
export class UserModule {}