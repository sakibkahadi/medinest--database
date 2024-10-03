import { AdminModel } from "./Admin.model";

const getAllAdminFromDB = async () => {

    const result = await AdminModel.find()
    return result;
  };
  
  export const AdminServices = {
  
    getAllAdminFromDB,
  };
  