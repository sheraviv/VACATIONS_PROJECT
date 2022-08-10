
import md5 from "md5";
import { getConnection } from "../../db";

async function postRegistration(req, res, next) {
    console.log(req.body)
    await addUser(req.body)
    return res.status(200).json({ message: "NEW USER REGISTERED!!!" });
}

async function addUser(payload) {
    const role = "user"
    const { user_name, first_name, last_name, password } = payload
    const query = addUersQuery();
    const [result] = await getConnection().execute(query, [user_name, first_name, last_name, role, password,]);
    console.log("******************DATA USER ADDET TO DB**********************")
    return result;
}

const addUersQuery = () => {
    return `INSERT INTO vacationapp.users (user_name, first_name, last_name, role,  password) VALUES (?, ?, ?, ?, ?);
    `;
};

export { postRegistration }


