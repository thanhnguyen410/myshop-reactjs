import React, { useState, useEffect } from 'react'
import Navbar from '../NavBar/Navbar'
import * as S from './header.style'
import Popover from '../Popover/Popover'
import usePopover from 'src/hooks/usePopover'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useQuery from 'src/hooks/useQuery'
import qs from 'query-string'
import { path } from 'src/constants/path'
import { formatMoney } from 'src/utils/helper'

export default function Header() {
  const { activePopover, hidePopover, showPopover } = usePopover()
  const [keyWord, setKeyWord] = useState('')
  const navigate = useNavigate()
  const queyryString = useQuery()
  const purchases = useSelector(state => state.cart.purchases)

  useEffect(() => {
    setKeyWord(queyryString?.name || '')
  }, [queyryString.name])

  const searchKeyWord = () => {
    let _filters = { ...queyryString, name: keyWord, page: 1 }
    navigate(path.home + `?${qs.stringify(_filters)}`)
  }

  return (
    <S.StyledHeader>
      <div className="container">
        <Navbar />
        <S.SearchWrap>
          <S.Logo to={path.home}>
            <img
              src="https://raw.githubusercontent.com/dtdgroup/React/89296ea902d2810f4f0a7490d4d8544d9e86c837/logo/myshop.svg"
              alt=""
            />
          </S.Logo>
          <S.StyledForm>
            <S.StyledInput
              placeholder="Tìm kiếm sản phẩm"
              onChange={event => setKeyWord(event.target.value)}
              value={keyWord}
            ></S.StyledInput>
            <S.StyledButton type="button" onClick={() => searchKeyWord()}>
              <svg height={19} viewBox="0 0 19 19" width={19} className="shopee-svg-icon ">
                <g fillRule="evenodd" stroke="none" strokeWidth={1}>
                  <g transform="translate(-1016 -32)">
                    <g>
                      <g transform="translate(405 21)">
                        <g transform="translate(611 11)">
                          <path d="m8 16c4.418278 0 8-3.581722 8-8s-3.581722-8-8-8-8 3.581722-8 8 3.581722 8 8 8zm0-2c-3.3137085 0-6-2.6862915-6-6s2.6862915-6 6-6 6 2.6862915 6 6-2.6862915 6-6 6z" />
                          <path d="m12.2972351 13.7114222 4.9799555 4.919354c.3929077.3881263 1.0260608.3842503 1.4141871-.0086574.3881263-.3929076.3842503-1.0260607-.0086574-1.414187l-4.9799554-4.919354c-.3929077-.3881263-1.0260608-.3842503-1.4141871.0086573-.3881263.3929077-.3842503 1.0260608.0086573 1.4141871z" />
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </S.StyledButton>
          </S.StyledForm>
          <S.Cart onMouseEnter={showPopover} onMouseLeave={hidePopover}>
            <S.CartContainer>
              <S.CartIcon to="">
                <svg viewBox="0 0 26.6 25.6" className="shopee-svg-icon navbar__link-icon icon-shopping-cart-2">
                  <polyline
                    fill="none"
                    points="2 1.7 5.5 1.7 9.6 18.3 21.2 18.3 24.6 6.1 7 6.1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit={10}
                    strokeWidth="2.5"
                  />
                  <circle cx="10.7" cy={23} r="2.2" stroke="none" />
                  <circle cx="19.7" cy={23} r="2.2" stroke="none" />
                </svg>
                {purchases.length > 0 && <S.CartNumber>{purchases.length}</S.CartNumber>}
              </S.CartIcon>
              <Popover active={activePopover}>
                <S.PopoverContent>
                  <S.PopoverTitle>Sản phẩm mới thêm</S.PopoverTitle>
                  {purchases.slice(0, 5).map((purchases, index) => (
                    <S.MiniProductCart key={index}>
                      <S.MiniProductCartImg src={purchases.product.image} />
                      <S.MiniCartTitle>{purchases.product.name}</S.MiniCartTitle>
                      <S.MiniProductCartPrice>đ{formatMoney(purchases.product.price)}</S.MiniProductCartPrice>
                    </S.MiniProductCart>
                  ))}
                  <S.PopoverFooter>
                    <S.MoreProduct>
                      {purchases.length > 5 && <span>{purchases.length - 5} sản phẩm vào giỏ</span>}
                    </S.MoreProduct>
                    <S.ButtonShowCart to={path.cart}>Xem giỏ hàng</S.ButtonShowCart>
                  </S.PopoverFooter>
                </S.PopoverContent>
              </Popover>
            </S.CartContainer>
          </S.Cart>
        </S.SearchWrap>
      </div>
    </S.StyledHeader>
  )
}
