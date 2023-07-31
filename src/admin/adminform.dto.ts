import{ IsInt, IsNotEmpty, Length,Matches,IsEmail,IsDate} from "class-validator";
import { Type } from 'class-transformer';

export class AdminProfile{

    
    @IsNotEmpty()
    @Length(3,20,{message: "name must be the size of between 3 and 20",})
    uname:string;

    @IsNotEmpty()
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{6,}$/, {
        message:'Password must be equal or more than 6 characters long with at least 1 special character, 1 capital letter, 1 small and 1 digit',
      })
    pass:string;

    @IsEmail()
    email:string;

    @IsNotEmpty()
    address:string;

    @IsDate()
    @Type(() => Date)
    dob:Date;

    filename:string;
    
}

export class AdminCustomer{

  @IsNotEmpty()
  @Length(3,20,{message: "name must be the size of between 3 and 20",})
  name:string;
  
  @IsEmail()
  email:string;

  @IsNotEmpty()
  address:string;


}

export class ProductInfo{

    
  @IsNotEmpty()
  @Length(5,10,{message: "name must be the size of between 5 and 40",})
  ProductName:string;

  @IsNotEmpty({message: "Enter house address:"})
  ProductAdd:string;

  @IsNotEmpty({message:"Enter rent status"})
  ProductStatus: string;

  @IsNotEmpty({message:"Enter rent price: "})
  ProductPrice: number;

}