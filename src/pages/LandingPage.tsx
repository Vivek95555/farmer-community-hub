
import { NavBar } from "@/components/NavBar";
import { Hero } from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { 
  Leaf, 
  ShieldCheck, 
  QrCode, 
  ShoppingBag, 
  Users, 
  ArrowRight 
} from "lucide-react";
import { Link } from "react-router-dom";

const FeatureCard = ({ icon: Icon, title, description }: { 
  icon: React.ElementType; 
  title: string; 
  description: string;
}) => (
  <div className="rounded-xl border bg-card p-6 shadow-subtle hover-scale">
    <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
      <Icon className="h-6 w-6 text-primary" />
    </div>
    <h3 className="mb-2 text-xl font-medium">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

const Testimonial = ({ quote, author, role, image }: {
  quote: string;
  author: string;
  role: string;
  image: string;
}) => (
  <div className="rounded-xl border bg-card p-6 shadow-subtle">
    <div className="mb-4 text-lg font-medium italic text-muted-foreground">"{quote}"</div>
    <div className="flex items-center">
      <div className="mr-4 h-12 w-12 overflow-hidden rounded-full">
        <img src={image} alt={author} className="h-full w-full object-cover" />
      </div>
      <div>
        <div className="font-medium">{author}</div>
        <div className="text-sm text-muted-foreground">{role}</div>
      </div>
    </div>
  </div>
);

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <NavBar />
      
      <main>
        <Hero />
        
        {/* Features Section */}
        <section className="bg-muted/30 py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Key Features
              </h2>
              <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-lg">
                AgriTrust provides a comprehensive platform connecting farmers and consumers
                with transparency and trust at its core.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={ShieldCheck}
                title="Verified Farming"
                description="Ensure authenticity with verified farmer profiles and transparent production methods."
              />
              <FeatureCard
                icon={QrCode}
                title="Digital ecoPassport"
                description="Every farmer gets a unique QR-enabled passport detailing their practices and products."
              />
              <FeatureCard
                icon={ShoppingBag}
                title="Direct Marketplace"
                description="Buy directly from farmers with no middlemen, ensuring fair prices and fresh products."
              />
              <FeatureCard
                icon={Users}
                title="Community Building"
                description="Connect with like-minded individuals passionate about sustainable agriculture."
              />
              <FeatureCard
                icon={Leaf}
                title="Sustainability Focus"
                description="Promote and discover farming practices that prioritize environmental stewardship."
              />
              <FeatureCard
                icon={ShieldCheck}
                title="Trust & Transparency"
                description="Know exactly where your food comes from with complete supply chain visibility."
              />
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                What Our Users Say
              </h2>
              <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-lg">
                Hear from farmers and consumers who have transformed their agricultural experience with AgriTrust.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Testimonial
                quote="AgriTrust has completely changed how I connect with customers. My ecoPassport showcases our organic practices and has increased our direct sales by 40%."
                author="Maria Johnson"
                role="Organic Farmer"
                image="https://randomuser.me/api/portraits/women/68.jpg"
              />
              <Testimonial
                quote="As a consumer who cares about where my food comes from, AgriTrust gives me the confidence to know I'm supporting sustainable local farmers."
                author="David Chen"
                role="Conscious Consumer"
                image="https://randomuser.me/api/portraits/men/32.jpg"
              />
              <Testimonial
                quote="The QR code feature is brilliant. Customers scan it at our farmer's market stand and instantly see our whole story and growing practices."
                author="James Wilson"
                role="Family Farm Owner"
                image="https://randomuser.me/api/portraits/men/75.jpg"
              />
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="bg-agritrust-50 py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Ready to Join the Agricultural Revolution?
              </h2>
              <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-lg">
                Whether you're a farmer looking to showcase your sustainable practices or a consumer 
                seeking transparency in your food choices, AgriTrust is for you.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg" className="min-w-[150px]">
                  <Link to="/signup">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="min-w-[150px]">
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="border-t bg-card py-8 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-medium">AgriTrust</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">About Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Our Mission</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Team</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-medium">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Blog</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Sustainability Guide</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Farming Practices</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-medium">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Cookie Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-medium">Connect</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Contact Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Twitter</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Instagram</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} AgriTrust. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
