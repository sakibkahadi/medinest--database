import { model, Schema } from "mongoose";
import { TMedicine } from "./Medicine.interface";

const medicineSchema = new Schema({
    productName: { type: String, required: true },
    productCompany: { type: String, required: true },
    genericName: { type: String, required: true },
    productType: { type: String, required: true },
    productPower: { type: String, required: true },
    isAvailable: { type: Boolean, required: true, default: true },
    isDeleted: { type: Boolean, required: true, default: false },
    shortDescription: { type: String, required: true },
    longDescription: { type: String, required: true },
    stripSize: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
  });
  
  // Create and export the Mongoose model
export  const MedicineModel = model<TMedicine>('Medicine', medicineSchema);
  
