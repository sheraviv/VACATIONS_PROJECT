
import jwt from "jsonwebtoken";
import { getConnection } from "../../db";


async function createVacation(req, res, next) {
    console.log(req.body)
    await postVacationHandler(req.body)
    return res.status(200).json({ message: "created" });
}

async function postVacationHandler(payload) {
    const { destination, description, picture, date_start, date_end, price } = payload
    const query = postVacationQuery();
    const [result] = await getConnection().execute(query, [destination, description, picture, date_start, date_end, price]);
    console.log("create secces")
    return result;
}

const postVacationQuery = () => {
    return `INSERT INTO vacationapp.vacations (destination, description, picture, date_start, date_end, price) VALUES (?, ?, ?, ?, ?, ?);
    `;
};


async function getVacations(req, res, next) {
    const result = await getVacationsHandler()
    if (!result) throw new Error("Data not found!")
    return res.status(200).json(result);
}

async function getVacationsHandler() {
    const query = getInputsQuery();
    const [result] = await getConnection().execute(query);
    console.log(result)
    console.log("show vacs")
    return result;
}

const getInputsQuery = () => {
    return `SELECT * FROM vacationapp.vacations ORDER BY time_created DESC`;
};


async function likeVacation(req, res) {

    const token = req?.headers?.authorization;
    if (token === null) return res.sendStatus(401)
    jwt.verify(token, process.env.SECRET, (err, userDecoded) => {
        if (err) {
            return res.sendStatus(403)
        } else {
            req.userData = userDecoded?.data;
        }
    });
    console.log(req.userData);

    const results = await likeVacationHandler(req.userData.userId, req.params.id);
    res.json({ message: "like succes", products: results });
}

async function likeVacationHandler(userId, vacationId) {
    const query = likeVacationQuery();
    console.log(query);
    const [result] = await getConnection().execute(query, [userId, vacationId]);
    console.log("liked")
    return result;
}

const likeVacationQuery = () => {
    return `INSERT INTO vacationapp.followed_vacations (user_id, vacation_id) VALUES (?, ?);
    `;
};


async function unlikeVacation(req, res) {

    const token = req?.headers?.authorization;
    if (token === null) return res.sendStatus(401)
    jwt.verify(token, process.env.SECRET, (err, userDecoded) => {
        if (err) {
            return res.sendStatus(403)
        } else {
            req.userData = userDecoded?.data;
        }
    });
    console.log(req.userData);

    const results = await FollowVacation(req.params.id);
    res.json({ message: "like", products: results });
}

async function FollowVacation(id) {
    const query = deleteFollowVacationQuery();
    console.log(query);
    const [result] = await getConnection().execute(query, [id]);
    return result;
}

const deleteFollowVacationQuery = () => {
    return `DELETE FROM vacationapp.followed_vacations WHERE (vacation_id = ?);`;
};


async function filteredVacation(req, res, next) {
    const token = req?.headers?.authorization;
    if (token === null) return res.sendStatus(401)
    jwt.verify(token, process.env.SECRET, (err, userDecoded) => {
        if (err) {
            return res.sendStatus(403)
        } else {
            req.userData = userDecoded?.data;
        }
    });
    console.log(req.userData);


    const result = await getfilteredVacation(req.userData.userId)
    return res.status(200).json(result);
}

async function getfilteredVacation(userId) {
    const query = filteredVacationQuery();
    const [result] = await getConnection().execute(query, [userId]);
    console.log(result)
    return result;
}

const filteredVacationQuery = () => {
    return `SELECT vacationapp.vacations.id, destination, description, picture, date_start, date_end, price FROM vacation-app.vacations
    LEFT JOIN vacationapp.followed_vacations
    ON followed_vacations.vacation_id = vacation-app.vacations.id
    WHERE (vacation-app.followed_vacations.user_id = ?) ORDER BY time_created DESC;
    `;
};




async function likedCheack(req, res) {
    const token = req?.headers?.authorization;
    if (token === null) return res.sendStatus(401)
    jwt.verify(token, process.env.SECRET, (err, userDecoded) => {
        if (err) {
            return res.sendStatus(403)
        } else {
            req.userData = userDecoded?.data;
        }
    });
    console.log(req.userData);

    const result = await likedHandleCheack(req.userData.userId)
    return res.status(200).json(result);
}

async function likedHandleCheack(userId) {
    const query = likedCheackQuery();
    const [result] = await getConnection().execute(query, [userId]);
    console.log(result)
    return result;
}

const likedCheackQuery = () => {
    return `SELECT vacation_id FROM vacation-app.vacations
    LEFT JOIN vacationapp.followed_vacations
    ON followed_vacations.vacation_id = vacationapp.vacations.id
    WHERE vacationapp.followed_vacations.user_id = ?;
    `;
};



async function userData(req, res, next) {
    const token = req?.headers?.authorization;
    if (token === null) return res.sendStatus(401)
    jwt.verify(token, process.env.SECRET, (err, userDecoded) => {
        if (err) {
            return res.sendStatus(403)
        } else {
            req.userData = userDecoded?.data;
        }
    });
   

    const result = req.userData
    return res.status(200).json(result);
}



async function deleteVacation(req, res) {
    try {
        const results = await deleteVacationHandler(req.params.id);
        if (!results) throw new Error("target not found!")
        res.json({ message: "DELETED!!!", products: results });
    } catch (err) {
        return console.log(err);
    }
}

async function deleteVacationHandler(id) {
    const query = deleteVacationQuery();
    console.log(query);
    const [result] = await getConnection().execute(query, [id]);
    console.log("vac del")
    return result;
}

const deleteVacationQuery = () => {
    return `DELETE FROM vacationapp.vacations WHERE (id = ?);`;
};



async function updateVacation(req, res, next) {
    console.log(req.body)
    const vacationId = req.params.id
    await updateVacationHandler(req.body, vacationId)
    return res.status(200).json({ message: "changed" });
}

async function updateVacationHandler(payload, id) {
    const { destination, description, picture, date_start, date_end, price } = payload
    const query = updateVacationQuery();
    const [result] = await getConnection().execute(query, [id, destination, description, picture, date_start, date_end, price]);
    console.log("changed vac")
    return result;
}

const updateVacationQuery = () => {
    return `REPLACE INTO vacationapp.vacations (id, destination, description, picture, date_start, date_end, price) VALUES (?,?,?,?,?,?,?) 
    `
};



export {
  createVacation,
  getVacations,
  deleteVacation,
  likeVacation,
  unlikeVacation,
  filteredVacation,
  likedCheack,
  userData,
  updateVacation,
};