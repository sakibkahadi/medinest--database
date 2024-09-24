import express from 'express'
import validateRequest from '../../middlewares/validateRequest';
import { AppointmentValidations } from './Appointment.validation';
import { AppointmentControllers } from './Appointment.controller';
const router = express.Router();
router.post('/create-appointment',
AppointmentControllers.createAppointment)


export const AppointmentRoutes = router