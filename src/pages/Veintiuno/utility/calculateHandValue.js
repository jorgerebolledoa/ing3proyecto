export const calculateHandValue = (hand) => {
  let value = 0;
  let aceCount = 0;

  hand.forEach((card) => {
    if (card.rank === "J" || card.rank === "Q" || card.rank === "K") {
      value += 10;
    } else if (card.rank === "A") {
      aceCount += 1;
      value += 11;
    } else {
      value += parseInt(card.rank);
    }
  });

  while (value > 21 && aceCount > 0) {
    value -= 10;
    aceCount -= 1;
  }

  return value;
};
