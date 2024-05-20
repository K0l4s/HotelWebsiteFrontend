import React from 'react'
import './AboutUs.css'
const AboutUs = () => {

  return (
    <div className='about'>
      <h2>Happy Hotel - 10 năm thành lập</h2>
      <p className='text'>Chào mừng đến với Happy Hotel - điểm đến lý tưởng cho mọi kỳ nghỉ! Với hơn 10 năm kinh nghiệm trong ngành du lịch và khách sạn, chúng tôi tự hào là một trong những khách sạn nghỉ dưỡng hàng đầu thế giới. Với dịch vụ chăm sóc khách hàng tận tình và tiện nghi hiện đại, Happy Hotel cam kết mang đến cho quý khách trải nghiệm không gian nghỉ dưỡng tuyệt vời nhất.
        Vị trí lý tưởng của chúng tôi kết hợp cùng với cảnh quan tuyệt đẹp và dịch vụ hàng đầu sẽ đảm bảo cho quý khách có những kỳ nghỉ đáng nhớ. Với đội ngũ nhân viên chuyên nghiệp và thân thiện, chúng tôi sẽ luôn sẵn lòng đáp ứng mọi nhu cầu của quý khách, từ việc đặt phòng đến các hoạt động giải trí và tham quan xung quanh khu vực.
        Khám phá sự sang trọng và tiện nghi tại Happy Hotel ngay hôm nay và trải nghiệm sự khác biệt mà chúng tôi mang lại sau 10 năm phát triển và hoàn thiện. Hãy để chúng tôi là điểm đến lý tưởng cho kỳ nghỉ của bạn, nơi mọi khoản chi phí đều đáng giá mỗi khoảnh khắc thư giãn và hạnh phúc."</p>
      <h2>Đội ngũ phát triển dự án</h2>
      <div className="teamGroup">
        <div className="team">
          <img className='avt' src="https://t3.ftcdn.net/jpg/06/01/17/18/360_F_601171867_X85WpWCcMzNsoMWtMxiZQspKzaOwCyuK.jpg" alt="" />
          <p>Huỳnh Trung Kiên</p>
          <p>21110223</p>
          <p>Vai trò: Fullstack Developer, Project Leader</p>
          <p>Liên hệ</p>
          <div className="linkGroup">
          <a href='https://github.com/K0l4s' className="linkLogo">
            <img src="https://cdn.worldvectorlogo.com/logos/github-icon-2.svg" alt="" />
          </a>
          <a href='mailto: trungkienhuynh.contact@gmail.com' className="linkLogo">
            <img src="https://cdn-icons-png.flaticon.com/512/8743/8743964.png" alt="" />
          </a>
          </div>
        </div>
        <div className="team">
          <img className='avt' src="https://t3.ftcdn.net/jpg/06/01/17/18/360_F_601171827_GwbDHEuhisbGFXRfIpXFhtf7wAvsbLut.jpg" alt="" />
          <p>Tào Viêt Đức</p>
          <p>21110169</p>
          <p>Vai trò: Front-end Developer</p>
          <p>Liên hệ</p>
          <div className="linkGroup">
          <a href='https://github.com/taovietduc' className="linkLogo">
            <img src="https://cdn.worldvectorlogo.com/logos/github-icon-2.svg" alt="" />
          </a>
          </div>
        </div>
        <div className="team">
          <img className='avt' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnGR40gjeEpa8FyAt2XhSXqQHfxOEvTg7nVDhmIbB-AGe751a4owYXtAYItY646FsOppY&usqp=CAU" alt="" />
          <p>Ngô Minh Thuận</p>
          <p>21110314</p>
          <p>Vai trò: Back-end Developer</p>
          <p>Liên hệ</p>
          <div className="linkGroup">
          <a href='https://github.com/nauht1' className="linkLogo">
            <img src="https://cdn.worldvectorlogo.com/logos/github-icon-2.svg" alt="" />
          </a>
          </div>
        </div>
        <div className="team">
          <img className='avt' src="https://i.pinimg.com/736x/e6/c1/a7/e6c1a7fff198c293406d36553912a976.jpg" alt="" />
          <p>Nguyễn Hoàng Phương Ngân</p>
          <p>21110254</p>
          <p>Vai trò: Back-end Developer</p>
          <p>Liên hệ</p>
          <div className="linkGroup">
          <a href='https://github.com/PhuongNgan2304' className="linkLogo">
            <img src="https://cdn.worldvectorlogo.com/logos/github-icon-2.svg" alt="" />
          </a>
          </div>
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