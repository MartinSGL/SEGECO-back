// configuration to use the env variables in services without using proccess.env file
export const EnvConfiguration = () => ({
  enviroment: process.env.NODE_ENV || 'dev',
  // server port
  port: +process.env.PORT,
  // db
  db_url: process.env.DB_URL,
  container_db_name: process.env.CONTAINER_DB_NAME,
  db_username: process.env.DB_USERNAME,
  db_password: process.env.DB_PASSWORD,
  db_name: process.env.DB_NAME,
  // user info
  super_user: process.env.SUPER_USER,
  super_email: process.env.SUPER_EMAIL,
  super_password: process.env.SUPER_PASSWORD,
  super_fullname: process.env.SUPER_FULLNAME,
  admin_user: process.env.ADMIN_USER,
  admin_email: process.env.ADMIN_EMAIL,
  admin_password: process.env.ADMIN_PASSWORD,
  admin_fullname: process.env.ADMIN_FULLNAME,
  salt: process.env.SALT,
  // jtw
  jwt_secret: process.env.JWT_SECRET,
  // seed password
  seed_password: process.env.SEED_PASSWORD,
});
