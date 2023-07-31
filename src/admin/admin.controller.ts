import { Body, Controller, Delete, Get, Param, Post, Put, Patch, Query, Session, UseGuards, ParseFilePipe, ParseIntPipe, ParseFloatPipe, UsePipes, ValidationPipe, UseInterceptors, UploadedFile, MaxFileSizeValidator, FileTypeValidator } from "@nestjs/common";
import { ManagerFormDTO } from 'src/manager/managerform.dto';
import { ManagerService } from 'src/manager/manager.service';
import { MemberFormDTO } from "src/member/member.dto";
import { MemberService } from "src/member/member.service";
import { AdminProfile } from "./adminform.dto";
import { ProductInfo } from "./adminform.dto";
import { AdminService } from "./adminservice.service";
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { SessionGuard } from './session.guard';
import { ProductEntity } from "./adminentity.entity";




@Controller("/admin")

export class AdminController {
  constructor(private adminService: AdminService,
    private managerService: ManagerService,
    private MemberService: MemberService
  ) { }

  // Insert Manager
  @Post("/insertmanager")
  @UsePipes(new ValidationPipe())
  insertManager(@Body() mydto: ManagerFormDTO): any {
    return this.managerService.insertManager(mydto);
  }
  
  // Update Manager
  @Put("/updatemanager/")
  @UsePipes(new ValidationPipe())
  updateManager(
    @Body("name") name: string,
    @Body("id") id: number
  ): any {
    return this.adminService.updateManager(name, id);
  }
  @Put("/updatemanager/:id")
  updateManagerbyid(
    @Body() mydto: ManagerFormDTO,
    @Param("id", ParseIntPipe) id: number
  ): any {
    return this.adminService.updateManagerbyid(mydto, id);
  }

  //Delete Manager

  @Delete("/deletemanager/:id")
  deleteManagerbyid(
    @Param("id", ParseIntPipe) id: number
  ): any {
    return this.adminService.deleteManagerbyid(id);
  }

  //Search Manager by id

  @Get("/findmanager/:id")
  getManagerByID(@Param("id", ParseFloatPipe) id: number): any {
    return this.adminService.getManagerByID(id);
  }
  @Get("/findmanager")
  getManagerByIDName(@Query() qry: any): any {
    return this.adminService.getManagerByIDName(qry);
  }

  // View All managers


    @Get('/findmanagersbyadmin/:id')
    getManagerByAdminID(@Param('id', ParseIntPipe) id: number): any {
      return this.adminService.getManagersByAdminID(id);
    }
  
    @Get('/findadminbymanager/:id')
    getAdminByManagerID(@Param('id', ParseIntPipe) id: number): any {
      return this.managerService.getAdminByManagerID(id);
    }
  
  // Insert any Product Company
  @Post("/insertowner")
  @UsePipes(new ValidationPipe())
  insertProductCompany(@Body() mydto: MemberFormDTO): any {
    return this.MemberService.insertMember(mydto);
 
  }

  //Update any product company

  @Put("/updateowner/")
  @UsePipes(new ValidationPipe())
  updateProduct(
    @Body("ownname") ownname: string,
    @Body("ownid") ownid: number
  ): any {
    return this.adminService.updateProduct(ownname, ownid);
  }

  @Put("/updateowner/:ownid")
  updateProductbyid(
    @Body() mydto: MemberFormDTO,
    @Param("ownid", ParseIntPipe) ownid: number
  ): any {
    return this.adminService.updateProductbyid(mydto, ownid);
  } 


  //Search product compny
  @Get("/findowner/:ownid")
  getMemberByID(@Param("custid", ParseFloatPipe) ownid: number): any {
    return this.adminService.getMemberByID(ownid);
  }

  @Get("/findowner")
  getMemberByIDName(@Query() qry: any): any {
    return this.adminService.getMemberByIDName(qry);
  }



  //Delete product company

  @Delete("/deleteowner/:ownid")
  deleteProductOwnerbyid(
    @Param("ownid", ParseIntPipe) ownid: number
  ): any {
    return this.adminService.deleteProductbyid(ownid);
  }
  
