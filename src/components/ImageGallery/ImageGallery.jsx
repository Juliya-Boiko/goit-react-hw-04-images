import PropTypes from 'prop-types';
import { Card } from './Card/Card';
import { ImageGalleryList, ImageGalleryListItem } from './ImageGallery.styled';

export const ImageGallery = ({ items }) => {
  return (
    <ImageGalleryList>
      {items.map(item => (
        <ImageGalleryListItem key={item.id}>
          <Card item={item} />
        </ImageGalleryListItem>
      ))}
    </ImageGalleryList>
  );
};

ImageGallery.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};
