import express from 'express'
import validateRequest from '../../middlewares/validateRequest';
import { AppointmentValidations } from './Appointment.validation';
import { AppointmentControllers } from './Appointment.controller';
const router = express.Router();
router.post('/create-appointment', validateRequest(AppointmentValidations.createAppointmentValidationSchema),
AppointmentControllers.createAppointment)
router.get('/booked-times', AppointmentControllers.getBookedTimes);

router.get('/:email', AppointmentControllers.getAppointmentForUser)
router.patch('/:id', AppointmentControllers.updateAppointmentList)
router.delete('/:id', AppointmentControllers.deleteAppointment)
export const AppointmentRoutes = router