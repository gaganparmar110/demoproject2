import styled from "styled-components";
import { COLORS } from "Styles/Constants";

export const GraphWrapper = styled.div`
    padding: 10px;
    .container {
        display: flex;
    }
    .actions {
        margin-left: 35%;
    }
    .title-container {
        font-size : 22px;
        color : #ccc;
        font-size: 20px;
        color: #7b7a7a;
    }

    .sub-info {
        margin-top: 5px;
        .info-item {
            color : #757575;
            display : flex;

            .value {
                color : ${COLORS.GREEN}
            }
        }
    }
`;

export const RechartsWrapper = styled.div`
	height : 350px;
    padding: 30px 30px 30px 0;
`;
