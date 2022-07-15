import { UncorrectSearchSection, UncorrectSearchText, UncorrectSearchIcon } from './UncorrectSearch.styled';

export const UncorrectSearch = () => {
    return (
        <UncorrectSearchSection>
            <UncorrectSearchText>Sorry, we dont have result</UncorrectSearchText>
            <UncorrectSearchIcon />
            <UncorrectSearchText>Pease, try one more time with another query</UncorrectSearchText>
        </UncorrectSearchSection>
    );
}