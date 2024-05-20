import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import CSS cho carousel
import { Carousel } from 'react-responsive-carousel';
import "./RoomDetailClient.css";

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

const RoomDetailClient = () => {
  return (
    <div className="room-detail-client">
      <div>
        <div className="room-detail-bottom">
          <div className="room-detail-image-container">
            <img src="https://picsum.photos/seed/picsum/600/400" alt="Room Detail" className="room-detail-image" />
          </div>
          <div className="room-detail-info">
            <h2>Room Information</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis, auctor consequat urna.</p>
            <p>Morbi a bibendum metus. Donec scelerisque sollicitudin enim eu venenatis. Duis tincidunt laoreet ex, in pretium orci vestibulum eget.</p>
            <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
          </div>
        </div>
      </div>
      <div className="room-detail-top">
        <Carousel autoPlay interval={2000} infiniteLoop showThumbs={false} showStatus={false}>
          {imageData.map((image, index) => (
            <div key={index}>
              <img src={image.src} alt={image.alt} />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default RoomDetailClient;
