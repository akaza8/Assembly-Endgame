import { languages } from "./components/languages";
import Confetti from "react-confetti";
import clsx from "clsx";
import { getRandomWord } from "./components/utils";
import { useState } from "react";
const AssemblyEndgame = () => {
  // state values
  const [currentWord, setCurrentWord] = useState(() => getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  // derived values
  // static values
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const addGuessedLetter = (letter: string)  => {
    setGuessedLetters(prevLetters => prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]);
  };
  const languageElement = languages.map((lang, index) => {
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
    return <span key={index}>{words.toUpperCase()}</span>;
  });
  const keyboardElements = alphabet.split("").map((letter) => {
    return <button key={letter} onClick={()=>addGuessedLetter(letter)}>{letter.toUpperCase()}</button>;
  });
  return (
    <main>
      <header>
        <h1>Assembly Endgame</h1>
        <p>
          Guess the word within 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>
      <section>
        <h2>You win!</h2>
        <p>Well done! 🎉</p>
      </section>
      <section className="language-chips">{languageElement}</section>
      <section className="word">{latterElements}</section>
      <section className="keyboard">{keyboardElements}</section>
      <button className="new-game">New Game</button>
    </main>
  );
};

export default AssemblyEndgame;
