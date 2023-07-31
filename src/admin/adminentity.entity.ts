import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ManagerEntity } from 'src/manager/managerentity.entity';
import { MemberEntity } from 'src/member/member.entity';

@Entity("admin")
export class AdminEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uname: string;

  @Column()
  pass: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column()
  dob: Date;

  @Column()
  filename: string;


  @OneToMany(() => ManagerEntity, (manager) => manager.admin)
  managers: ManagerEntity[]



}


@Entity("admincustomer")
export class AdminCustomerEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  address: string;

}


@Entity("productinfo")
export class ProductEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ProductName: string;

  @Column()
  ProductAdd: string;

  @Column()
  ProductStatus: string;

  @Column()
  ProductPrice: number;

}

