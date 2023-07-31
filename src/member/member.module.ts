import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MemberEntity } from "./member.entity";



@Module({
    imports: [TypeOrmModule.forFeature([MemberEntity])],
    controllers: [],
    providers: [],

})

export class OwnerModule { }