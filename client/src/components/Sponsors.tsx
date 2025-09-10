import m2nxt from "../assets/m2nxt.png";
import barbarian from "../assets/barbarian.webp";
import opticos from "../assets/opticos.svg";
import quansys from "../assets/quansys.png";
import dwpGlobal from "../assets/dwp-global.png";
// import vikas from "../assets/vikas.jpg";
import vikasSchool from "../assets/vikas-school.png";
import planafin from "../assets/planafin.png";
import adian from "../assets/Adian.png";
import irTech from "../assets/IR_tech.png"; // Assuming you have this image

/**
 * Props for a single client item.
 * @interface ClientProps
 */
interface ClientProps {
  // Renamed interface for clarity
  /** An optional icon for the client. */
  icon?: React.JSX.Element; // Icon is optional, you'll likely use images for logos
  /** The URL of the client's logo. */
  image?: string; // Added image property for logos
  /** The name of the client. */
  name: string;
  /** An optional URL for the client's website or case study. */
  url?: string; // Optional: Add URL for clicking through to client websites/case studies
}

const clients: ClientProps[] = [
  {
    // You'll replace these with actual client logos (as image paths or SVG components)
    // icon: <Radar size={34} />,
    image: m2nxt,
    name: "M2NXT", // Replace with actual client name
    url: "#", // Optional: Link to client website or a case study page
  },
  {
    // icon: <Radar size={34} />,
    image: barbarian,
    name: "Barbarian",
    url: "#",
  },
  {
    // icon: <Radar size={34} />,
    image: opticos,
    name: "Opticos",
    url: "#",
  },
  {
    // icon: <Radar size={34} />,
    image: quansys,
    name: "Quansys",
    url: "#",
  },
  {
    // icon: <Radar size={34} />,
    image: dwpGlobal,
    name: "DWP Global",
    url: "#",
  },
  // {
  //   // icon: <Radar size={34} />,
  //   image: vikas,
  //   name: "Vikas",
  //   url: "#"
  // },
  {
    // icon: <Radar size={34} />,
    image: vikasSchool,
    name: "Vikas School",
    url: "#",
  },
  {
    image: planafin,
    name: "Planafin",
    url: "#",
  },
  {
    image: adian,
    name: "Adian",
    url: "#",
  },
  {
    image: irTech,
    name: "IR Tech",
    url: "#",
  },
];

/**
 * Renders a section displaying the logos of trusted clients.
 *
 * This component features two horizontally scrolling rows of client logos,
 * creating a dynamic and visually engaging display.
 *
 * @returns {JSX.Element} The rendered clients section.
 */
// Renamed component for clarity - you can keep 'Sponsors' if you prefer
export const ClientsSection = () => {
  // Renamed component for clarity
  // Split clients into two rows
  const firstRow = clients.slice(0, Math.ceil(clients.length / 2));
  const secondRow = clients.slice(Math.ceil(clients.length / 2));

  const LogoItem = ({ client }: { client: ClientProps }) => (
    <div className="flex justify-center items-center w-32 h-12 text-muted-foreground hover:opacity-100 transition-opacity shrink-0 mx-4">
      <a
        href={client.url || "#"}
        target="_blank"
        rel="noreferrer noopener"
        className="flex justify-center items-center w-full h-full"
      >
        {client.icon && <span>{client.icon}</span>}
        {client.image && (
          <img
            src={client.image}
            alt={`${client.name} Logo`}
            width={120}
            height={40}
            loading="lazy"
            className="h-10 object-contain grayscale opacity-60 hover:grayscale-0 transition-all"
          />
        )}
      </a>
    </div>
  );

  return (
    <section id="clients" className="container pt-6 pb-6 sm:py-32">
      <h2 className="text-center text-md lg:text-xl font-bold mb-8 text-primary">
        Our Trusted Clients
      </h2>

      <div className="relative overflow-hidden space-y-6">
        {/* First row - sliding left to right */}
        <div className="flex scroll-left">
          {/* Triple the logos for seamless infinite scroll */}
          {[...firstRow, ...secondRow, ...firstRow].map((client, index) => (
            <LogoItem key={`first-${client.name}-${index}`} client={client} />
          ))}
        </div>

        {/* Second row - sliding right to left */}
        <div className="flex scroll-right" style={{ transform: "translateX(-50%)" }}>
          {/* Triple the logos for seamless infinite scroll */}
          {[...secondRow, ...firstRow, ...secondRow, ...firstRow, ...secondRow].map(
            (client, index) => (
              <LogoItem key={`second-${client.name}-${index}`} client={client} />
            ),
          )}
        </div>
      </div>
    </section>
  );
};
