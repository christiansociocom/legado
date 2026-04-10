import React from 'react';
import ModalImage from 'react-modal-image';
import './PhotoGallery.css';

const PhotoGallery = () => {
    const photos = [
        { id: 1, src: 'path/to/image1.jpg', category: 'category1' },
        { id: 2, src: 'path/to/image2.jpg', category: 'category2' },
        { id: 3, src: 'path/to/image3.jpg', category: 'category1' },
        // Add more photos as needed
    ];

    const categories = [...new Set(photos.map(photo => photo.category))];

    return (
        <div className="photo-gallery">
            <div className="category-filter">
                {categories.map(category => (
                    <button key={category}>{category}</button>
                ))}
            </div>
            <div className="grid">
                {photos.map(photo => (
                    <div key={photo.id} className="grid-item">
                        <ModalImage 
                            small={photo.src} 
                            large={photo.src} 
                            alt={`Photo ${photo.id}`} 
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PhotoGallery;
