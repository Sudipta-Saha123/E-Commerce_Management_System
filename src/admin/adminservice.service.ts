import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManagerEntity } from "src/manager/managerentity.entity";
import { AdminEntity } from "./adminentity.entity";
import { MemberEntity } from "src/member/member.entity";
import { AdminCustomerEntity } from "./adminentity.entity";
import { ProductEntity } from "./adminentity.entity";
import { MemberFormDTO } from "src/member/member.dto";
import { AdminProfile } from "./adminform.dto";
import { ProductInfo } from "./adminform.dto";
import { ManagerFormDTO } from "src/manager/managerform.dto";
import * as bcrypt from 'bcrypt';
import { MailerService } from "@nestjs-modules/mailer/dist";

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(AdminEntity)
        private adminRepo: Repository<AdminEntity>,
        private mailerService: MailerService,
        @InjectRepository(MemberEntity)
        private memberRepo: Repository<MemberEntity>,
        @InjectRepository(AdminCustomerEntity)
        private ownerRepo: Repository<AdminCustomerEntity>,
        @InjectRepository(ProductEntity)
        private productRepo: Repository<ProductEntity>,
        @InjectRepository(ManagerEntity)
        private managerRepo: Repository<ManagerEntity>
    ) { }

    //Search Customer

    getCustomerByID(id): any {

        return this.ownerRepo.findOneBy({ id });
    }

    getCustomerByIDName(qry): any {

        return this.ownerRepo.findOneBy({ id: qry.id, name: qry.name });

    }

   //Insert Admin

async insertAdmin(mydto) {
    const salt = await bcrypt.genSalt();
    const hassedpassed = await bcrypt.hash(mydto.pass, salt);
    mydto.pass= hassedpassed;
     return this.adminRepo.save(mydto);
    }

     //Update Admin

     updateAdmin(uname, id): any {
        console.log(uname + id);
        return this.adminRepo.update(id, { uname: uname });
    }

    updateAdminbyid(mydto: AdminProfile, id): any {
        return this.adminRepo.update(id, mydto);
    }

    //Delete Admin

    deleteAdminbyid(id): any {

        return this.adminRepo.delete(id);
    }

    //Search Member

    getMemberByID(ownid): any {

        return this.memberRepo.findOneBy({ ownid });
    }

    getMemberByIDName(qry): any {

        return this.memberRepo.findOneBy({ ownid: qry.ownid, ownname: qry.ownname });

    }

    //Search Manager

    getManagerByID(id): any {

        return this.managerRepo.findOneBy({ id });
    }

    getManagerByIDName(qry): any {

        return this.managerRepo.findOneBy({ id: qry.id, name: qry.name });
    }

    // Update Manager

    updateManager(name, id): any {
        console.log(name + id);
        return this.managerRepo.update(id, { name: name });
    }

    updateManagerbyid(mydto: ManagerFormDTO, id): any {
        return this.managerRepo.update(id, mydto);
    }
    
    //View All managers
    getManagersByAdminID(id): any {
        return this.adminRepo.find({
            where: { id: id },
            relations: {
                managers: true,
            },
        });
    }


    // Signup

    async signup(mydto) {
        const salt = await bcrypt.genSalt();
        const hassedpassed = await bcrypt.hash(mydto.pass, salt);
        mydto.pass = hassedpassed;
        return this.adminRepo.save(mydto);
    }
    //Signin

    async signin(mydto) {
        console.log(mydto.pass);
        const mydata = await this.adminRepo.findOneBy({ email: mydto.email });
        const isMatch = await bcrypt.compare(mydto.pass, mydata.pass);
        if (isMatch) {
            return 1;
        }
        else {
            return 0;
        }

    }


    //Delete Manager

    deleteManagerbyid(id): any {

        return this.managerRepo.delete(id);
    }
    
    // Update Product company

    updateProduct(ownname, ownid): any {
        console.log(ownname + ownid);
        return this.memberRepo.update(ownid, { ownname: ownname });
    }

    updateProductbyid(mydto: MemberEntity, ownid): any {
        return this.memberRepo.update(ownid, mydto);
    }


    //Delete product company

    deleteProductOwnerbyid(ownid): any {

        return this.memberRepo.delete(ownid);
    }


    
    //Forget password
    updatePassword(pass, id): any {
        console.log(pass + id);
        return this.adminRepo.update(id, { pass: pass });
    }

    async updatePasswordByID(mydto: AdminProfile, id) {
        const salt = await bcrypt.genSalt();
        const hassedpassed = await bcrypt.hash(mydto.pass, salt);
        mydto.pass = hassedpassed;
        return this.adminRepo.update(id, mydto);
    }

    //Insert product
    insertProduct(mydto: ProductEntity): any {

        const productaccount = new ProductEntity()
        productaccount.ProductName = mydto.ProductName;
        productaccount.ProductAdd = mydto.ProductAdd;
        productaccount.ProductStatus = mydto.ProductStatus;
        productaccount.ProductPrice = mydto.ProductPrice;
        return this.productRepo.save(productaccount);
    }

    //Update product
    updateproduct(ProductName, id): any {
        console.log(ProductName + id);
        return this.productRepo.update(id, { ProductName: ProductName });
    }

    updateProductByID(mydto: ProductEntity, id): any {
        return this.productRepo.update(id, mydto);
    }

    //Search product
    getProductByID(id): any {

        return this.productRepo.findOneBy({ id });
    }
    getProductByIDName(qry): any {

        return this.productRepo.findOneBy({ id: qry.id, ProductName: qry.ProductName });
    }

    //Delete Product

        deleteProductbyid(id): any {

            return this.productRepo.delete(id);
        }
    
    //View Profile
    getProfile(): string {
        return "This is Admin Profile";

    }

    //Send Email
    async sendEmail(mydata) {
        return await this.mailerService.sendMail({
            to: "asgorreaj@gmail.com",
            subject: "hlw User i am your Admin",
            text: "this is a ecommerce site",
        });

    }

}