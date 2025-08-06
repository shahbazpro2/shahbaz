import { useState } from 'react';
import { BiX as CloseIcon } from 'react-icons/bi';

import Image from '@/common/components/elements/Image';
import { imageBaseUrl } from '@/services/image';

interface ProjectGalleryProps {
  images: Array<{
    image: {
      thumbnailURL: string;
      url: string;
    };
    id: string;
  }>;
}

const ProjectGallery = ({ images }: ProjectGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!images || images.length === 0) {
    return null;
  }

  const openLightbox = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-xl font-semibold text-neutral-800 dark:text-neutral-200'>
          Project Gallery
        </h3>
        <p className='text-sm text-neutral-600 dark:text-neutral-400'>
          Click on any image to view it in full size
        </p>
      </div>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {images.map((item, index) => (
          <div
            key={item.id}
            className='group relative cursor-pointer overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700'
            onClick={() => openLightbox(`${imageBaseUrl}${item.image.url}`)}
          >
            <Image
              src={`${imageBaseUrl}${item.image.url}`}
              alt={`Project image ${index + 1}`}
              width={400}
              height={300}
              className='h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105'
            />
            <div className='absolute inset-0 bg-black bg-opacity-0 transition-all duration-300 group-hover:bg-opacity-20' />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90'
          onClick={closeLightbox}
        >
          <div className='relative max-h-[90vh] max-w-[90vw]'>
            <button
              onClick={closeLightbox}
              className='absolute -top-12 right-0 z-10 rounded-full bg-white p-2 text-black transition-all duration-200 hover:bg-neutral-200'
            >
              <CloseIcon size={24} />
            </button>
            <Image
              src={selectedImage}
              alt='Full size project image'
              width={1200}
              height={800}
              className='max-h-[90vh] max-w-[90vw] object-contain'
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectGallery;
