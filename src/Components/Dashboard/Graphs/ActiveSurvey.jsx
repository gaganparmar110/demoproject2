import React, {useState, useEffect} from "react";

import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from "recharts";

import { GraphWrapper, RechartsWrapper } from "./Graph.style";

import { Api } from "Helpers";
import { COLORS } from "Styles/Constants";


function ActiveSurvey(props) {
    let [data, setData] = useState([]);

    useEffect(() => {
        getCount()
    // eslint-disable-next-line
    }, [])

    async function getCount() {
        let {data} = await new Api().post("analytics/survey/total-vs-open")
        setData([{
                name    : "Total",
                count   : data.total,
                fill    : COLORS.GREEN
            }, {
                name    : "Open",
                count   : data.open,
                fill    : COLORS.ORANGE
            }
        ])
    }

    return (
        <GraphWrapper>
            <div className="title-container">
                Total Survey Vs Active Survey
            </div>
        
            <PieChartComponent data={data}/>
            
        </GraphWrapper>
    )
}

export function PieChartComponent({data}) {
    return (
        <RechartsWrapper>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        dataKey = "count"
                        data    = {data}
                        outerRadius={80}
                        innerRadius={40}
                        label
                    />
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </RechartsWrapper>
    )
}

export default ActiveSurvey;