import { useState, useEffect } from 'react';

interface UseTypewriterOptions {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  delayBetweenWords?: number;
  loop?: boolean;
}

export const useTypewriter = ({
  words,
  typeSpeed = 150,
  deleteSpeed = 100,
  delayBetweenWords = 2000,
  loop = true,
}: UseTypewriterOptions) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    if (words.length === 0) return;

    const currentWord = words[currentWordIndex];

    const timeout = setTimeout(() => {
      if (isWaiting) {
        setIsWaiting(false);
        setIsDeleting(true);
        return;
      }

      if (isDeleting) {
        // Deleting characters
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          // Finished deleting, move to next word
          setIsDeleting(false);
          setCurrentWordIndex((prevIndex) => {
            const nextIndex = (prevIndex + 1) % words.length;
            // If we've cycled through all words and loop is false, stop
            if (!loop && nextIndex === 0 && prevIndex === words.length - 1) {
              return prevIndex;
            }
            return nextIndex;
          });
        }
      } else {
        // Typing characters
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        } else {
          // Finished typing, wait before deleting
          setIsWaiting(true);
        }
      }
    }, isWaiting ? delayBetweenWords : isDeleting ? deleteSpeed : typeSpeed);

    return () => clearTimeout(timeout);
  }, [
    currentText,
    currentWordIndex,
    isDeleting,
    isWaiting,
    words,
    typeSpeed,
    deleteSpeed,
    delayBetweenWords,
    loop,
  ]);

  return {
    text: currentText,
    isDeleting,
    isComplete: !loop && currentWordIndex === words.length - 1 && currentText === words[words.length - 1],
  };
};
