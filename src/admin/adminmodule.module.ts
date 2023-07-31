import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminController } from "./admin.controller"
import { AdminService } from "./adminservice.service"
import { AdminEntity } from "./adminentity.entity"
import { MemberEntity } from "src/member/member.entity"
import { MemberService } from "src/member/member.service";
import { AdminCustomerEntity } from "./adminentity.entity"
import { ProductEntity } from "./adminentity.entity"
import { ManagerService } from "src/manager/manager.service";
import { ManagerEntity } from "src/manager/managerentity.entity";
import { MailerModule } from "@nestjs-modules/mailer";


@Module({

  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        ignoreTLS: true,
        secure: true,
        auth: {
          user: 'sudiptasaha610@gmail.com',
          pass: 'auimfbpbzaijfkzt'
        },
      }
    }),
    TypeOrmModule.forFeature([AdminEntity, MemberEntity, AdminCustomerEntity, ManagerEntity, ProductEntity])],
  controllers: [AdminController],
  providers: [AdminService, ManagerService, MemberService],

})

export class AdminModule { }