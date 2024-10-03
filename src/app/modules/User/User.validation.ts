import { z } from "zod";

const forgetPasswordValidationSchema = z.object({
    body:z.object({
        email: z.string({required_error:"User email is required"}).email()
    })
})
export const UserValidations = {
    forgetPasswordValidationSchema
}