
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Leaf } from "lucide-react";
import { SignInForm, SignUpForm, ForgotPasswordForm } from "@/components/AuthForms";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

const AuthLayout = ({ children, title, description }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 backdrop-blur-lg bg-background/70 border-b">
        <div className="container flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-agritrust-400 to-agritrust-600 flex items-center justify-center">
              <Leaf className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold text-lg">AgriTrust</span>
          </Link>
          <Button asChild variant="ghost" size="sm">
            <Link to="/">Return Home</Link>
          </Button>
        </div>
      </header>
      
      <main className="flex-1 flex items-center justify-center pt-16 px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <motion.h1 
              className="text-3xl font-bold tracking-tight"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {title}
            </motion.h1>
            <motion.p 
              className="mt-2 text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {description}
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {children}
          </motion.div>
        </div>
      </main>
      
      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} AgriTrust. All rights reserved.</p>
      </footer>
    </div>
  );
};

export function SignInPage() {
  const location = useLocation();
  
  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, [location]);
  
  return (
    <AuthLayout 
      title="Welcome Back" 
      description="Sign in to your AgriTrust account"
    >
      <SignInForm />
    </AuthLayout>
  );
}

export function SignUpPage() {
  const location = useLocation();
  
  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, [location]);
  
  return (
    <AuthLayout 
      title="Create Account" 
      description="Join the AgriTrust community today"
    >
      <SignUpForm />
    </AuthLayout>
  );
}

export function ForgotPasswordPage() {
  const location = useLocation();
  
  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, [location]);
  
  return (
    <AuthLayout 
      title="Reset Password" 
      description="We'll send you a link to reset your password"
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
