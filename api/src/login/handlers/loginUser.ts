
import { signToken } from './signJwt'
import md5 from "md5";
import { getConnection } from '../../db';



async function loginHandler(req, res, next) {
  try {
    const result = await loginUser({ userName: req.body.userName, password: req.body.password, });
    if (!result) throw new Error("User is not authorized")
    const token = signToken({ userName: result.user_name, userId: result.id, role: result.role });
    res.json({ token });
  } catch (ex) {
    return next(ex);
  }
}

interface ILoginUser {
  userName: string;
  password: string;
}
async function loginUser(user: ILoginUser)
{
  if (!user.password || !user.userName) throw new Error("no params");
  const newLocal = `SELECT * FROM vacationapp.users where vacationapp.users.user_name = ? AND vacationapp.users.password = ? `;
  const query = newLocal;
  console.log(query);
  const [result] = await getConnection().execute(query, [user.userName, user.password]);
  console.log(result[0]);
  return result[0];
}

export { loginHandler } 