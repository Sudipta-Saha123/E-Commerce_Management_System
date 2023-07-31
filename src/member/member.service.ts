import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MemberFormDTO } from "./member.dto";
import { MemberEntity } from "./member.entity";


@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(MemberEntity)
    private ownRepo: Repository<MemberEntity>,
  ) { }


  insertMember(mydto: MemberFormDTO): any {

    return this.ownRepo.save(mydto);

  }



}