  //Signup
  @Post('/signup')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('filename',
    {
      storage: diskStorage({
        destination: './uploads',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname)
        }
      })
    }))
  signup(@Body() mydto: AdminProfile, @UploadedFile(new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize: 160000 }),
      new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
    ],
  }),) file: Express.Multer.File): any {

    mydto.filename = file.filename;

    return this.adminService.signup(mydto);

  }

  //Sign in

  @Get('/signin')
  signin(@Session() session, @Body() mydto: AdminProfile) {
    if (this.adminService.signin(mydto)) {
      session.email = mydto.email;

      console.log(session.email);
      return { message: "success" };

    }
    else {
      return { message: "invalid credentials" };
    }

  }

  //Signout

  @Get('/signout')
  signout(@Session() session) {
    if (session.destroy()) {
      return { message: "you are logged out" };
    }
    else {
      throw new UnauthorizedException("invalid actions");
    }
  }


  // Forget Password 
  @Patch("/forgetpassword/")
  @UsePipes(new ValidationPipe())
  updatePassword(
    @Body("pass") pass: string,
    @Body("id") id: number
  ): any {
    return this.adminService.updatePassword(pass, id);
  }
  @Patch("/forgetpassword/:id")
  updatePasswordByID(
    @Body() mydto: AdminProfile,
    @Param("id", ParseIntPipe) id: number
  ): any {
    return this.adminService.updatePasswordByID(mydto, id);
  }
 

    //Insert product
    @Post("/insertproduct")
    @UsePipes(new ValidationPipe())
    insertCar(@Body() mydto: ProductEntity): any {
      return this.adminService.insertProduct(mydto);
    }

    //Update Product
  @Put("/updateproduct/")
  @UsePipes(new ValidationPipe())
  updateCar(
    @Body("productname") productname: string,
    @Body("id") id: number
  ): any {
    return this.adminService.updateProduct(productname, id);
  }
  @Put("/updateproduct/:id")
  updateCarByID(
    @Body() mydto: ProductEntity,
    @Param("id", ParseIntPipe) id: number
  ): any {
    return this.adminService.updateProductByID(mydto, id);
  }

  //Search product
  @Get("/findproduct/:id")
  getCarByID(@Param("id", ParseIntPipe) id: number): any {
    return this.adminService.getProductByID(id);
  }

  @Get("/findproduct")
  getCarByIDName(@Query() qry: any): any {
    return this.adminService.getProductByIDName(qry);
  }
  
  //Delete product

  @Delete("/deleteproduct/:id")
  deleteProductbyid(
    @Param("id", ParseIntPipe) id: number
  ): any {
    return this.adminService.deleteProductbyid(id);
  }
  
  //Search Customer
    @Get("/findcustomer/:id")
    getCustomerByID(@Param("id", ParseFloatPipe) id: number): any {
      return this.adminService.getCustomerByID(id);
    }
    @Get("/findcustomer")
    getCustomerByIDName(@Query() qry: any): any {
      return this.adminService.getCustomerByIDName(qry);
    }

    //Insert Admin
    @Post("/insertadmin")
    @UsePipes(new ValidationPipe())
    insertAdmin(@Body() mydto:AdminProfile):any{
    return this.adminService.insertAdmin(mydto);
  }

   //Update Admin

   @Put('/updateadmin/')
   @UseGuards(SessionGuard)
   @UsePipes(new ValidationPipe())
   updateAdmin(@Session() session, @Body('uname') uname: string): any {
     console.log(session.email);
     return this.adminService.updateAdmin(uname, session.email);
   }
 
   @Put('/updateadmin/:id')
   @UsePipes(new ValidationPipe())
   updateAdminbyid(
     @Body() mydto: AdminProfile,
     @Param('id', ParseIntPipe) id: number,
   ): any {
     return this.adminService.updateAdminbyid(mydto, id);
   }
   
   //Delete Admin
 
   @Delete("/deleteadmin/:id")
   deleteAdminbyid(
     @Param("id", ParseIntPipe) id: number
   ): any {
     return this.adminService.deleteAdminbyid(id);
   }


  //View Profile
  @Get("/Profile")
  getAdmin(): any {
    return this.adminService.getProfile();
  }

  //Send Email

  @Post('/sendemail')
  sendEmail(@Body() mydata) {
    return this.adminService.sendEmail(mydata);
  }
}