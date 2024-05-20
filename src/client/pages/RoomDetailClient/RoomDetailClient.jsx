import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import CSS cho carousel
import { Carousel } from 'react-responsive-carousel';
import "./RoomDetailClient.css";
import { useNavigate, useParams } from "react-router-dom";
import server from "../../../api/APIPath";
import axios from "axios";
import { useEffect, useState } from "react";



const RoomDetailClient = () => {
  const navigate = useNavigate();
  const[imageData, setImageData] = useState([
    { src: "https://picsum.photos/seed/picsum/600/400", alt: "Image 1" },
    { src: "https://picsum.photos/id/237/600/400", alt: "Image 2" },
    { src: "https://picsum.photos/seed/picsum/600/400", alt: "Image 3" },
    { src: "https://picsum.photos/seed/picsum/600/400", alt: "Image 1" },
    { src: "https://picsum.photos/id/237/600/400", alt: "Image 2" },
    { src: "https://picsum.photos/seed/picsum/600/400", alt: "Image 3" },
    { src: "https://picsum.photos/seed/picsum/600/400", alt: "Image 1" },
    { src: "https://picsum.photos/id/237/600/400", alt: "Image 2" },
    { src: "https://picsum.photos/seed/picsum/600/400", alt: "Image 3" },
  ]); // Thay đổi imageData thành imageData
  const id = useParams().id;
  const [roomType, setRoomType] = useState({});
  const [thumb, setThumb] = useState("https://picsum.photos/seed/picsum/600/400");
  useEffect(() => {
    fetchRoom();
  }, []);
  const fetchRoom = async () => {
    try {
      const response = await axios.get(`${server}/api/v1/room-type/${id}`);
      console.log(response.data);
      setRoomType(response.data);
      if(response.data.imageURLs.length > 0){{
        
        setImageData(response.data.imageURLs.map((image) => ({
          src: image,
          alt: image,
        })));
        setThumb(response.data.imageURLs[0]);
        console.log(thumb);
      }}
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="room-detail-client">
      <div>
        <div className="room-detail-bottom">
          <div className="room-detail-image-container">
            <img src={thumb} alt="Room Detail" className="room-detail-image" />
          </div>
          <div className="room-detail-info">
            <h2>Thông tin phòng</h2>
            <p>ID: {roomType.id}</p>
            <p>Tên phòng: {roomType.name}</p>
            <p>Giá: {roomType.priceEachRoom}</p>
            <p>Mô tả: {roomType.description}</p>
            <button onClick={()=>navigate("/picking/"+id)}>Đặt phòng ngay</button>
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
