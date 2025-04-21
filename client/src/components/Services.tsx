import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { MagnifierIcon, WalletIcon, ChartIcon } from "./Icons";
import servicePicture from "../assets/undraw_business-chat_xea1.svg";

interface ServiceProps {
  title: string;
  description: string;
  icon: JSX.Element;
}

const serviceList: ServiceProps[] = [
  {
    title: "Enterprise Software Solutions",
    description:
      "Transform your business with expert implementation and integration of cutting-edge SaaS, ERP systems, and custom enterprise applications.",
    icon: <ChartIcon />,
  },
  {
    title: "Cloud & Infrastructure Services",
    description:
      "Build a scalable and secure foundation for your operations with our cloud, network, computing power, and flexible storage solutions.",
    icon: <WalletIcon />,
  },
  {
    title: "Managed Services & Support",
    description:
      "Ensure peak performance and reliability with 24/7 dedicated support, seamless system management, and continuous optimization for your technology ecosystem.",
    icon: <MagnifierIcon />,
  },
];

export const Services = () => {
  return (
    <section className="container py-24 sm:py-32">
      <div className="grid lg:grid-cols-[1fr,1fr] gap-8 place-items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-center">
            <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            Our{" "}
            </span>
            Services
          </h2>

          <p className="text-muted-foreground text-xl mt-4 mb-8 text-center">
            We offer a comprehensive suite of technology services designed to empower your enterprise, from strategic implementation to robust infrastructure and ongoing support.
          </p>

          <div className="flex flex-col gap-8">
            {serviceList.map(({ icon, title, description }: ServiceProps) => (
              <Card key={title}>
                <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
                  <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
                    {icon}
                  </div>
                  <div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription className="text-md mt-2">
                      {description}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        <img
          src={servicePicture}
          className="w-[300px] md:w-[500px] lg:w-[600px] object-contain"
          alt="About services"
          width={600} // Set to the largest width used (matches lg:w-[600px])
          height={400} // Set to the expected aspect ratio (adjust as needed)
        />
      </div>
    </section>
  );
};
