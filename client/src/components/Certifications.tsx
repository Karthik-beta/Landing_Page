import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import soc2 from "../assets/soc.png";
import iso from "../assets/iso_27001.png";
import gdpr from "../assets/gdpr.jpg";
import csa from "../assets/csa_star.png";

export const Certifications = () => {
  return (
    <section id="certifications" className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-primary">Certifications & Compliance</h2>
        <p className="text-center text-muted-foreground mt-4">
          Trusted by enterprises worldwide, we adhere to the highest standards of security and compliance.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {/* Certification 1 */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-col items-center">
              <img
                src={iso}
                alt="ISO 27001 Certification"
                className="h-24 w-24 mb-2"
              />
              <CardTitle className="text-xl">ISO 27001 Certified</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Recognized globally for implementing the highest standards of information security management.
              </CardDescription>
              <div className="flex flex-wrap md:justify-center gap-2 mt-4">
                <Badge variant="secondary">Enterprise-Grade</Badge>
                {/* <Badge variant="outline">Verified Compliance</Badge> */}
                <Badge variant="secondary">Global Standard</Badge>
              </div>            
            </CardContent>
          </Card>

          {/* Certification 2 */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-col items-center">
              <img
                src={soc2}
                alt="SOC 2 Certification"
                className="h-24 w-24 mb-2"
              />
              <CardTitle className="text-xl">SOC 2 Type II</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Demonstrates our commitment to data security, availability, and confidentiality for enterprise clients.
              </CardDescription>
              <div className="flex flex-wrap md:justify-center gap-2 mt-4">
                <Badge variant="secondary">Trusted Globally</Badge>
                <Badge variant="secondary">Secure by Design</Badge>
                {/* <Badge variant="secondary">Audit Ready</Badge> */}
              </div>   
            </CardContent>
          </Card>

          {/* Certification 3 */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-col items-center">
              <img
                src={gdpr}
                alt="GDPR Compliance"
                className="h-24 w-24 mb-2"
              />
              <CardTitle className="text-xl">GDPR Compliant</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Fully compliant with EU data protection regulations, ensuring privacy and security for all users.
              </CardDescription>
              <div className="flex flex-wrap md:justify-center gap-2 mt-4">
                <Badge variant="secondary">Data Privacy</Badge>
                <Badge variant="secondary">EU Compliant</Badge>
                {/* <Badge variant="secondary">User-Centric</Badge> */}
              </div>    
            </CardContent>
          </Card>

          {/* Certification 4 */}
          {/* <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-col items-center">
              <img
                src="/assets/hipaa-compliance.png"
                alt="HIPAA Compliance"
                className="h-16 w-16 mb-4"
              />
              <CardTitle className="text-xl">HIPAA Compliant</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Ensuring the highest level of security for healthcare data and patient privacy.
              </CardDescription>
              <Badge variant="outline" className="mt-4">Healthcare Ready</Badge>
            </CardContent>
          </Card> */}

          {/* Certification 5 */}
          {/* <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-col items-center">
              <img
                src="/assets/fedramp-certification.png"
                alt="FedRAMP Certification"
                className="h-16 w-16 mb-4"
              />
              <CardTitle className="text-xl">FedRAMP Authorized</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Certified for use by U.S. federal agencies, meeting rigorous security and compliance standards.
              </CardDescription>
              <Badge variant="outline" className="mt-4">Government Approved</Badge>
            </CardContent>
          </Card> */}

          {/* Certification 6 */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-col items-center">
              <img
                src={csa}
                alt="CSA STAR Certification"
                className="h-24 w-24 mb-2"
              />
              <CardTitle className="text-xl">CSA STAR Certified</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Cloud Security Alliance certification for excellence in cloud security and transparency.
              </CardDescription>
              <div className="flex flex-wrap md:justify-center gap-2 mt-4">
                <Badge variant="secondary">Cloud Security</Badge>
                <Badge variant="secondary">Transparency Certified</Badge>
                {/* <Badge variant="secondary">Industry Leader</Badge> */}
              </div>    
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};