
import  { model, Schema } from "mongoose"
import { TDepartment } from "./Department.interface"


const departmentSchema = new Schema<TDepartment>({
   departmentName: {
    type:String, required:[true,  'Department name is required'], unique:true,
   }, departmentDescription:{
      type:String, required:[true,  'Department description  is required'],
   }
})


export const DepartmentModel = model<TDepartment>('Department', departmentSchema)

