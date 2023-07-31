import { AdminEntity } from 'src/admin/adminentity.entity';
import { Entity, Column, PrimaryGeneratedColumn , ManyToOne} from 'typeorm';

@Entity("managerentity")
   export class ManagerEntity{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  address: string;


  @ManyToOne(() => AdminEntity, (admin) => admin.managers)
    admin: AdminEntity

   }