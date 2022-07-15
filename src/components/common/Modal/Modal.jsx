import { Component } from 'react';
import PropTypes from 'prop-types';
import { ModalBackdrop, ModalImg } from './Modal.styled';

export class Modal extends Component {
    static propTypes = {
        onClose: PropTypes.func.isRequired,
        src: PropTypes.string.isRequired,
    };

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = (e) => {
        if (e.code === 'Escape') {
            this.props.onClose();
        }
    }

    handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            this.props.onClose();
        }
    }

    render() {
        return (
            <ModalBackdrop onClick={this.handleBackdropClick}>
                <ModalImg src={this.props.src} alt="" />
            </ModalBackdrop>
        );
    }
}