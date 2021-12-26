import React from 'react'
import { Link } from 'react-router-dom'
import { path } from 'src/constants/path'
import * as S from './headerRegister.style'

export default function HeaderRegister({ title }) {
  return (
    <S.Header>
      <S.Container className="container">
        <S.HeaderBrand>
          <S.HeaderIcon to={path.home}>
            <img
              src="https://raw.githubusercontent.com/dtdgroup/React/89296ea902d2810f4f0a7490d4d8544d9e86c837/logo/myshop-orange.svg"
              alt=""
            />
          </S.HeaderIcon>
          <S.HeaderTitle>{title}</S.HeaderTitle>
        </S.HeaderBrand>
        <Link to="" className="Link">
          Cần trợ giúp
        </Link>
      </S.Container>
    </S.Header>
  )
}
