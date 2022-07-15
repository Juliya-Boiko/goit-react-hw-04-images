import styled from "styled-components";
import { TbFaceIdError } from "react-icons/tb";

export const UncorrectSearchSection = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: ${p => p.theme.colors.lightGrey};
`;

export const UncorrectSearchText = styled.p`
    text-align: center;
    font-size: 40px;
`;

export const UncorrectSearchIcon = styled(TbFaceIdError)`
    width: 80px;
    height: 80px;
    margin: 10px 0;
`;