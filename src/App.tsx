import { languages } from "./components/languages";
import Confetti from "react-confetti";
import clsx from "clsx";
import { getRandomWord, getFarewellText } from "./components/utils";
import { useState } from "react";
const AssemblyEndgame = () => {
  // state values
  const [currentWord,setcurrentWord] = useState(() => getRandomWord());
  // console.log(currentWord)
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  // derived values
  const numGuessesLeft = languages.length - 1;
  const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)
  ).length;
  const isGameWon = currentWord
    .split("")
    .every((letter) => guessedLetters.includes(letter));
  const isGameLost = wrongGuessCount >= numGuessesLeft;
  const isGameOver = isGameLost || isGameWon;
  const lastGuessedWord = guessedLetters[guessedLetters.length - 1];
  const isLastGuessIncorrect =
    lastGuessedWord && !currentWord.includes(lastGuessedWord);

  // static values
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const addGuessedLetter = (letter: string) => {
    setGuessedLetters((prevLetters) =>
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
    );
  };
  const languageElement = languages.map((lang) => {
    const styles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color,
    };
    const className = clsx("chip");
    return (
      <span key={lang.name} style={styles} className={className}>
        {lang.name}
      </span>
    );
  });
  const latterElements = currentWord.split("").map((words, index) => {
    const shouldRevealLetter = isGameLost || guessedLetters.includes(words);
    const letterClassName = clsx(
      isGameLost && !guessedLetters.includes(words) && "missed-letter"
    );
    return (
      <span key={index} className={letterClassName}>
        {shouldRevealLetter ? words.toUpperCase() : ""}
      </span>
    );
  });
  const keyboardElements = alphabet.split("").map((letter) => {
    return (
      <button key={letter} onClick={() => addGuessedLetter(letter)}>
        {letter.toUpperCase()}
      </button>
    );
  });
  const gameStatusClass = clsx(
    "game-status",{
      "won":isGameWon,
      "lost":isGameLost,
      "farewell":!isGameOver && isLastGuessIncorrect
    }
  )
  function renderGameStatus() {
    if (!isGameOver && isLastGuessIncorrect) {
      return (
        <p className="farewell-message">
          {getFarewellText(languages[wrongGuessCount - 1].name)}
        </p>
      );
    }

    if (isGameWon) {
      return (
        <>
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
        </>
      );
    }
    if (isGameLost) {
      return (
        <>
          <h2>Game over!</h2>
          <p>You lose! Better start learning Assembly 😭</p>
        </>
      );
    }

    return null;
  }
  function resetGame():void{
    setcurrentWord(getRandomWord());
    setGuessedLetters([]);
  }
  return (
    <main>
      {isGameWon && <Confetti />}
      <header>
        <h1>Assembly Endgame</h1>
        <p>
          Guess the word within 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>
      <section className={gameStatusClass}>{renderGameStatus()}</section>
      <section className="language-chips">{languageElement}</section>
      <section className="word">{latterElements}</section>
      <section className="keyboard">{keyboardElements}</section>
      {isGameOver && <button className="new-game" onClick={resetGame}>New Game</button>}
    </main>
  );
};

export default AssemblyEndgame;

