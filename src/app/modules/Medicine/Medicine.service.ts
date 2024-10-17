import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TMedicine, TMedicineCompany, TMedicineGenericName } from "./Medicine.interface";
import { MedicineCompany, MedicineGenericName, MedicineModel } from "./Medicine.model";
import QueryBuilder from "../../builder/Querybuilder";

// create medicine
const createMedicineIntoDB = async (payload: TMedicine) => {
    // Check if a medicine with the same product name exists

   

    const existingMedicine = await MedicineModel.findOne({
      productName: payload.productName,
    });
  
    if (existingMedicine) {
      // Ensure product company and generic name match the existing product
      if (
        existingMedicine.productCompany.toString() !== payload.productCompany.toString() ||
        existingMedicine.genericName.toString() !== payload.genericName.toString()
      ) {
        throw new AppError(400, "Product company and generic name must match the existing product.");
      }
  
      // Only productType and productPower can be different, so you can proceed
    }
  if(payload.quantity > 0){
    payload.isAvailable = true
  }

    // Proceed to create the new medicine if validations pass
    const result = await MedicineModel.create(payload);
  
    return result;
  };
//   delete medicine
const deleteMedicineFromDB = async(id:string)=>{
    const result = await MedicineModel.findByIdAndDelete(id)
    return result
}
const updateMedicineIntoDB = async (id: string, payload: Partial<TMedicine>) => {
    // Find the existing medicine document.
    const isMedicineExists = await MedicineModel.findById(id);
    if (!isMedicineExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'Medicine does not exist');
    }
    if(isMedicineExists.quantity <= 0){
    payload.isAvailable = false
  }
  
    // Update the medicine document.
    const result = await MedicineModel.findByIdAndUpdate(
        id, // Use the id directly
        payload, // The updated fields
        { new: true, runValidators: true } // Return the updated document and run validation
    );

    return result;
};

// get single medicine

const getSingleMedicineFromDb = async(id:string)=>{
    const result = await MedicineModel.findById(id).populate('productCompany').populate('genericName')
    return result;
}

// get all medicine
  
const getAllMedicineFromDB= async(query:Record<string, unknown>)=>{
    const medicineQuery = new QueryBuilder(MedicineModel.find(),query);
    medicineQuery?.search(['productName'])
    const result = await medicineQuery.modelQuery;
    return result
  }

//create medicine Company
const createMedicineCompanyIntoDB = async(payload:TMedicineCompany)=>{
    const isCompanyExists = await MedicineCompany.findOne({companyName:payload.companyName})
    if(isCompanyExists){
        throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Company is already Exist')
    }
    const result = await MedicineCompany.create(payload)
    return result
}
//update medicine company
const updateMedicineCompanyIntoDB = async( id:string, payload:Partial<TMedicineCompany>)=>{
    const isCompanyExists = await MedicineCompany.findById(id)
    if(!isCompanyExists){
        throw new AppError(httpStatus.NOT_FOUND, 'Company is not exist')
    }
    const updatedCompany = payload?.companyName
    
    const result = await MedicineCompany.findByIdAndUpdate(
        { _id: id },
        { companyName:updatedCompany}, // Set the new status
        { new: true }
      );
      return result
}
const deleteMedicineCompanyFromDB = async(id:string)=>{
    const result = await MedicineCompany.findByIdAndDelete(id)
    return result
}
// get all medicine company 
const getAllMedicineCompanyFromDB= async ()=>{
    const result = await MedicineCompany.find()
    return result;
}

//create medicine generic name
const createMedicineGenericNameIntoDB = async(payload:TMedicineGenericName)=>{
    const isGenericNameExist = await MedicineGenericName.findOne({genericName:payload.genericName})
    if(isGenericNameExist){
        throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Generic Name is already Exist')
    }
    const result = await MedicineGenericName.create(payload)
    return result
}
// get all medicine generic name
const getAllMedicineGenericNameFromDB= async ()=>{
    const result = await MedicineGenericName.find()
    return result;
}
const updateGenericNameIntoDB = async( id:string, payload:Partial<TMedicineGenericName>)=>{
    const isGenericNameExists = await MedicineGenericName.findById(id)
    if(!isGenericNameExists){
        throw new AppError(httpStatus.NOT_FOUND, 'GenericName is not exist')
    }
    const updatedGenericName = payload?.genericName
    
    const result = await MedicineGenericName.findByIdAndUpdate(
        { _id: id },
        { genericName:updatedGenericName}, // Set the new status
        { new: true }
      );
      return result
}
const deleteGenericFromDB = async(id:string)=>{
    const result = await MedicineGenericName.findByIdAndDelete(id)
    return result
}
export const MedicineServices = {
    createMedicineIntoDB,getAllMedicineFromDB,getSingleMedicineFromDb, updateMedicineIntoDB, createMedicineCompanyIntoDB,getAllMedicineCompanyFromDB,createMedicineGenericNameIntoDB,getAllMedicineGenericNameFromDB,updateMedicineCompanyIntoDB, deleteMedicineCompanyFromDB, updateGenericNameIntoDB, deleteGenericFromDB,deleteMedicineFromDB
}