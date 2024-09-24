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
    
]

moduleRoutes.forEach((route)=>router.use(route.path, route.route))
export default router