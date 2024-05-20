import React from 'react'
import BranchSlideShow from '../../components/branchSlideShow/BranchSlideShow'
import ImageSlideShow from '../../components/imageSlideShow/ImageSlideShow'
import './Homepage.css'
import { useNavigate } from 'react-router-dom'
const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className='homepage'>
      <h1 style={{ textAlign: "center" }} className='hello'>CHUỖI KHÁCH SẠN HAPPY HOTEL KÍNH CHÀO QUÝ KHÁCH!</h1>
      <img style={{borderRadius:'10px',margin:'auto', display: 'flex', width:'100vh', marginTop: '30px'}} src="https://www.bna.com.vn/sites/default/files/inline-images/Thiet%20ke%20logo%20khach%20san%20Lemore.png" alt="" />
      {/* <h1 style={{ textAlign: "center" }}>Xin chào bạn đến với Chuỗi Hệ Thống Happy Hotel!</h1> */}
      {/* <div className="slideShow">
      <ImageSlideShow/>
      </div> */}
      <div className="content why" id="content">
        <div className="image">
          <button onClick={()=>navigate("/booking")}>Đặt phòng ngay</button>
          <img src="https://artishotel.vn/wp-content/uploads/2021/12/artishotel.png" alt="" />
        </div>
        <div className="text">
          <h1 style={{ textAlign: "center" }}>TẠI SAO NÊN CHỌN HAPPY HOTEL?</h1>
          <p style={{ textAlign: "center", width: '80%', margin: 'auto', padding: '10px', fontSize: '20px' }}>Chào mừng bạn đến với Happy Hotel - địa chỉ lý tưởng cho những người muốn tận hưởng kỳ nghỉ tuyệt vời mà không làm suy giảm túi tiền. Với một loạt các dịch vụ tiện ích và phòng nghỉ thoải mái, chúng tôi cam kết mang lại trải nghiệm lưu trú đáng nhớ cho khách hàng của mình.
            Tìm kiếm một nơi lưu trú đáng giá cho kỳ nghỉ của bạn? Hãy khám phá bộ sưu tập các phòng khách sạn giá rẻ của chúng tôi, nơi bạn có thể tận hưởng sự thoải mái và tiện nghi mà không cần phải lo lắng về giá cả. Từ phòng Standard đến các loại phòng cao cấp, chúng tôi cam kết cung cấp giải pháp lưu trú phù hợp với mọi nhu cầu và ngân sách.
            Với vị trí thuận lợi và dịch vụ chăm sóc khách hàng tận tâm, Happy Hotel là điểm dừng chân lý tưởng cho kỳ nghỉ của bạn. Đặt phòng ngay hôm nay và trải nghiệm không gian lưu trú ấm cúng và tiện nghi tại Happy Hotel!</p>
        </div>
      </div>
      <h1 >CHUỖI KHÁCH SẠN BẬC NHẤT HỒ CHÍ MINH</h1>
      <div className="content" id="content">
        <div className="text">
          <h1 style={{ textAlign: "center" }}>CHẤT LƯỢNG DỊCH VỤ CHUẨN 5 SAO</h1>
          <p style={{ textAlign: "center", width: '80%', margin: 'auto', padding: '10px', fontSize: '20px' }}>Khi nói đến nghỉ dưỡng tại chuỗi khách sạn hàng đầu Việt Nam, Happy Hotel luôn nằm trong danh sách ưu tiên hàng đầu của du khách trong nước và quốc tế. Được biết đến như một biểu tượng của chất lượng dịch vụ chuẩn 5 sao, Happy Hotel cam kết mang đến cho khách hàng trải nghiệm nghỉ dưỡng tuyệt vời nhất. Từ phòng nghỉ sang trọng, tiện nghi đến các dịch vụ chăm sóc khách hàng tận tâm, mọi yếu tố tại Happy Hotel đều được thiết kế để đáp ứng mọi nhu cầu của khách hàng.</p>
        </div>
        <div className="image">
          <button onClick={()=>navigate("/service")}>Khám phá dịch vụ</button>
          <img src="https://quynhonhotel.com/wp-content/uploads/2023/04/khach-san-xavia-quy-nhon-hotel-2.jpg" alt="" />
        </div>
      </div>
      {/* <h1 >CHUỖI KHÁCH SẠN CÓ NHIỀU CHI NHÁNH NHẤT</h1>
      <div className="content" id="content"> */}
      {/* <div className="image">
          <button>Khám phá chi nhánh</button>
          <img src="https://quynhonhotel.com/wp-content/uploads/2023/04/khach-san-xavia-quy-nhon-hotel-2.jpg" alt="" />
        </div>
        <div className="text">
          <h1 style={{ textAlign: "center" }}>CHI NHÁNH NHIỀU NHẤT TPHCM</h1>
          <p style={{ textAlign: "center", width: '80%', margin: 'auto', padding: '10px', fontSize: '20px' }}>Khi nói đến nghỉ dưỡng tại chuỗi khách sạn hàng đầu Việt Nam, Happy Hotel luôn nằm trong danh sách ưu tiên hàng đầu của du khách trong nước và quốc tế. Được biết đến như một biểu tượng của chất lượng dịch vụ chuẩn 5 sao, Happy Hotel cam kết mang đến cho khách hàng trải nghiệm nghỉ dưỡng tuyệt vời nhất. Từ phòng nghỉ sang trọng, tiện nghi đến các dịch vụ chăm sóc khách hàng tận tâm, mọi yếu tố tại Happy Hotel đều được thiết kế để đáp ứng mọi nhu cầu của khách hàng.</p>
        </div> */}
        
      {/* </div> */}
      {/* <div className="btnGroup">
        <button>Đặt phòng ngay</button>
        <button>Khám phá dịch vụ</button>
        <button>Liên hệ</button>
        <button>Về chúng tôi</button>
      </div> */}
      {/* <h1>Danh sách các chi nhánh hiện có</h1> */}
      {/* Đoạn văn ngẫu nhiên */}
      
      {/*<BranchSlideShow/>*/}
    // </div>
  )
}

export default Homepage