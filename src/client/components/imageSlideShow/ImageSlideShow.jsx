import React from 'react'
import { useEffect } from 'react';
const ImageSlideShow = () => {
    {/*Slide showw animation*/}
    const slideShow = () => {
        var slideIndex = 0;
        if(document.getElementsByClassName("myImageSlides").length === 0) return;
        showSlides();
        function showSlides() {
            var i;
            var slides = document.getElementsByClassName("myImageSlides");
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            slideIndex++;
            if (slideIndex > slides.length) { slideIndex = 1 }
            slides[slideIndex - 1].style.display = "block";
            setTimeout(showSlides, 5000); // Change image every 2 seconds
        }
    }
    if(document.readyState === 'complete') {
        slideShow();
    } else {
        window.addEventListener('load', slideShow);
    }
  return (
    <div className='branchSlideShow'>
        <div className="slideshow-container">
            <div className="myImageSlides fade">
                <img src="https://www.kayak.co.uk/news/wp-content/uploads/sites/5/2023/08/THEME_HOTEL_SIGN_FIVE_STARS_FACADE_BUILDING_GettyImages-1320779330-3.jpg" alt="hotel" style={{width: "100%"}}/>
            </div>
            <div className="myImageSlides fade">
                <img src="https://23c133e0c1637be1e07d-be55c16c6d91e6ac40d594f7e280b390.ssl.cf1.rackcdn.com/u/gpch/Park-Hotel-Group---Explore---Grand-Park-City-Hall-Facade.jpg" alt="hotel" style={{width: "100%"}}/>
            </div>
            <div className="myImageSlides fade">
                <img src="https://media.istockphoto.com/id/472899538/photo/downtown-cleveland-hotel-entrance-and-waiting-taxi-cab.jpg?s=612x612&w=0&k=20&c=rz-WSe_6gKfkID6EL9yxCdN_UIMkXUBsr67884j-X9o=" alt="hotel" style={{width: "100%"}}/>
            </div>
            <div className="myImageSlides fade">
                <img src="https://cdn.britannica.com/96/115096-050-5AFDAF5D/Bellagio-Hotel-Casino-Las-Vegas.jpg" alt="hotel" style={{width: "100%"}}/>
            </div>
            <div className="myImageSlides fade">
                <img src="https://www.savills.co.uk/_images/adobestock-539646437.jpg" alt="hotel" style={{width: "100%"}}/>
            </div>
        </div>
    </div>)
}

export default ImageSlideShow