import React, { useState, useEffect, useRef } from 'react';
import {
  Radio,
  RadioGroup,
  FormControl,
  StylesProvider,
  FormControlLabel,
} from '@material-ui/core';

import { 
  Container,
  Title,
  HandConfigContainer,
  HandConfig,
  InnerSuitAndButtonContainer,
  StyledButton,
  HandConfigWrapContainer,
  FormLabelStyled,
  FormControlLabelStyled,
  TypographyStyled,
  CardsContainer,
} from './styles';

import CardOutline from '../../components/CardOutline';
import Toast from '../../components/Toast';

import { Clubs, Diamonds, Hearts, Spades } from './cards';

const Dashboard: React.FC = () => {

  const stateRef = useRef();

  // Variable for the suit choosen for the card to be set
  const [suit, setSuit] = useState('');

  // Variable for the card choosen to be set
  const [card, setCard] = useState('');

  // Variable for the number of hands choosen
  const [numHands, setNumHands] = useState('');

  // Array holding the Card components that holds the Border for empty Cards and SVG + Border for Cards Set
  const [numOfHandsOutline, setNumOfHandsOutline] = useState([]);

  // Index used to keet track of the next Card compenent to receive a SVG image
  const [nextIndexOfCardstoBeSetSvgs, setNextIndexOfCardstoBeSetSvgs] = useState(0);

  // Variable used to know if the Card to receive an SVG image is the first or second Card in a Hand
  const [cardPosWithinHand, setCardPosWithinHand] = useState(1);

  // Array used to keep track of cards already set
  const [cardsSet, setCardsSet] = useState([]);

  // Array used to keep track of voids that need to be filled first from cards that were removed
  const [removedEmptyCard, setRemovedEmptyCard] = useState(false);

  // Card and position in hand of the card that was removed
  const [cardSlotAfterRemoving, setCardSlotAfterRemoving] = useState([]);

  // Set Toast visibility, used to trigger Toast, it will show regardless if it is true or false, except on first load
  const [showToast, setShowToast] = useState(true);

  // Set Toast Message Index
  const [toastIndex, setToastIndex] = useState(0); 

  // Set Toast Style Index
  const [toastStyleIndex, setToastStyleIndex] = useState(0);

  // Variable to hold SVG path (and Alt attribute for img) for Card on the first position within a Hand, so it can be passed along with the SVG for Card in second positon within hand
  const [cardIn1stPosWithinHand, setCardIn1stPosWithinHand] = useState(['', '']);

  // arrays used to map and display card options and used in part together with array cardsSet to keep track of cards set already, so they cant be set again
  const cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];
  const suits = ['spades', 'clubs', 'diamonds', 'hearts'];

  // array used to map and display number hands to be used for odds calculation
  const numberOfHands = ['2', '3', '4', '5', '6'];
  
  // Remove a Card
  const removeCard = (cardToRemove, posInHand) => {

    if (removedEmptyCard === false) {

      let arrayToSplice = resetCardFlashingBorderVariable(numOfHandsOutline);
      const cardToRemoveIndex = cardsSet[cardsSet.findIndex(card => card === cardToRemove) + 1];

      const card = arrayToSplice[cardToRemoveIndex];

      if (posInHand === 1) {
        arrayToSplice.splice(
          cardToRemoveIndex, 
          1, 
          {...card, props: {...card.props, svgPathCardOne: '', svgAltCardOne: ''}}
        );
      } else {
        arrayToSplice.splice(
          cardToRemoveIndex, 
          1, 
          {...card, props: {...card.props, svgPathCardTwo: '', svgAltCardTwo: ''}}
        );
      }

      setNumOfHandsOutline(arrayToSplice.map(c => {return {...c, props: {...c.props, emptyRemovedCardSlot: true}}}));
      showToast ? setShowToast(false) : setShowToast(true);
      setToastIndex(1)
      setToastStyleIndex(1);
      setRemovedEmptyCard(true);
      setCardSlotAfterRemoving([cardToRemove, posInHand]);

    } else {
      setNumOfHandsOutline(
        setCardBorderFlashing(cardsSet[cardsSet.findIndex(c => c === cardSlotAfterRemoving[0]) + 1], 
        cardSlotAfterRemoving[1]));
      showToast ? setShowToast(false) : setShowToast(true);
      setToastIndex(2)
      setToastStyleIndex(0);
    }
  }

  // used when a card is removed, to set the border (of the now empty card) to flash, if user attempt to delete a card before adding another one
  const setCardBorderFlashing = (handIndex, posInHand) => {
    const tempHandsArray = resetCardFlashingBorderVariable(numOfHandsOutline);

    posInHand === 1 
    ? tempHandsArray[handIndex] = {...tempHandsArray[handIndex], 
      props: {...tempHandsArray[handIndex].props, cardOneAddedError: true}}
    : tempHandsArray[handIndex] = {...tempHandsArray[handIndex], 
      props: {...tempHandsArray[handIndex].props, cardTwoAddedError: true}}

    return tempHandsArray;
  }

  // Function to add a card after one has been removed
  const addCardAfterRemoving = () => {

    const tempCardsArray = resetCardFlashingBorderVariable(numOfHandsOutline);
    const [cardRemoved, posInHand] = cardSlotAfterRemoving;
    const cardInCardsSet = cardsSet.indexOf(cardRemoved);
    const hand = numOfHandsOutline[cardsSet[cardInCardsSet + 1]];
    let handToBeSet; 

    const { svgPath, playingCard } = placeCard();

    if (posInHand === 1) {
      if (cardsSet[cardInCardsSet + 3] !== undefined) {
        handToBeSet = <CardOutline 
          svgPathCardOne={svgPath} 
          svgPathCardTwo={hand.props.svgPathCardTwo} 
          svgAltCardOne={playingCard} 
          svgAltCardTwo={hand.props.svgAltCardTwo}
          cardOneAddedError={false}
          cardTwoAddedError={false}
          emptyRemovedCardSlot={false}
          removeFunction={removeCard} />
      } else {
        handToBeSet = <CardOutline 
          svgPathCardOne={svgPath} 
          svgPathCardTwo=''
          svgAltCardOne={playingCard} 
          cardOneAddedError={false}
          emptyRemovedCardSlot={false}
          removeFunction={removeCard} />
      } 
    } else {
      handToBeSet = <CardOutline 
        svgPathCardOne={hand.props.svgPathCardOne} 
        svgPathCardTwo={svgPath} 
        svgAltCardOne={hand.props.svgAltCardOne} 
        svgAltCardTwo={playingCard}
        cardOneAddedError={false}
        cardTwoAddedError={false}
        emptyRemovedCardSlot={false}
        removeFunction={removeCard} />
    } 
    
    tempCardsArray.splice(cardsSet[cardInCardsSet + 1], 1, handToBeSet);
    setNumOfHandsOutline(tempCardsArray.map(c => {return {...c, props: {...c.props, emptyRemovedCardSlot: false}}}));
    
    const tempCardSets = [...cardsSet];
    tempCardSets.splice(
      cardInCardsSet, 
      3, 
      playingCard, 
      cardsSet[cardInCardsSet + 1], 
      posInHand);
    setCardsSet(tempCardSets);

    setCardSlotAfterRemoving([]);
    setRemovedEmptyCard(false);
  }

  const resetCardFlashingBorderVariable = (cardArrayToResetFlashProps) => {
     
    const tempArray = cardArrayToResetFlashProps.map(c => ({
      ...c,
      props: {...c.props, cardOneAddedError: false, cardTwoAddedError: false}
    }));

    return tempArray;
  }

  // used to set a card's border flashing if that card has already been added and the user is trying to add it again 
  const setCardFlashingBorder = (index, posHand) => {

    const temp = resetCardFlashingBorderVariable(numOfHandsOutline)
     
    const tempArray = temp.map((c, ind) => {
      if (ind === index && posHand === 1) {
        return {...c, props: {...c.props, cardOneAddedError: true, cardTwoAddedError: false}}
      } else if (ind === index && posHand === 2) {
        return {...c, props: {...c.props, cardTwoAddedError: true, cardOneAddedError: false}}
      } else {
        return {...c, props: {...c.props, cardOneAddedError: false, cardTwoAddedError: false}}
      }
    });

    setNumOfHandsOutline(tempArray);
  }

  // Function to reset variables
  const resetCalculation = () => {

    setSuit('');
    setCard('');
    setNumOfHandsOutline([]);
    setNextIndexOfCardstoBeSetSvgs(0);
    setCardPosWithinHand(1);
    setCardsSet([]);
    setCardIn1stPosWithinHand(['', '']);
  }

  // Funtion to select a Suit
  const handleSetSuit = (event) => {
    setNumOfHandsOutline(resetCardFlashingBorderVariable(numOfHandsOutline))
    setSuit(event.target.value);
  };

  // Funtion to select a Card
  const handleSetCard = (event) => {
    setNumOfHandsOutline(resetCardFlashingBorderVariable(numOfHandsOutline))
    setCard(event.target.value);
  };

  // Function to set how many hands will be involved in the odds calculation
  const handleSetNumOfHands = (event) => {

    const numOfHands = event.target.value;

    setNumHands(numOfHands);
    resetCalculation();

    const cardsHandOutline = [];

    for (let i = 0; i < numOfHands; i++) {
      cardsHandOutline[i] = <CardOutline svgPathCardOne='' svgPathCardTwo='' emptyRemovedCardSlot={false}/>
    }

    setNumOfHandsOutline(cardsHandOutline);
  };

  // Function to get the appropriate SVG file, and description, for the card that has been choosen 
  const placeCard = () => {
  
      let svgPath = ''
      let index;
      let playingCard;

      // Switch used to chosen the appropriate SVG path/file given the Suit and Card choosen
      switch(suit) {
        case 'clubs': {
          index = cards.findIndex(c => c === card);
          svgPath = Clubs[index];
          playingCard = `${cards[index]} clubs`;
          break;
        }
        case 'diamonds': {
          index = cards.findIndex(c => c === card);
          svgPath = Diamonds[index];
          playingCard = `${cards[index]} diamonds`;
          break;
        }
        case 'hearts': {
          index = cards.findIndex(c => c === card);
          svgPath = Hearts[index];
          playingCard = `${cards[index]} hearts`;
          break;
        }
        case 'spades': {
          index = cards.findIndex(c => c === card);
          svgPath = Spades[index];
          playingCard = `${cards[index]} spades`;
          break;
        }
        default: {
          break;
        }
      }

    return {svgPath, playingCard}
  }

  // Function to Set a Card 
  const handlePlaceCard = () => {

    // Check if both Suit and Card have values
    if (suit !== '' && card !== '') {

      // Check if the Card chosen has already been set 
      if (cardSlotAfterRemoving[0] === `${card} ${suit}` || !cardsSet.includes(`${card} ${suit}`)) {

        if (removedEmptyCard === true) {
          addCardAfterRemoving();
        } else {

          const { svgPath, playingCard } = placeCard();

          // Array to be spliced, in order to remove Card element without a SVG img, and Insert one with        
          let cardArrayWithSvg = resetCardFlashingBorderVariable(numOfHandsOutline);
          const cardSet = `${card} ${suit}`

          // Check if all Cards have been set already (already contain a SVG img)
          if (nextIndexOfCardstoBeSetSvgs <  Number(numHands)) {

            if (cardPosWithinHand === 1) {
              
              // Removing Card element without a SVG img, and Insert one with, at First Card position within Hand 
              cardArrayWithSvg.splice(
                nextIndexOfCardstoBeSetSvgs, 
                1, 
                <CardOutline 
                  svgPathCardOne={svgPath} 
                  svgPathCardTwo=''
                  svgAltCardOne={`${playingCard}`}
                  cardOneAddedError={false}
                  emptyRemovedCardSlot={false}
                  removeFunction={removeCard}
                />
              );

              setCardIn1stPosWithinHand([svgPath, `${playingCard}`]);

              // Change position within a hand where the SVG file will be inserted
              setCardPosWithinHand(2);
            } else {

              // Removing Card element without a SVG img, and Insert one with, at Second Card position within Hand 
              cardArrayWithSvg.splice(
                nextIndexOfCardstoBeSetSvgs, 
                1, 
                <CardOutline 
                  svgPathCardOne={cardIn1stPosWithinHand[0]} 
                  svgPathCardTwo={svgPath} 
                  svgAltCardOne={cardIn1stPosWithinHand[1]} 
                  svgAltCardTwo={`${playingCard}`}
                  cardOneAddedError={false}
                  cardTwoAddedError={false}
                  emptyRemovedCardSlot={false}
                  removeFunction={removeCard} 
                />
              );

              // Change position within a hand where the SVG file will be inserted
              setCardPosWithinHand(1);

              // Updating the next Card index position to be Set (receive an SVG img)
              setNextIndexOfCardstoBeSetSvgs(nextIndexOfCardstoBeSetSvgs + 1);
              
            }

            // Updating the array contained the Cards (With and Without an SVG img (otherwise just the Outline/Border))
            setNumOfHandsOutline(cardArrayWithSvg);

            // Updating Cards that were already Set (received a SVG img and were Set, so it can be choosen twice by the User)
            setCardsSet([...cardsSet, cardSet, nextIndexOfCardstoBeSetSvgs, cardPosWithinHand])

            stateRef.current = cardArrayWithSvg;
          }

        }
      } else {
        const indexOfCardInCardsSet = cardsSet.indexOf(`${card} ${suit}`);

        const indexToSetCardFlash = cardsSet[indexOfCardInCardsSet  + 1];

        const posWithHandToFlash = cardsSet[indexOfCardInCardsSet  + 2]

        // setCardAlreadyAddedError(true)
        setCardFlashingBorder(indexToSetCardFlash, posWithHandToFlash);
        
        // Trigger toast
        showToast ? setShowToast(false) : setShowToast(true);
        setToastIndex(0);
        setToastStyleIndex(0);
      }
    } 
  }

  // Function to call api to calculate the odds, for now it just shows a toast saying the Backend is still in development
  const calculateOdds = () => {
    
    setToastIndex(3)
    setToastStyleIndex(1);
    showToast ? setShowToast(false) : setShowToast(true);
  }

  return (
    <StylesProvider injectFirst>
      <Container>
        <Toast showToast={showToast} toastMessageIndex={toastIndex} toastStyleIndex={toastStyleIndex}/>
        <Title>
          <h1>Poker: Odds Calculator</h1>
        </Title>
        <HandConfigContainer>
          <HandConfigWrapContainer>
            <HandConfig>
              <FormControl component="fieldset">
                <FormLabelStyled>Card</FormLabelStyled>
                <RadioGroup aria-label="card" name="card1" value={card} onChange={handleSetCard}>

                  {cards.map((card, index) => {
                    if (index <= 8) {
                      return <FormControlLabelStyled value={card} control={<Radio />} label={<TypographyStyled>{card}</TypographyStyled>} />
                    } else {
                      return <FormControlLabelStyled value={card} control={<Radio />} label={<TypographyStyled>{card.charAt(0).toUpperCase() + card.slice(1)}</TypographyStyled>} />
                    }
                  })}

                </RadioGroup>
              </FormControl>
            </HandConfig>
            <InnerSuitAndButtonContainer>
              <HandConfig>
                <FormControl component="fieldset">
                  <FormLabelStyled>Suit</FormLabelStyled>
                  <RadioGroup aria-label="suit" name="suit1" value={suit} onChange={handleSetSuit}>

                    {suits.map(suits => <FormControlLabelStyled value={suits} control={<Radio />} label={<TypographyStyled>{suits.charAt(0).toUpperCase() + suits.slice(1)}</TypographyStyled>} />)}

                  </RadioGroup>
                </FormControl>
              </HandConfig>
              <HandConfig>
                <FormControl component="fieldset">
                  <FormLabelStyled># of Hands</FormLabelStyled>
                  <RadioGroup aria-label="numOfHands" name="numOfHands1" value={numHands} onChange={handleSetNumOfHands}>

                    {numberOfHands.map(num => <FormControlLabel value={num} control={<Radio />} label={<TypographyStyled>{num}</TypographyStyled>} />)}

                  </RadioGroup>
                </FormControl>
              </HandConfig>
              <StyledButton variant="contained" onClick={handlePlaceCard}>Set Card</StyledButton>
              <StyledButton variant="contained" onClick={() => calculateOdds()}>Calculate Odds</StyledButton>
            </InnerSuitAndButtonContainer>
          </HandConfigWrapContainer>
          <CardsContainer>

            {numOfHandsOutline.map(card => {
              return {...card, props: {...card.props, removeFunction: removeCard }}
            })}

          </CardsContainer> 
        </HandConfigContainer>
      </Container>
    </StylesProvider>
  )
}

export default Dashboard;