import React from 'react'
import * as S from './footer.style'

export default function Footer() {
  return (
    <S.Footer>
      <div className="container">
        <S.Footer1>
          <div>© 2021 Myshop. Tất cả các quyền được bảo lưu.</div>
          <S.Language>
            Ngôn ngữ
            <span>Tiếng Việt</span>
            <span>Tiếng Anh</span>
          </S.Language>
        </S.Footer1>
        <S.Footer2>
          <div>Công ty TNHH Myshop</div>
          <div>
            Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai, Phường Ngọc Khánh, Quận Ba Đình, Thành
            phố Hà Nội, Việt Nam. Tổng đài hỗ trợ: 19001221 - Email: cskh@hotro.Myshop.vn
          </div>
          <div>Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch & Đầu tư TP Hà Nội cấp lần đầu ngày 10/02/2015</div>
        </S.Footer2>
      </div>
    </S.Footer>
  )
}
