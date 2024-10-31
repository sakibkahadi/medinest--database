import { Router } from "express";
import { AmbulanceRoutes } from "../modules/ambulances/ambulances.route";
import { RequestAmbulanceRoutes } from "../modules/RequestAmbulance/RequestAmbulance.route";
import { DoctorRoutes } from "../modules/Doctor/Doctor.route";
import { UserRoutes } from "../modules/User/User.route";
import { AppointmentRoutes } from "../modules/Appointment/Appointment.route";
import { CompanyRoutes, GenericRoutes, MedicineRoutes } from "../modules/Medicine/Medicine.route";
import { DepartmentRoutes } from "../modules/Department/Department.route";

import { PatientRoutes } from "../modules/Patient/Patient.route";
import { AdminRoutes } from "../modules/Admin/Admin.route";
import { ClinicRoutes } from "../modules/Clinic/Clinic.route";
import { SuperAdminRoutes } from "../modules/superAdmin/SuperAdmin.route";
import { BloodBankRoutes } from "../modules/BloodBank/BloodBank.route";
import { PaymentRoutes } from "../modules/Payment/Payment.route";
import { CartRoutes } from "../modules/Cart/Cart.router";

const router = Router();
const moduleRoutes = [
    {
        path: '/ambulances',
        route: AmbulanceRoutes
    }, {
        path:'/requestedAmbulances',
        route: RequestAmbulanceRoutes
    },{
        path:'/departments',
        route: DepartmentRoutes
    },
    {
        path:'/payments',
        route: PaymentRoutes
    },
    {
path:'/carts',
route:CartRoutes

    },
{
    path:'/superAdmins',
    route:SuperAdminRoutes
},
    {
        path:'/bloodBank',
        route:BloodBankRoutes
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
        path:'/medicines',
        route: MedicineRoutes
    },
    {
        path:'/companies',
        route: CompanyRoutes
    },
    {
        path:'/genericName',
        route: GenericRoutes
    },
    
     {
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