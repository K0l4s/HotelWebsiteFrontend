import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './ServiceDetail.css';
import { Carousel } from 'react-responsive-carousel';

const imageData = [
  { src: "https://picsum.photos/seed/picsum/600/400", alt: "Image 1" },
  { src: "https://picsum.photos/id/237/600/400", alt: "Image 2" },
  { src: "https://picsum.photos/seed/picsum/600/400", alt: "Image 3" },
  { src: "https://picsum.photos/seed/picsum/600/400", alt: "Image 1" },
  { src: "https://picsum.photos/id/237/600/400", alt: "Image 2" },
  { src: "https://picsum.photos/seed/picsum/600/400", alt: "Image 3" },
  { src: "https://picsum.photos/seed/picsum/600/400", alt: "Image 1" },
  { src: "https://picsum.photos/id/237/600/400", alt: "Image 2" },
  { src: "https://picsum.photos/seed/picsum/600/400", alt: "Image 3" },
];

const ServiceDetail = () => {
  return (
    <div className="service-detail-client">
      <div className="service-detail-top">
        <Carousel autoPlay interval={2000} infiniteLoop showThumbs={false} showStatus={false}>
          {imageData.map((image, index) => (
            <div key={index}>
              <img src={image.src} alt={image.alt} />
            </div>
          ))}
        </Carousel>
        <div></div>
      </div>
      <div>
        <div className="service-detail-bottom">
          <div className="service-detail-image-container">
            <img src="https://picsum.photos/seed/picsum/600/400" alt="Service Detail" className="service-detail-image" />
          </div>
          <div className="service-detail-info">
            <h2>Room Information</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis, auctor consequat urna.</p>
            <p>Morbi a bibendum metus. Donec scelerisque sollicitudin enim eu venenatis. Duis tincidunt laoreet ex, in pretium orci vestibulum eget.</p>
            <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
          </div>
        </div>
        <div className="service-detail-bottom">
          <div className="service-detail-info">
            <h2>Room Information</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis, auctor consequat urna.</p>
            <p>Morbi a bibendum metus. Donec scelerisque sollicitudin enim eu venenatis. Duis tincidunt laoreet ex, in pretium orci vestibulum eget.</p>
            <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
          </div>
          <div className="service-detail-image-container">
            <img src="https://picsum.photos/seed/picsum/600/400" alt="Service Detail" className="service-detail-image" />
          </div>
        </div>
        <div className="service-detail-bottom">
          <div className="service-detail-image-container">
            <img src="https://picsum.photos/seed/picsum/600/400" alt="Service Detail" className="service-detail-image" />
          </div>
          <div className="service-detail-info">
            <h2>Room Information</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis, auctor consequat urna.</p>
            <p>Morbi a bibendum metus. Donec scelerisque sollicitudin enim eu venenatis. Duis tincidunt laoreet ex, in pretium orci vestibulum eget.</p>
            <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
          </div>
        </div>
        <div className="service-detail-bottom">
          <div className="service-detail-info">
            <h2>Room Information</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis, auctor consequat urna.</p>
            <p>Morbi a bibendum metus. Donec scelerisque sollicitudin enim eu venenatis. Duis tincidunt laoreet ex, in pretium orci vestibulum eget.</p>
            <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
          </div>
          <div className="service-detail-image-container">
            <img src="https://picsum.photos/seed/picsum/600/400" alt="Service Detail" className="service-detail-image" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceDetail;
