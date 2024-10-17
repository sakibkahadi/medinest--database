import { model, Schema } from "mongoose";
import { TMedicine, TMedicineCompany, TMedicineGenericName } from "./Medicine.interface";

const medicineSchema = new Schema<TMedicine>({

    productImage: { type: String, required: true },
    productName: { type: String, required: true },
    productCompany: { type: Schema.Types.ObjectId, ref: 'Medicine-Company',
       },
    genericName: { type: Schema.Types.ObjectId, ref: 'Medicine-Generic-Name',
    },
    productType: { type: String, required: true },
    productPower: { type: String, required: true },
    isAvailable: { type: Boolean, required: true, default: true },
    isDeleted: { type: Boolean, required: true, default: false },
    shortDescription: { type: String, required: true },
    longDescription: { type: String, required: true },
    stripSize: { type: String, required: true },
    unitPrice: { type: String, required: true },
    quantity: {type:Number, }
  });
  

  const medicineCompanySchema = new Schema<TMedicineCompany>({
    companyName:{
      type:String
    }
  })

  const medicineGenericNameSchema = new Schema<TMedicineGenericName>({
    genericName:{type:String}
  })


//create and export medicine company model
export const MedicineCompany = model<TMedicineCompany>('Medicine-Company', medicineCompanySchema )

//create and export medicine company model
export const MedicineGenericName = model<TMedicineGenericName>('Medicine-Generic-Name', medicineGenericNameSchema )

  // Create and export the Mongoose model
export  const MedicineModel = model<TMedicine>('Medicine', medicineSchema);
  
