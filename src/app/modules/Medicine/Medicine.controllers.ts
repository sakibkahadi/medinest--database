import httpStatus from "http-status"
import sendResponse from "../../utils/sendResponse"
import catchAsync from "../../utils/catchAsync"
import { MedicineServices } from "./Medicine.service"


const createMedicine = catchAsync(async (req,res)=>{

    const result = await MedicineServices.createMedicineIntoDB(req.body)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: 'Medicine Created Successfully',
        data:result
    })
})
// const getAllDoctors = catchAsync(async (req,res)=>{
    
//     const result = await DoctorServices.getAllDoctorsFromDB()
//     sendResponse(res,{
//         statusCode:httpStatus.OK,
//         success:true,
//         message: 'Doctors  are retrieved Successfully',
//         data:result
//     })
// })


export const MedicineControllers = {
    createMedicine, 
}