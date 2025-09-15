import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

/**
 * Props for the Toaster component.
 * @interface ToasterProps
 */
type ToasterProps = React.ComponentProps<typeof Sonner>;

/**
 * A toaster component for displaying notifications.
 *
 * This component is a wrapper around the `sonner` library, with default
 * styling to match the application's theme.
 *
 * @param {ToasterProps} props The props for the component.
 * @returns {JSX.Element} The rendered toaster.
 */
const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
