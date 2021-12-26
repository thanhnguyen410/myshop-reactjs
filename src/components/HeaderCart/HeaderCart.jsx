import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { path } from 'src/constants/path'
import Navbar from '../NavBar/Navbar'
import * as S from './headerCart.styled'

export default function HeaderCart() {
  const [searchValue, setSearchValue] = useState('')

  const navigate = useNavigate()

  const search = event => {
    event.preventDefault()
    const _value = searchValue.trim()
    if (_value !== '') {
      navigate(path.home + `?name=${searchValue}`)
    }
  }

  const onChangeSearch = event => {
    setSearchValue(event.target.value)
  }

  return (
    <S.Header>
      <S.Navbar>
        <div className="container">
          <Navbar />
        </div>
      </S.Navbar>
      <div className="container">
        <S.SearchWrap>
          <S.Logo to={path.home}>
            <img
              src="https://raw.githubusercontent.com/dtdgroup/React/89296ea902d2810f4f0a7490d4d8544d9e86c837/logo/myshop-orange.svg"
              alt=""
            />
            <S.LogoPageName>Giỏ hàng</S.LogoPageName>
          </S.Logo>
          <S.Form onSubmit={search}>
            <S.Input
              type="text"
              placeholder="Tìm kiếm sản phẩm"
              value={searchValue}
              onChange={onChangeSearch}
            ></S.Input>
            <S.ButtonSearch onClick={search}>
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
            </S.ButtonSearch>
          </S.Form>
        </S.SearchWrap>
      </div>
    </S.Header>
  )
}
