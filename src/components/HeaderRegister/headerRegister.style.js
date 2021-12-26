import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Header = styled.header`
  box-shadow: 0 6px 6px rgba(0 0 0 / 6%);
  width: 100%;
  min-width: max-content;
`

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2.5rem 2rem;
`

export const HeaderBrand = styled.div`
  display: flex;
  align-items: center;
`

export const HeaderIcon = styled(Link)`
  margin-top: -0.5rem;
  img {
    width: 165px;
  }
`

export const HeaderTitle = styled.div`
  color: #222;
  font-size: 2.4rem;
  margin-left: 1.2rem;
`
