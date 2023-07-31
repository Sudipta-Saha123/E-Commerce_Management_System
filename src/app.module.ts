import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/adminmodule.module';
import { ManagerModule } from './manager/manager.module';

@Module({
  imports: [AdminModule, ManagerModule, TypeOrmModule.forRoot(
    { type: 'postgres',
     host: 'localhost',
     port: 5432,
     username: 'postgres',
     password: 'sudipta',
     database: 'E_Commerce',
     autoLoadEntities: true,
     synchronize: true,
   }
   ),],
  controllers: [],
  providers: [],
})
export class AppModule {}
