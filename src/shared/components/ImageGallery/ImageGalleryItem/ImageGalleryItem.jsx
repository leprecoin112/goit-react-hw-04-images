import { useState } from 'react';
import Modal from 'shared/components/Modal/Modal';
import styles from './ImageGalleryItem.module.scss';
import PropTypes from 'prop-types';

function ImageGalleryItem({ smallImg, description, largeImageURL }) {
  const [visible, setVisible] = useState(false);

  const toggleModal = e => {
    if (e.target.dataset.action !== 'visible') {
      setVisible(prevState => !prevState);
    }
  };
  return (
    <li className={styles.ImageGalleryItem}>
      <img
        onClick={toggleModal}
        className={styles['ImageGalleryItem-image']}
        src={smallImg}
        alt={description}
      />
      {visible && (
        <Modal
          largeImageURL={largeImageURL}
          description={description}
          onClick={toggleModal}
        />
      )}
    </li>
  );
}

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string,
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
};

export default ImageGalleryItem;
