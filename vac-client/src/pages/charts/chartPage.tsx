
import {  useState, useEffect } from "react";
import axiosInstance from "../../server/index.axios";
import React from 'react';

import {
    VictoryBar, VictoryChart, VictoryAxis,
    VictoryTheme
} from 'victory';


function Chart() {
    const [charts, setCharts] = useState<Array<any>>([])

    useEffect(() => {
        getCarts()
    }, []);

    const getCarts = async () => {
        try {
            const { data } = await axiosInstance.get(`http://localhost:3500/charts/`)

            setCharts(data)
            
            return data
        } catch (err) {
            console.log(err)
        }
    }

    const data = [
        { quarter: 1, earnings: Number(charts[0]?.user_likes) || 0 },
        { quarter: 2, earnings: Number(charts[1]?.user_likes) || 0 },
        { quarter: 3, earnings: Number(charts[2]?.user_likes) || 0 },
        { quarter: 4, earnings: Number(charts[3]?.user_likes) || 0 },
        { quarter: 5, earnings: Number(charts[4]?.user_likes) || 0 },
    ];

    return (
        <>          <div className="container">
            <div className="row ">
                <h3 className="center-align ">LIKE DIAGRAM</h3>
                <div className="chartMain">
                    <VictoryChart
                       
                      
                        domainPadding={0}

                    >
                        <VictoryAxis
                            tickValues={[1, 2, 3, 4, 5]}
                            tickFormat={[`${charts[0]?.destination || ""}`,
                            `${charts[1]?.destination || ""}`,
                            `${charts[2]?.destination || ""}`,
                            `${charts[3]?.destination || ""}`,
                            `${charts[4]?.destination || ""}`]}
                        />
                        <VictoryAxis
                            dependentAxis
                            tickFormat={(x) => (`${x} Likes `)}
                        />
                        <VictoryBar
                            style={{
                                data: { width: 30 },
                                labels: { padding: -70 }
                            }}
                            data={data}
                            x="quarter"
                            y="earnings"
                        />
                    </VictoryChart> </div>
            </div>
        </div>
        </>
    );
}

export { Chart };











// function Contact() {

//     const { value, setValue } = useContext(UserContext)
//     return (
//         <>
//             <h1> Hello, from Contact page!</h1>
//             <h5>{value}</h5>
//         </>
//     );
// }

// export { Contact };
