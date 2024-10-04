import dotenv from 'dotenv';
import path from 'path';
 dotenv.config({path:path.join(process.cwd(), '.env')});
 export default {
   node_env : process.env.NODE_ENV,
   port: process.env.PORT,
database_url: process.env.DATABASE_URL,
jwt_access_secret: process.env.JWT_ACCESS_SECRET,
bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
default_password: process.env.DEFAULT_PASSWORD,
reset_password_ui_link: process.env.RESET_PASSWORD_UI_LINK
 }