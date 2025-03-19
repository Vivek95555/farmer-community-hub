
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { NavBar } from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { 
  Leaf, 
  Globe, 
  Droplets, 
  Wind, 
  Sun, 
  Recycle,
  Users,
  Calendar,
  MessagesSquare,
  BookOpen
} from "lucide-react";

const PageHeader = ({ title, description }: { title: string; description: string }) => (
  <div className="mb-12 text-center">
    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
      {title}
    </h1>
    <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
      {description}
    </p>
  </div>
);

export function SustainabilityPage() {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const practices = [
    {
      icon: Sun,
      title: "Regenerative Agriculture",
      description:
        "Farming practices that reverse climate change by rebuilding soil organic matter and restoring degraded soil biodiversity.",
    },
    {
      icon: Droplets,
      title: "Water Conservation",
      description:
        "Innovative irrigation techniques and water management systems to reduce water usage while maintaining crop health.",
    },
    {
      icon: Wind,
      title: "Renewable Energy",
      description:
        "Using wind, solar, and other renewable energy sources to power farm operations and reduce carbon footprint.",
    },
    {
      icon: Recycle,
      title: "Waste Reduction",
      description:
        "Implementing composting, recycling, and circular economy principles to minimize waste and maximize resource efficiency.",
    },
    {
      icon: Globe,
      title: "Carbon Sequestration",
      description:
        "Practices that capture and store atmospheric carbon dioxide in soil and plants, helping mitigate climate change.",
    },
    {
      icon: Leaf,
      title: "Biodiversity Protection",
      description:
        "Creating and maintaining habitats for beneficial insects, birds, and other wildlife to promote ecological balance.",
    },
  ];

  return (
    <div className="min-h-screen">
      <NavBar />
      
      <main className="pt-24 md:pt-32">
        <section className="container px-4 py-12 md:px-6 md:py-16">
          <PageHeader
            title="Sustainability"
            description="Discover how AgriTrust is promoting sustainable farming practices and environmental stewardship through transparency and technology."
          />
          
          <div className="relative mx-auto max-w-5xl rounded-xl bg-gradient-to-br from-agritrust-50 to-soil-50 p-1 shadow-xl">
            <div className="rounded-lg bg-white p-6 sm:p-10">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {practices.map((practice, index) => {
                  const Icon = practice.icon;
                  return (
                    <div key={index} className="flex flex-col items-start">
                      <div className="mb-4 rounded-lg bg-primary/10 p-3 text-primary">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mb-2 text-xl font-medium">
                        {practice.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {practice.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-3xl font-bold tracking-tight">
                Our Sustainability Commitment
              </h2>
              <p className="mb-4 text-muted-foreground">
                At AgriTrust, we believe that the future of agriculture lies in sustainable practices that protect our planet while producing healthy, nutritious food. Our platform enables farmers to showcase their sustainable practices and helps consumers make environmentally conscious choices.
              </p>
              <p className="mb-6 text-muted-foreground">
                Through our ecoPassport system, consumers can verify exactly how their food was grown, what inputs were used, and the environmental impact of their purchases. This transparency drives a race to the top, with farmers continually improving their practices to meet consumer demand for sustainable products.
              </p>
              <Button size="lg" asChild>
                <a href="#learn-more">Learn More</a>
              </Button>
            </div>
            <div className="relative aspect-square overflow-hidden rounded-xl">
              <img
                src="https://images.unsplash.com/photo-1500076656116-558758c991c1?q=80&w=1000&auto=format&fit=crop"
                alt="Sustainable farm with solar panels"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-xl font-medium text-white">
                  Sustainable Farming in Action
                </h3>
                <p className="mt-2 text-white/80">
                  Solar-powered irrigation systems reduce carbon footprint while ensuring optimal water usage.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="bg-muted/30 py-12 md:py-16" id="learn-more">
          <div className="container px-4 md:px-6">
            <h2 className="mb-8 text-center text-3xl font-bold tracking-tight">
              How We Measure Sustainability
            </h2>
            <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
              <div className="rounded-lg border bg-card p-6 shadow-subtle">
                <div className="mb-4 text-4xl font-bold text-primary">01</div>
                <h3 className="mb-2 text-xl font-medium">
                  Environmental Impact
                </h3>
                <p className="text-muted-foreground">
                  We track carbon footprint, water usage, soil health, and biodiversity metrics for each farm.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-subtle">
                <div className="mb-4 text-4xl font-bold text-primary">02</div>
                <h3 className="mb-2 text-xl font-medium">
                  Farming Practices
                </h3>
                <p className="text-muted-foreground">
                  We evaluate the use of organic methods, pest management strategies, and crop rotation techniques.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-subtle">
                <div className="mb-4 text-4xl font-bold text-primary">03</div>
                <h3 className="mb-2 text-xl font-medium">
                  Social Responsibility
                </h3>
                <p className="text-muted-foreground">
                  We consider fair labor practices, community engagement, and contributions to local food security.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export function CommunityPage() {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const events = [
    {
      title: "Farmers Market",
      date: "May 15, 2023",
      location: "Central Park",
      description:
        "Join us for a vibrant farmers market featuring fresh produce, artisanal goods, and live music.",
      image: "https://images.unsplash.com/photo-1605290618366-2cb242c17b51?q=80&w=1000&auto=format&fit=crop",
    },
    {
      title: "Sustainable Farming Workshop",
      date: "June 5, 2023",
      location: "Green Valley Farm",
      description:
        "Learn practical techniques for improving soil health, water management, and biodiversity on your farm.",
      image: "https://images.unsplash.com/photo-1595923533867-9a5b4cd3c2e1?q=80&w=1000&auto=format&fit=crop",
    },
    {
      title: "Farm-to-Table Dinner",
      date: "June 20, 2023",
      location: "Riverside Restaurant",
      description:
        "Experience the finest locally sourced ingredients prepared by top chefs in a beautiful setting.",
      image: "https://images.unsplash.com/photo-1620067925093-010499a29819?q=80&w=1000&auto=format&fit=crop",
    },
  ];

  const forumCategories = [
    {
      icon: Leaf,
      title: "Sustainable Practices",
      description: "Discuss regenerative agriculture, permaculture, and other sustainable farming methods.",
      posts: 127,
    },
    {
      icon: Users,
      title: "Farmer Networking",
      description: "Connect with other farmers to share experiences, advice, and opportunities.",
      posts: 89,
    },
    {
      icon: MessagesSquare,
      title: "Consumer Questions",
      description: "A place for consumers to ask questions about farming practices and food production.",
      posts: 213,
    },
    {
      icon: BookOpen,
      title: "Knowledge Sharing",
      description: "Share articles, research, and resources on agricultural innovation and sustainability.",
      posts: 156,
    },
  ];

  return (
    <div className="min-h-screen">
      <NavBar />
      
      <main className="pt-24 md:pt-32">
        <section className="container px-4 py-12 md:px-6 md:py-16">
          <PageHeader
            title="Community"
            description="Connect with farmers, consumers, and sustainability advocates in our vibrant AgriTrust community."
          />
          
          <div className="mb-16">
            <h2 className="mb-8 text-3xl font-bold tracking-tight">
              Upcoming Events
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {events.map((event, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-elevation"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="mb-2 flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">
                        {event.date}
                      </span>
                    </div>
                    <h3 className="mb-2 text-xl font-medium">{event.title}</h3>
                    <p className="mb-4 text-muted-foreground">
                      {event.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        {event.location}
                      </span>
                      <Button variant="outline" size="sm">
                        Learn More
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="mb-8 text-3xl font-bold tracking-tight">
              Discussion Forum
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {forumCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <div
                    key={index}
                    className="flex gap-4 rounded-xl border p-6 transition-all duration-300 hover:shadow-subtle"
                  >
                    <div className="rounded-lg bg-primary/10 p-3 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-medium">{category.title}</h3>
                        <span className="text-sm text-muted-foreground">
                          {category.posts} posts
                        </span>
                      </div>
                      <p className="mt-2 text-muted-foreground">
                        {category.description}
                      </p>
                      <Button
                        variant="ghost"
                        className="mt-4 px-0 text-primary"
                      >
                        Join Discussion →
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        
        <section className="bg-muted/30 py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight">
                Join Our Newsletter
              </h2>
              <p className="mb-8 text-muted-foreground">
                Stay updated with the latest community events, farming tips, and
                sustainability news.
              </p>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-center">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:min-w-[300px]"
                />
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
