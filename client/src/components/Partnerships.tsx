import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import microsoft from "../assets/Microsoft_logo.svg";
import lenovo from "../assets/Lenovo_logo.svg";
import HP from "../assets/HP_logo.svg"; 
import dell from "../assets/Dell_logo.svg";

const partners = [
  {
    name: "Microsoft",
    logo: microsoft,
    description: "Empowering every person and organization on the planet to achieve more through innovative software and cloud solutions.",
  },
  {
    name: "Lenovo",
    logo: lenovo,
    description: "Delivering smarter technology for all with cutting-edge devices and IT solutions.",
  },
  {
    name: "Dell",
    logo: dell,
    description: "Empowering businesses and individuals with innovative technology solutions to drive growth and productivity.",
  },
  {
    name: "Hewlett-Packard",
    logo: HP,
    description: "Revolutionizing the way people work and live with sustainable and innovative technology solutions.",
  },
];

export const Partnerships = () => {
  return (
    <section id="partnerships" className="py-24 sm:py-32 bg-muted">
        <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
            Our{" "}
            <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            Partnerships
            </span>
        </h2>
        <p className="text-xl text-muted-foreground text-center mt-4 mb-12">
            Collaborating with industry leaders to deliver exceptional value and innovation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partners.map(({ name, logo, description }) => (
            <Card key={name} className="shadow-lg hover:scale-105 transition-transform">
                <CardHeader className="flex flex-col items-center space-y-4 p-6">
                <img
                    src={logo}
                    alt={`${name} logo`}
                    className="w-24 h-24 object-contain block"
                />
                <CardTitle className="text-center text-lg font-semibold">
                    {name}
                </CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground px-6">
                {description}
                </CardContent>
            </Card>
            ))}
        </div>
      </div>
    </section>
  );
};