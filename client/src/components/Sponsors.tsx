// import { Radar } from "lucide-react";

// interface SponsorProps {
//   icon: JSX.Element;
//   name: string;
// }

// const sponsors: SponsorProps[] = [
//   {
//     icon: <Radar size={34} />,
//     name: "Sponsor 1",
//   },
//   {
//     icon: <Radar size={34} />,
//     name: "Sponsor 2",
//   },
//   {
//     icon: <Radar size={34} />,
//     name: "Sponsor 3",
//   },
//   {
//     icon: <Radar size={34} />,
//     name: "Sponsor 4",
//   },
//   {
//     icon: <Radar size={34} />,
//     name: "Sponsor 5",
//   },
//   {
//     icon: <Radar size={34} />,
//     name: "Sponsor 6",
//   },
// ];

// export const Sponsors = () => {
//   return (
//     <section
//       id="sponsors"
//       className="container pt-24 sm:py-32"
//     >
//       <h2 className="text-center text-md lg:text-xl font-bold mb-8 text-primary">
//         Investors and founders
//       </h2>

//       <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
//         {sponsors.map(({ icon, name }: SponsorProps) => (
//           <div
//             key={name}
//             className="flex items-center gap-1 text-muted-foreground/60"
//           >
//             <span>{icon}</span>
//             <h3 className="text-xl  font-bold">{name}</h3>
//           </div>
//         ))}
//       </div>
//     </section>
//   );

import m2nxt from "../assets/m2nxt.png"; 
import barbarian from "../assets/barbarian.png";
import opticos from "../assets/opticos.svg"; 
import quansys from "../assets/quansys.png";
import dwpGlobal from "../assets/dwp-global.png"; 
import vikas from "../assets/vikas.jpg"; 

interface ClientProps { // Renamed interface for clarity
  icon?: JSX.Element; // Icon is optional, you'll likely use images for logos
  image?: string; // Added image property for logos
  name: string;
  url?: string; // Optional: Add URL for clicking through to client websites/case studies
}

const clients: ClientProps[] = [
  {
    // You'll replace these with actual client logos (as image paths or SVG components)
    // icon: <Radar size={34} />,
    image: m2nxt,
    name: "M2NXT", // Replace with actual client name
    url: "#" // Optional: Link to client website or a case study page
  },
  {
    // icon: <Radar size={34} />,
    image: barbarian,
    name: "Barbarian",
    url: "#"
  },
  {
    // icon: <Radar size={34} />,
    image: opticos,
    name: "Opticos",
     url: "#"
  },
  {
    // icon: <Radar size={34} />,
    image: quansys,
    name: "Quansys",
     url: "#"
  },
  {
    // icon: <Radar size={34} />,
    image: dwpGlobal,
    name: "DWP Global",
     url: "#"
  },
  {
    // icon: <Radar size={34} />,
    image: vikas,
    name: "Vikas",
     url: "#"
  },
];

// Renamed component for clarity - you can keep 'Sponsors' if you prefer
export const ClientsSection = () => { // Renamed component for clarity
  return (
    <section
      id="clients" // Changed ID to reflect content
      className="container pt-24 sm:py-32"
    >
      <h2 className="text-center text-md lg:text-xl font-bold mb-8 text-primary">
        {/* Updated Title */}
        Our Trusted Clients
      </h2>

      <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8"> {/* Kept flex container */}
        {clients.map(({ icon, image, name, url }: ClientProps) => (
          <a
             key={name}
             href={url || "#"}
             target="_blank"
             rel="noreferrer noopener"
             // Added fixed width (w-32) and height (h-12) to the container
             // Used flex centering (justify-center, items-center)
             className="flex justify-center items-center w-32 h-12 text-muted-foreground hover:opacity-100 transition-opacity" // Adjust w-32 and h-12 as needed
           >
             {/* Render icon or image */}
            {icon && <span>{icon}</span>}
            {image && (
                <img
                    src={image}
                    alt={`${name} Logo`}
                    // Kept h-10 and object-contain to fit within the container
                    className="h-10 object-contain grayscale opacity-60 hover:grayscale-0 transition-all"
                />
            )}
             {/* Hide name text if using image logo */}
             {/* Removed h3 text rendering here as logos usually replace text */}
           </a>
        ))}
      </div>
    </section>
  );
};