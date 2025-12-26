import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/**
 * Props for a single FAQ item.
 * @interface FAQProps
 */
interface FAQProps {
  /** The question for the FAQ item. */
  question: string;
  /** The answer to the question. */
  answer: string;
  /** A unique value for the accordion item. */
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "Do you support on-prem and air-gapped plants?",
    answer:
      "Yes. We deploy on-prem with edge gateways that sync when connectivity is available, keeping production, maintenance, and workforce data flowing even in low-bandwidth sites.",
    value: "item-1",
  },
  {
    question: "Can we use perpetual licenses with a small team?",
    answer:
      "Absolutely. We offer perpetual licensing with light support retainers so lean teams can stay compliant and keep costs predictable.",
    value: "item-2",
  },
  {
    question: "How fast can we go live in a brownfield environment?",
    answer:
      "Most customers start in 2–4 weeks: connect a few lines, baseline data flows, and expand in phases without disrupting existing systems.",
    value: "item-3",
  },
  {
    question: "How do you handle plant-floor integrations?",
    answer:
      "We connect to common PLC/SCADA signals, sensors, and existing ERPs via lightweight adapters and APIs, keeping your current stack intact.",
    value: "item-4",
  },
  {
    question: "Who owns the data and where is it stored?",
    answer:
      "You own your data. For on-prem, it stays within your network; for hybrid, we follow your residency and retention rules.",
    value: "item-5",
  },
  {
    question: "What uptime and support do you provide?",
    answer:
      "We target >99.5% for on-prem/edge footprints and provide business-hours support with an option for 24/7 coverage when needed.",
    value: "item-6",
  },
  {
    question: "Can you work with low or unstable bandwidth?",
    answer:
      "Yes. The edge layer buffers data and resyncs when links recover, so operators can continue locally without losing history.",
    value: "item-7",
  },
  {
    question: "How do you keep changes manageable for operators?",
    answer:
      "We roll out in small steps with clear SOP updates, operator prompts, and optional training so shifts aren’t overwhelmed.",
    value: "item-8",
  },
];

/**
 * Renders the Frequently Asked Questions (FAQ) section.
 *
 * This component displays a list of questions and answers in an accordion,
 * allowing users to expand each question to see the answer. It also includes
 * a link to the contact section for further inquiries.
 *
 * @returns {JSX.Element} The rendered FAQ section.
 */
export const FAQ = () => {
  return (
    <section id="faq" className="container py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Frequently Asked{" "}
        <span className="bg-linear-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Questions
        </span>
      </h2>

      <Accordion type="single" collapsible className="w-full AccordionRoot">
        {FAQList.map(({ question, answer, value }: FAQProps) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left">{question}</AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h3 className="font-medium mt-4">
        Still have questions?{" "}
        <a
          rel="noreferrer noopener"
          href="#contact"
          className="text-primary transition-all border-primary hover:border-b-2"
        >
          Contact us
        </a>
      </h3>
    </section>
  );
};
