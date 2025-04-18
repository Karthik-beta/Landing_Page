export const Statistics = () => {
  interface statsProps {
    quantity: string;
    description: string;
  }

  const stats: statsProps[] = [
    // {
    //   quantity: "2.7K+",
    //   description: "Users",
    // },
    // {
    //   quantity: "1.8K+",
    //   description: "Subscribers",
    // },
    // {
    //   quantity: "112",
    //   description: "Downloads",
    // },
    // {
    //   quantity: "4",
    //   description: "Products",
    // },
    {
      quantity: "24/7",
      description: "Customer Support",
    },
    {
      quantity: "50%",
      description: "Efficiency Gains",
    },
    // {
    //   quantity: "2x",
    //   description: "Faster Deployment",
    // },
    {
      // quantity: "ISO 27001",
      quantity: "30%",
      description: "Cost Reduction",
    },
    {
      quantity: "100+",
      description: "Happy Customers",
    },
  ];

  return (
    <section id="statistics">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map(({ quantity, description }: statsProps) => (
          <div
            key={description}
            className="space-y-2 text-center"
          >
            <h2 className="text-3xl sm:text-3xl font-bold ">{quantity}</h2>
            <p className="text-xl text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
