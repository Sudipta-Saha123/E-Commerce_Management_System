import { AdminEntity } from 'src/admin/adminentity.entity';
import { Entity, Column, PrimaryGeneratedColumn , ManyToOne} from 'typeorm';

@Entity("memberentity")
  export class MemberEntity{

  @PrimaryGeneratedColumn()
  ownid: number;

  @Column()
  ownname: string;

  @Column()
  ownemail: string;

  @Column()
  dob:Date;

  @Column()
  ownaddress: string;

   }