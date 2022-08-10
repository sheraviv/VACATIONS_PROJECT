import { getConnection } from "../../db";


async function charts(req, res, next) {
    const result = await getCharts()
    return res.status(200).json(result);
}

async function getCharts() {
    const query = getChartsQuery();
    const [result] = await getConnection().execute(query);
    console.log(result)
    console.log("******************DATA FATCHED FROM DB**********************")
    return result;
}

const getChartsQuery = () => {
    return `SELECT 
     destination, COUNT(user_id) as user_likes
FROM
    vacationapp.followed_vacations 
    LEFT JOIN vacationapp.vacations
ON vacations.id = vacationapp.followed_vacations.vacation_id 
GROUP BY vacation_id Order By user_likes  DESC 
LIMIT 5 `;
};


export {
    charts,
}


