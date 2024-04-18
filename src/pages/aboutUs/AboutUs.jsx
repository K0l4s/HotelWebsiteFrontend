import React from 'react'
import './AboutUs.css'
const AboutUs = () => {
  
  return (
    <div>
      <h1>Happy Hotel - 10 năm thành lập</h1>
      <p>Mô tả 10 năm</p>
      <h2>Đội ngũ phát triển dự án</h2>
      <div className="teamGroup">
        <div className="team">
          <img className='avt' src="https://t3.ftcdn.net/jpg/06/01/17/18/360_F_601171867_X85WpWCcMzNsoMWtMxiZQspKzaOwCyuK.jpg" alt="" />
          <p>Huỳnh Trung Kiên</p>
          <p>21110223</p>
          <p>Vai trò: Fullstack Developer, Project Leader</p>
          <p>Liên hệ</p>
          <img src="" alt="" />
        </div>
        <div className="team">
          <img className='avt' src="https://t3.ftcdn.net/jpg/06/01/17/18/360_F_601171827_GwbDHEuhisbGFXRfIpXFhtf7wAvsbLut.jpg" alt="" />
          <p>Tào Viêt Đức</p>
          <p>21110169</p>
          <p>Vai trò: Front-end Developer</p>
          <p>Liên hệ</p>
          <img src="" alt="" />
        </div>
        <div className="team">
          <img className='avt' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnGR40gjeEpa8FyAt2XhSXqQHfxOEvTg7nVDhmIbB-AGe751a4owYXtAYItY646FsOppY&usqp=CAU" alt="" />
          <p>Ngô Minh Thuận</p>
          <p>21110314</p>
          <p>Vai trò: Back-end Developer</p>
          <p>Liên hệ</p>
          <img src="" alt="" />
        </div>
        <div className="team">
          <img className='avt' src="https://i.pinimg.com/736x/e6/c1/a7/e6c1a7fff198c293406d36553912a976.jpg" alt="" />
          <p>Nguyễn Hoàng Phương Ngân</p>
          <p>21110254</p>
          <p>Vai trò: Back-end Developer</p>
          <p>Liên hệ</p>
          <img src="" alt="" />
        </div> 
      </div>
      {/* <p>Huỳnh Trung Kiên</p>
        <p>Tào Việt Đức</p>
        <p>Ngô Minh Thuận</p>
        <p>Nguyễn Hoàng Phương Ngân</p> */}
    </div>
  )
}

export default AboutUs