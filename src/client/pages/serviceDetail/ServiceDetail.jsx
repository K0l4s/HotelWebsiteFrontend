import React, { useEffect, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './ServiceDetail.css';
import { Carousel } from 'react-responsive-carousel';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import server from '../../../api/APIPath';


const ServiceDetail = () => {
  const [service, setService] = useState({});
  const [imageData, setImageData] = useState([{ src: "https://picsum.photos/seed/picsum/600/400", alt: "Image 1" },
  { src: "https://picsum.photos/id/237/600/400", alt: "Image 2" },
  { src: "https://picsum.photos/seed/picsum/600/400", alt: "Image 3" },
  { src: "https://picsum.photos/seed/picsum/600/400", alt: "Image 1" },
  { src: "https://picsum.photos/id/237/600/400", alt: "Image 2" },
  { src: "https://picsum.photos/seed/picsum/600/400", alt: "Image 3" },
  { src: "https://picsum.photos/seed/picsum/600/400", alt: "Image 1" },
  { src: "https://picsum.photos/id/237/600/400", alt: "Image 2" },
  { src: "https://picsum.photos/seed/picsum/600/400", alt: "Image 3" },]);
  const [thumb, setThumb] = useState("https://picsum.photos/seed/picsum/600/400");
  const id = useParams().serviceId;
  const fetchServiceDetail = async () => {
    try {
      axios.get(server+`/api/v1/service/${id}`).then((response) => {
        setService(response.data.body);
        console.log(response.data.body);
        if(response.data.body.imageURLs.length > 0){{
        
          setImageData(response.data.body.imageURLs.map((image) => ({
            src: image,
            alt: image,
          })));
          setThumb(response.data.body.imageURLs[0]);}}
      }).catch((error) => {
        console.error(error);
      }
      );
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchServiceDetail();
  }, [id]);
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
            <img src={thumb} alt="Service Detail" className="service-detail-image" />
          </div>
          <div className="service-detail-info">
            <h2>Thông tin dịch vụ</h2>
            <p>ID: {service.id}</p>
            <p>Tên: {service.name}</p>
            <p>Giá: {service.price}</p>
            <p>Mô tả: {service.description}</p>
          </div>
        </div>
       </div>
    </div>
  );
}

export default ServiceDetail;
