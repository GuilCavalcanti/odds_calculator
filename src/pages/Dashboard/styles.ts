import styled from 'styled-components';
import { Button, FormLabel, FormControlLabel, Typography } from '@material-ui/core';
import { shade } from 'polished';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
 `;

export const HandConfigContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  padding: 15px;
`;

export const HandConfigWrapContainer = styled.div`
  display: flex;
  flex-direction: row;
  background: #232129;

  min-width: 385px;
  max-height: 740px;

  margin-left: 20px;
  padding: 25px;

  border: solid 2.5px #ff9000;
  border-radius: 10px;
`;

export const CardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-self: flex-start;
  flex-wrap: wrap;
`;

export const CardContainer = styled.div`

  :nth-child(odd) {
    margin-left: 35px;
    margin-bottom: 35px;
  }
`;

export const HandConfig = styled.div`
  margin-left: 10px;
`;

export const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  h1 {
    margin-top: 20px;
    margin-bottom: 15px;
  }
`;

export const StyledButton = styled(Button)`
  background: #ff9000;
  height: 65px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #312e38;
  font-weight: bold;
  font-size: 1rem;
  background: #ff9000;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#ff9000')};
  }

   & + button {
     margin-top: 15px;
   }

   font-family: 'Roboto Slab', serif;
`;

export const InnerSuitAndButtonContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin-left: 30px;

`;

export const FormLabelStyled = styled(FormLabel).attrs(() => ({ component: "legend", }))`
  font-size: 30px;
  font-weight: 550;
  font-family: 'Roboto Slab';
  color: #909090;
`; 

export const FormControlLabelStyled = styled(FormControlLabel)`
  color:' #666360';
  font-size: 3000px;
  font-family: 'Roboto Slab';
`;

export const TypographyStyled = styled(Typography).attrs(() => ({
  style: {
    color:' #666360',
    fontSize: '18px',
    fontFamily: 'Roboto Slab',
  },
}))``;


