import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import inventoryIllustration from "../assets/inventory-illustration.svg";
import hrmsIllustration from "../assets/hrms-illustration.svg";
import crmIllustration from "../assets/crm-illustration.svg"; // Import illustrations

interface ProductProps {
  title: string;
  description: string;
  illustration: string; 
  url: string;
}

const products: ProductProps[] = [
  {
    title: "Inventory Management System",
    description:
      "Optimize your inventory with real-time tracking, automated stock updates, and insightful analytics.",
    illustration: inventoryIllustration, 
    url: "https://inventory.pivotr.in"
  },
  {
    title: "Human Resource Management System (HRMS)",
    description:
      "Streamline HR processes with tools for payroll, attendance, recruitment, and employee engagement.",
    illustration: hrmsIllustration, 
    url: ""
  },
  {
    title: "Customer Relationship Management (CRM)",
    description:
      "Enhance customer relationships with a centralized platform for sales, marketing, and support.",
    illustration: crmIllustration, 
    url: ""
  },
];

export const Products = () => {
  return (
    <section
      id="products"
      className="container py-12 sm:py-24 space-y-8"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center">
        Our{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Products
        </span>
      </h2>
      <p className="md:w-3/4 mx-auto text-xl text-muted-foreground text-center">
        Explore our suite of B2B software solutions designed to drive efficiency, productivity, and growth for your business.
      </p>

      <div className="space-y-24">
        {products.map(({ title, description, illustration, url }: ProductProps, index) => (
          <div
            key={title}
            className={`relative flex flex-col lg:flex-row items-center gap-12 ${
              index % 2 === 0 ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* Illustration */}
            <div className="w-full lg:w-1/2 relative">
              <img
                src={illustration}
                alt={`${title} illustration`}
                className="w-full h-auto"
              />
            </div>

            {/* Product Details */}
            <div className="w-full lg:w-1/2">
              <Card className="bg-muted/50 shadow-lg rounded-lg overflow-hidden transition-transform hover:scale-105 duration-300">
                <CardHeader className="p-8 bg-gradient-to-r from-primary/10 to-primary/20">
                  <CardTitle className="text-2xl font-semibold text-primary text-center">
                    {title}
                  </CardTitle>
                </CardHeader>
                {/* <CardContent className="p-8 text-muted-foreground space-y-4">
                  <p className="text-base leading-relaxed">{description}</p>
                  <div className="flex justify-center">
                    <button className="px-6 py-2 bg-primary text-white rounded-md shadow-md hover:bg-primary/90 transition-colors">
                      Try Demo
                    </button>
                  </div>
                </CardContent> */}
                <CardContent className="p-8 text-muted-foreground space-y-4">
                  <p className="text-base leading-relaxed">{description}</p>
                  <div className="flex justify-center">
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2 bg-primary text-white rounded-md shadow-md hover:bg-primary/90 transition-colors"
                    >
                      Try Demo
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};