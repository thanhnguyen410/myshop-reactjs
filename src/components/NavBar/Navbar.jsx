import React, { Fragment } from 'react'
import { useAuthenticated } from 'src/hooks/useAuthenticated'
import { useSelector } from 'react-redux'
import * as S from './navbar.style'
import { useDispatch } from 'react-redux'
import { path } from 'src/constants/path'
import usePopover from 'src/hooks/usePopover'
import Popover from '../Popover/Popover'
import { logout } from 'src/pages/Auth/auth.slice'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const authenticated = useAuthenticated()
  const profile = useSelector(state => state.auth.profile)
  const { activePopover, showPopover, hidePopover } = usePopover()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <S.Navbar>
      <S.Navbar>
        <S.NavMenu>
          {authenticated && (
            <li>
              <S.User onMouseEnter={showPopover} onMouseLeave={hidePopover}>
                <S.UserImage src="https://www.seekpng.com/png/full/356-3562377_personal-user.png" />
                <S.UserName>{profile.email}</S.UserName>
                <Popover active={activePopover}>
                  <S.UserLink to={path.user}>Tài khoản của tôi</S.UserLink>
                  <S.UserLink to={path.purchase}>Đơn mua</S.UserLink>
                  <S.UserButton type="button" onClick={handleLogout}>
                    Đăng xuất
                  </S.UserButton>
                </Popover>
              </S.User>
            </li>
          )}
          {!authenticated && (
            <Fragment>
              <li>
                <S.NavLink to={path.register}>Đăng ký</S.NavLink>
                <S.NavLink to={path.login}>Đăng nhập</S.NavLink>
              </li>
            </Fragment>
          )}
        </S.NavMenu>
      </S.Navbar>
    </S.Navbar>
  )
}
