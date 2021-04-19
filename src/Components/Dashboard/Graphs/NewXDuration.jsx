import React, {useState, useEffect} from "react";
import { Select } from "antd";
import PropTypes from "prop-types";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

import { GraphWrapper, RechartsWrapper } from "./Graph.style";

import { Api } from "Helpers";
import { COLORS } from "Styles/Constants";

const { Option } = Select;

function NewXDuration(props) {
    let [data, setData] = useState([]),
        [newInThisDuration, setNewCount] = useState(0),
        {title, endPoint} = props;

    useEffect(() => {
        getCount()
    // eslint-disable-next-line
    }, [])

    async function getCount() {
        let response = await new Api().post(endPoint)
        setData(response.data.graph)
        setNewCount(response.data.newInThisDuration)
    }

    return (
        <GraphWrapper>
            <div className="container">
            <div>
            <div className="title-container">
                {title}
            </div>

            <div className="sub-info">
                <div className="info-item">
                    <div className="name">New in Last 30 days : <span className="value">{newInThisDuration}</span></div>
                </div>
            </div>
            </div>
            <div className="actions">
                <Select
                    className="mr-1"
                    style={{ width: 100 }}
                    optionFilterProp="children"
                    defaultValue={"Year"}
                    // onChange={this.templateTypeHandle}
                    // loading={this.state.isLoading}
                >
                    <Option value={"Year"}>{"Year"}</Option>
                    <Option value={"Month"}>
                        {"Month"}
                    </Option>
                     <Option value={"Week"}>
                        {"Week"}
                    </Option>
                </Select>
			</div>
            </div>
            <MonthGraph data={data}/>
            
        </GraphWrapper>
    )
}

export function MonthGraph({data}) {
    return (
        <RechartsWrapper>
            <ResponsiveContainer>
                <LineChart
                    data={data}
                >
                    <XAxis dataKey="label" tickLine={false}/>
                    <YAxis tickLine={false} />
                    <Tooltip />
                    {
                        data.length > 0 &&
                        <Line 
                            type    = "monotone" 
                            dataKey = "count" 
                            stroke  = {COLORS.GREEN} 
                            strokeWidth={2}
                        />
                    }
                </LineChart>
            </ResponsiveContainer>
        </RechartsWrapper>
    )
}

NewXDuration.propTypes = {
    title: PropTypes.string.isRequired,
    endPoint: PropTypes.string.isRequired,
}

export default NewXDuration;