import { TMedicine } from "./Medicine.interface";
import { MedicineModel } from "./Medicine.model";

const createMedicineIntoDB= async (payload:TMedicine)=>{
    const result = await MedicineModel.create(payload)
    return result;
}
export const MedicineServices = {
    createMedicineIntoDB
}