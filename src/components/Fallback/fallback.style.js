import styled, { keyframes } from 'styled-components'

export const Container = styled.div`
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`

export const spCircRot = keyframes`
  0% {
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
    -webkit-transform: rotate(359deg);
  }
`

export const ThreeBalls = styled.div`
  width: 32px;
  height: 32px;
  clear: both;
  margin: 20px auto;
  border: 3px solid rgb(250 82 48);
  border-top: 3px rgb(245 245 245) solid;
  border-radius: 50%;
  -webkit-animation: ${spCircRot} 0.6s infinite linear;
  animation: ${spCircRot} 0.6s infinite linear;
`
