import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal } from '../../common/Modal/Modal';
import { ImageGalleryCardImage } from './ImageGalleryCard.styled';

export const ImageGalleryCard = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <ImageGalleryCardImage
        src={item.webformatURL}
        onClick={openModal}
        alt=""
      />
      {isModalOpen && <Modal src={item.largeImageURL} onClose={closeModal} />}
    </div>
  );
};

ImageGalleryCard.propTypes = {
  item: PropTypes.object.isRequired,
};
