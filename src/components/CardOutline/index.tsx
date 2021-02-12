import React from 'react';
import shortid from "shortid";

import {
  Container,
  CardOutlineBorder,
  CardsContainer,
  CloseIconStyled,
  CloseIconStyled2
} from './styles';

interface CardOutlineProps {
  svgPathCardOne?: string,
  svgPathCardTwo?: string,
  svgAltCardOne?: string,
  svgAltCardTwo?: string,
  removeFunction?: ((cardToRemove: string, posInHand: number) => void)
  cardOneAddedError?: boolean,
  cardTwoAddedError?: boolean,
  emptyRemovedCardSlot?: boolean,
}

const CardOutline: React.FC<CardOutlineProps> = (props) => {

  return (
    <Container>
      <CardsContainer>
        {props.svgPathCardOne !== '' ? <CloseIconStyled key={shortid.generate()} onClick={() => props.removeFunction(props.svgAltCardOne, 1)} emptyCardError={props.emptyRemovedCardSlot} /> : <></>}
        <CardOutlineBorder key={shortid.generate()} isAddedError={props.cardOneAddedError} emptyCardError={props.emptyRemovedCardSlot}>
          <img src={props.svgPathCardOne} alt={props.svgAltCardOne} />
        </CardOutlineBorder>
        {props.svgPathCardTwo !== '' ? <CloseIconStyled2 key={shortid.generate()} onClick={() => props.removeFunction(props.svgAltCardTwo, 2)} emptyCardError={props.emptyRemovedCardSlot} /> : <></>}
        <CardOutlineBorder key={shortid.generate()} isAddedError={props.cardTwoAddedError} emptyCardError={props.emptyRemovedCardSlot}>
          {props.svgPathCardTwo !== undefined ? <img src={props.svgPathCardTwo} alt={props.svgAltCardTwo} /> : ''}
        </CardOutlineBorder>
      </CardsContainer>
    </Container>
  )
}

export default CardOutline;