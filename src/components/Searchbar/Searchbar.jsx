import PropTypes from 'prop-types';
import { Header, SearchForm, SearchFormInput, SearchFormButton } from './Searchbar.styled';
import { Formik } from 'formik';
import { HiSearch } from "react-icons/hi";

export const Searchbar = ({ onSubmit }) => {
    return (
        <Header>
            <Formik
                initialValues={{query: ''}}
                onSubmit={(values) => {
                    onSubmit(values.query);
                }}
            >
            {props => (
                <SearchForm>
                    <SearchFormInput
                        name='query'
                        type='text'
                        onChange={props.handleChange}
                        value={props.values.query}
                    />
                    <SearchFormButton type='submit'>
                        <HiSearch size="30px"/>
                    </SearchFormButton>
                </SearchForm>
            )}
            </Formik>
        </Header>
    );
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}