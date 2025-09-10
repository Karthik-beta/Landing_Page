/**
 * Renders a section with key statistics.
 *
 * This component displays a grid of statistics, such as customer support
 * availability, efficiency gains, and cost reduction.
 *
 * @returns {JSX.Element} The rendered statistics section.
 */
export const Statistics = () => {
  /**
   * Props for a single statistic item.
   * @interface statsProps
   */
  interface statsProps {
    /** The numerical value or quantity of the statistic. */
    quantity: string;
    /** A brief description of the statistic. */
    description: string;
  }

  const stats: statsProps[] = [
    {
      quantity: "24/7",
      description: "Customer Support",
    },
    {
      quantity: "50%",
      description: "Efficiency Gains",
    },
    {
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
          <div key={description} className="space-y-2 text-center">
            <h2 className="text-3xl sm:text-3xl font-bold ">{quantity}</h2>
            <p className="text-xl text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
