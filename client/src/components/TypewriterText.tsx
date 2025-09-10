import { useTypewriter } from "../hooks/use-typewriter";

/**
 * Props for the TypewriterText component.
 * @interface TypewriterTextProps
 */
interface TypewriterTextProps {
  /** An array of words to be typed and deleted. */
  words: string[];
  /** Additional CSS classes for the component. */
  className?: string;
  /** The speed at which to type the words, in milliseconds per character. */
  typeSpeed?: number;
  /** The speed at which to delete the words, in milliseconds per character. */
  deleteSpeed?: number;
  /** The delay between words, in milliseconds. */
  delayBetweenWords?: number;
  /** Whether the typewriter effect should loop indefinitely. */
  loop?: boolean;
  /** Whether to show the cursor. */
  showCursor?: boolean;
  /** Additional CSS classes for the cursor. */
  cursorClassName?: string;
}

/**
 * A component that displays text with a typewriter effect.
 *
 * This component types out and deletes a series of words, creating a dynamic
 * and engaging text effect. The speed and behavior of the effect can be
 * customized through props.
 *
 * @param {TypewriterTextProps} props The props for the component.
 * @returns {JSX.Element} The rendered typewriter text.
 */
export const TypewriterText = ({
  words,
  className = "",
  typeSpeed = 150,
  deleteSpeed = 100,
  delayBetweenWords = 2000,
  loop = true,
  showCursor = true,
  cursorClassName = "",
}: TypewriterTextProps) => {
  const { text, isDeleting } = useTypewriter({
    words,
    typeSpeed,
    deleteSpeed,
    delayBetweenWords,
    loop,
  });

  return (
    <span className={className}>
      {text}
      {showCursor && (
        <span
          className={`inline-block w-0.5 h-[1em] ml-1 transition-colors duration-300 ${
            isDeleting
              ? "bg-red-400 animate-pulse"
              : "bg-linear-to-b from-[#61DAFB] to-[#03a3d7] animate-pulse"
          } ${cursorClassName}`}
          style={{
            animationDuration: isDeleting ? "0.5s" : "1s",
          }}
        />
      )}
    </span>
  );
};
