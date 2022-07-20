import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal } from '../../common/Modal/Modal';
import { CardImage } from './Card.styled';

export const Card = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <CardImage src={item.webformatURL} onClick={openModal} alt="" />
      {isModalOpen && <Modal src={item.largeImageURL} onClose={closeModal} />}
    </div>
  );
};

Card.propTypes = {
  item: PropTypes.object.isRequired,
};
