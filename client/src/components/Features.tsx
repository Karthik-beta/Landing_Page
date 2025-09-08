import { Badge } from "./ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import cloudImage from "../assets/undraw_cloud-hosting_tfeh.svg";
import serverImage from "../assets/undraw_secure-server_lz9x.svg";
import iotImage from "../assets/undraw_visionary-technology_6ouq.svg";

interface FeatureProps {
  title: string;
  description: string;
  image: string;
}

const features: FeatureProps[] = [
  {
    title: "SaaS Solutions",
    description:
      "Enterprise-grade cloud applications for business transformation, including ERP systems, accelerating performance and automating workflows.",
    image: cloudImage,
  },
  {
    title: "Infrastructure Services",
    description:
      "Scalable cloud and network solutions building a robust foundation for enterprise operations, encompassing powerful computing, flexible storage, and advanced security measures.",
    image: serverImage,
  },
  {
    title: "IoT Integrations",
    description:
      "Smart enterprise networks that harness real-time sensor data to optimize operations, predict maintenance needs, and drive strategic improvements.",
    image: iotImage,
  },
];

const featureList: string[] = [
  "Enterprise Solutions",
  "SaaS",
  "ERP",
  "IoT Integration",
  "Cloud Solutions",
  "Scalability",
  "Seamless Integration",
  "Built-in Security",
  "Automation",
  "Data Insights",
  "Digital Transformation",
  "Workflow Optimization",
  "Infrastructure",
];

export const Features = () => {
  return (
    <section id="features" className="container py-24 sm:py-32 space-y-8">
      <h2 className="text-3xl lg:text-4xl font-bold text-center">
        Our Core{" "}
        <span className="bg-linear-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Capabilities
        </span>
      </h2>
      <p className="md:w-3/4 mx-auto text-xl text-muted-foreground text-center">
        Discover the key solutions Pivotr provides to drive efficiency, insight, and growth in your
        enterprise.
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        {featureList.map((feature: string) => (
          <div key={feature}>
            <Badge variant="secondary" className="text-sm">
              {feature}
            </Badge>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map(({ title, description, image }: FeatureProps) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>

            <CardContent>{description}</CardContent>

            <CardFooter>
              <img src={image} alt="About feature" className="w-[200px] lg:w-[300px] mx-auto" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
