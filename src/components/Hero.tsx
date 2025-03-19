
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-background pt-[120px] pb-16 md:pt-[180px] md:pb-24">
      {/* Background gradient elements */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 transform">
        <div className="h-[500px] w-[500px] rounded-full bg-agritrust-100/30 blur-[100px]" />
      </div>
      <div className="absolute top-1/3 right-0">
        <div className="h-[300px] w-[300px] rounded-full bg-soil-100/30 blur-[80px]" />
      </div>

      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-block rounded-full bg-agritrust-50 px-3 py-1 text-sm text-agritrust-600 shadow-sm">
                  Connecting Farmers & Consumers
                </div>
              </motion.div>
              <motion.h1 
                className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Build Trust in <span className="text-gradient">Agriculture</span>
              </motion.h1>
              <motion.p 
                className="max-w-[600px] text-muted-foreground md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                AgriTrust brings transparency to the food supply chain with blockchain-based verification and direct farmer-to-consumer connections.
              </motion.p>
            </div>
            <motion.div 
              className="flex flex-col gap-2 min-[400px]:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button asChild size="lg" className="h-12">
                <Link to="/signup">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="h-12" asChild>
                <Link to="/about">Learn More</Link>
              </Button>
            </motion.div>
            <motion.div 
              className="mt-6 flex flex-wrap items-center gap-4 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span>Verified Farmers</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span>Transparent Supply Chain</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span>Direct Marketplace</span>
              </div>
            </motion.div>
          </div>
          <motion.div 
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative aspect-square w-full max-w-[500px] overflow-hidden rounded-2xl bg-gradient-to-br from-agritrust-50 to-soil-50 p-1 shadow-xl">
              <div className="h-full w-full overflow-hidden rounded-xl bg-white">
                <img
                  src="https://images.unsplash.com/photo-1593179357196-ea11a2e7c119?q=80&w=1000&auto=format&fit=crop"
                  alt="Farmer in a field"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-agritrust-100/50 backdrop-blur-sm"></div>
              <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-soil-100/50 backdrop-blur-sm"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
