import { Router } from "express";
import { AmbulanceRoutes } from "../modules/ambulances/ambulances.route";
import { RequestAmbulanceRoutes } from "../modules/RequestAmbulance/RequestAmbulance.route";
import { DoctorRoutes } from "../modules/Doctor/Doctor.route";
import { UserRoutes } from "../modules/User/User.route";
import { AppointmentRoutes } from "../modules/Appointment/Appointment.route";
import { MedicineRoutes } from "../modules/Medicine/Medicine.route";
import { DepartmentRoutes } from "../modules/Department/Department.route";
import { NurseRoutes } from "../modules/Nurse/Nurse.route";
import { PatientRoutes } from "../modules/Patient/Patient.route";
import { AdminRoutes } from "../modules/Admin/Admin.route";
import { ClinicRoutes } from "../modules/Clinic/Clinic.route";
const router = Router();
const moduleRoutes = [
    {
        path: '/ambulances',
        route: AmbulanceRoutes
    }, {
        path:'/requestedAmbulance',
        route: RequestAmbulanceRoutes
    },{
        path:'/departments',
        route: DepartmentRoutes
    },

    
    
    {
        path:'/doctors',
        route:  DoctorRoutes
    },{
        path:'/users',
        route:UserRoutes
    },
    {
        path:'/appointments',
        route: AppointmentRoutes
    },
    {
        path:'/medicine',
        route: MedicineRoutes
    },
    {
        path:'/nurses',
        route:NurseRoutes
    }, {
        path:'/patients',
        route:PatientRoutes 
    }
    
    ,{
        path:'/admins',
        route:AdminRoutes 
    },{
        path:'/clinics',
        route:ClinicRoutes
    }
    
]

moduleRoutes.forEach((route)=>router.use(route.path, route.route))
export default router