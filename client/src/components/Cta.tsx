import { Button } from "./ui/button";

export const Cta = () => {
  return (
    <section
      id="cta"
      className="bg-muted/50 py-16 my-24 sm:my-32"
    >
      <div className="container lg:grid lg:grid-cols-2 place-items-center">
        <div className="lg:col-start-1">
          <h2 className="text-3xl md:text-4xl font-bold ">
              Ready to
            <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
              {" "}
              Transform Your Business{" "}
            </span>
            ?
          </h2>
          <p className="text-muted-foreground text-xl mt-4 mb-8 lg:mb-0">
            Streamline operations, boost efficiency, and drive enterprise growth with our integrated technology solutions.
          </p>
        </div>

        <div className="space-y-4 lg:col-start-2">
          <Button className="w-full md:mr-4 md:w-auto" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>Request a Demo</Button>
          <Button
            asChild
            variant="outline"
            className="w-full md:w-auto"
          >
            <a href="#products">View all features</a>
          </Button>
        </div>
      </div>
    </section>
  );
};
