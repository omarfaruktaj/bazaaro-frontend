import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsSubscribing(true);
    // Simulate API call
    setTimeout(() => {
      toast.success("Successfully subscribed to our newsletter!");
      setEmail("");
      setIsSubscribing(false);
    }, 1000);
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };
  return (
    <section className=" border-b border-border/30">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Stay in the Loop
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              Get exclusive deals and updates directly in your inbox.
            </p>
          </motion.div>

          <motion.form
            variants={itemVariants}
            onSubmit={handleNewsletterSubmit}
            className="flex flex-col sm:flex-row gap-4 mt-6 max-w-md mx-auto"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email Address
            </label>
            <Input
              id="newsletter-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-12 border border-border/50 bg-white/90 backdrop-blur-sm"
              required
            />
            <Button
              type="submit"
              disabled={isSubscribing}
              className="h-12 px-6 bg-primary hover:bg-primary/90"
            >
              {isSubscribing ? "Subscribing..." : "Subscribe"}
            </Button>
          </motion.form>

          <motion.p
            variants={itemVariants}
            className="text-sm text-muted-foreground mt-4"
          >
            Join 50,000+ subscribers. Unsubscribe anytime.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
