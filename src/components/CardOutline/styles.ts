import styled, { css, keyframes } from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';

interface HandProps {
  isAddedError?: boolean;
  emptyCardError?: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;

`;

const flashBorder = () => {
  return keyframes`
    50% {
      border-color: red;
    }
  `;
}

export const CloseIconStyled = styled(CloseIcon)<HandProps>`
  position: absolute;
  margin-top: -10px;
  margin-left: 130px;
  border: 1px solid black;
  border-radius: 25px;
  font-size: 20px;
  background: #a6a6a6;
  color: #0d0d0d;

  ${props => 
    !props.emptyCardError &&
    css`
      &:hover {
        background: #312e38;
        color: red;
        border-color: red;
        transition: background, color, border-color, 0.5s;
      }
    `
  }
`;

export const CloseIconStyled2 = styled(CloseIcon)<HandProps>`
  position: absolute;
  margin-top: -10px;
  margin-left: 272px;
  border: 1px solid black;
  border-radius: 25px;
  font-size: 20px;
  background: #a6a6a6;
  color: #0d0d0d;

  ${props => 
    !props.emptyCardError &&
    css`
      &:hover {
        background: #312e38;
        color: red;
        border-color: red;
        transition: background, color, border-color, 0.5s;
      }
    `
  }
`;

export const CardOutlineBorder = styled.div<HandProps>`
  width: 127px;
  height: 167px;
  
  margin-left: 15px;

  border: 3px solid black;
  border-radius: 9px;

  ${props => 
    props.isAddedError &&
    css`
      animation: ${flashBorder} 6s -1s;
      animation-play-state: running;
    `
  }
`;

export const CardsContainer = styled.div`
  display: flex;
  flex-direction: row;

  margin-left: 30px;
  margin-bottom: 35px;
`;