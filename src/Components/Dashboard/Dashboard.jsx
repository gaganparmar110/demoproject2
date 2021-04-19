import React from 'react';

import { Row, Col } from 'antd';
import { Card } from "Components/Commons/Commons";

import { NewXDuration, ActiveSurvey } from "./Graphs";

import { DashboardWrapper } from "./Dashboard.style";

function Dashboard() {
    return (
        <DashboardWrapper>
            <Row>
                <Col className="gutter-row" span={12}>
                    <Card className={"full-height"}>
                        <NewXDuration 
                            title = {"New Users"}
                            endPoint = {"analytics/users"}
                        />
                    </Card>
                </Col>
                <Col className="gutter-row" span={12}>
                    <Card className={"full-height"}>
                        <NewXDuration 
                            title = {"New Projects"}
                            endPoint = {"analytics/projects"}
                        />
                    </Card>
                </Col>
                <Col className="gutter-row" span={12}>
                    <Card className={"full-height"}>
                        <NewXDuration 
                            title = {"New Subscription"}
                            endPoint = {"analytics/subscription"}
                        />
                    </Card>
                </Col>
                <Col className="gutter-row" span={12}>
                    <Card className={"full-height"}>
                        <ActiveSurvey />
                    </Card>
                </Col>
            </Row>
            
        </DashboardWrapper>
    )
}

export default Dashboard;