import { IdleSection, IdleText } from './Idle.styled';
import { HiArrowUp } from "react-icons/hi";

export const Idle = () => {
    return (
        <IdleSection>
            <IdleText>type word in searchbar</IdleText>
            <HiArrowUp size="40px" />
        </IdleSection>
    );
}