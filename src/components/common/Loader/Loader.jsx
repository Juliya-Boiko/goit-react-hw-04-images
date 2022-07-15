import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { BallTriangle } from 'react-loader-spinner';
import { LoaderSection } from './Loader.styled';

export const LoaderSpinner = () => {
    return (
        <LoaderSection>
            <BallTriangle 
                height="100"
                width="100"
                color='#3f51b5'
                ariaLabel='loading'
            />
        </LoaderSection>
    );
}