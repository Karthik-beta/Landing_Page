import { Button } from "./ui/button";
import { HeroCards } from "./HeroCards";
import { TypewriterText } from "./TypewriterText";

export const Hero = () => {
  return (
    <section
      id="hero"
      className="container grid lg:grid-cols-2 place-items-center py-10 md:py-32 gap-10"
    >
      <div className="text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
            <span className="inline bg-linear-to-r from-[#F596D3] to-[#D247BF] text-transparent bg-clip-text gradient-shimmer">
              Better
            </span>{" "}
            Solutions
          </h1>{" "}
          for Your{" "}
          <h2 className="inline">
            <TypewriterText
              words={["Business", "Teams", "Growth", "Success", "Future"]}
              className="inline bg-linear-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text"
              typeSpeed={120}
              deleteSpeed={80}
              delayBetweenWords={2500}
              showCursor={true}
              cursorClassName="bg-linear-to-r from-[#61DAFB] to-[#03a3d7]"
            />{" "}
            {/* developers */}
          </h2>
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          Transforming Obstacles into Opportunities with Pioneering Technology.
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Button
            className="w-full md:w-1/3"
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          >
            Get Started
          </Button>

          {/* <a
            rel="noreferrer noopener"
            href="https://github.com/leoMirandaa/shadcn-landing-page.git"
            target="_blank"
            className={`w-full md:w-1/3 ${buttonVariants({
              variant: "outline-solid",
            })}`}
          >
            Github Repository
            <GitHubLogoIcon className="ml-2 w-5 h-5" />
          </a> */}
        </div>
      </div>

      {/* Hero cards sections */}
      <div className="z-10">
        <HeroCards />
      </div>

      {/* Shadow effect */}
      <div className="shadow"></div>
    </section>
  );
};
