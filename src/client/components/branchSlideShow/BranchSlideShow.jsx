import React from 'react'

const BranchSlideShow = () => {
    {/*Slide showw animation*/}
    const slideShow = () => {
        var slideIndex = 0;
        showSlides();
        function showSlides() {
            var i;
            var slides = document.getElementsByClassName("mySlides");
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            slideIndex++;
            if (slideIndex > slides.length) { slideIndex = 1 }
            slides[slideIndex - 1].style.display = "block";
            setTimeout(showSlides, 2000); // Change image every 2 seconds
        }
    }
    var slides = document.getElementsByClassName("mySlides")
    if (slides.length > 0){
        slideShow();}

  return (
    <div className='branchSlideShow'>
        <div className="slideshow-container">
            <div className="mySlides fade">
                <img src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" style={{width: '100%'}}/>
            </div>
            <div className="mySlides fade">
                <img src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg" style={{width: '100%'}}/>
            </div>
            <div className="mySlides fade">
                <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg" style={{width: '100%'}}/>
            </div>
        </div>
    </div>
  )
}

export default BranchSlideShow