import { Button } from "./ui/button";
import { toast } from "sonner";

/**
 * Renders the Call to Action (CTA) section of the website.
 *
 * This component displays a headline, a brief description, and two buttons:
 * "Request a Demo" and "View all features". Clicking these buttons will
 * trigger a toast notification and scroll the user to the corresponding
 * section of the page.
 *
 * @returns {JSX.Element} The rendered CTA section.
 */
export const Cta = () => {
  const handleDemoRequest = () => {
    toast.success("🎯 Great choice! Taking you to our contact form.", {
      description: "We'll map a quick demo to your shop-floor and office workflows.",
      duration: 3000,
    });

    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 500);
  };

  const handleViewFeatures = () => {
    toast.info("📋 Exploring on-prem and edge-ready capabilities", {
      duration: 2500,
    });

    setTimeout(() => {
      document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
    }, 500);
  };
  return (
    <section id="cta" className="bg-muted/50 py-16 my-24 sm:my-32">
      <div className="container lg:grid lg:grid-cols-2 place-items-center">
        <div className="lg:col-start-1">
          <h2 className="text-3xl md:text-4xl font-bold ">
            Ready to
            <span className="bg-linear-to-b from-primary/60 to-primary text-transparent bg-clip-text">
              {" "}
              Modernize Your Operations{" "}
            </span>
            ?
          </h2>
          <p className="text-muted-foreground text-xl mt-4 mb-8 lg:mb-0">
            Serve your plants with on-prem and edge-ready deployments, perpetual licensing, and a
            lean team on your side to keep production, maintenance, and workforce data in sync.
          </p>
        </div>

        <div className="space-y-4 lg:col-start-2">
          <Button
            className="w-full md:mr-4 md:w-auto transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
            onClick={handleDemoRequest}
          >
            Request a Demo
          </Button>
          <Button
            variant="outline"
            className="w-full md:w-auto transition-all duration-300 hover:scale-105 hover:shadow-md"
            onClick={handleViewFeatures}
          >
            View all features
          </Button>
        </div>
      </div>
    </section>
  );
};
