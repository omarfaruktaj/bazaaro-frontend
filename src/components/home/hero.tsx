import { Button } from "@/components/ui/button";
import { animated, useSpring } from "@react-spring/web";
import { Link } from "react-router";

const Hero = () => {
  const titleAnimation = useSpring({
    opacity: 1,
    y: 0,
    from: { opacity: 0, y: -40 },
    config: { tension: 220, friction: 20 },
  });

  const contentAnimation = useSpring({
    opacity: 1,
    y: 0,
    from: { opacity: 0, y: 40 },
    delay: 200,
    config: { tension: 220, friction: 20 },
  });

  const buttonAnimation = useSpring({
    opacity: 1,
    transform: "scale(1)",
    from: { opacity: 0, transform: "scale(0.6)" },
    delay: 400,
    config: { tension: 300, friction: 25 },
  });

  return (
    <section className="relative bg-primary text-white overflow-hidden py-16">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover brightness-75 blur-sm"
          src="/assets/banner.png"
          alt="Modern Workspace"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <animated.h1
          style={titleAnimation}
          className="text-4xl md:text-5xl font-bold leading-tight mb-4 tracking-tight drop-shadow-2xl"
        >
          Discover <span className="text-primary-400">Bazaro</span>
        </animated.h1>

        <animated.p
          style={contentAnimation}
          className="text-lg md:text-2xl text-gray-300 mb-8 md:mb-12 max-w-3xl leading-relaxed"
        >
          Explore the latest and greatest deals tailored for you. Shop smart,
          shop stylish.
        </animated.p>

        <animated.div style={buttonAnimation}>
          <Button asChild>
            <Link
              to="/products"
              className="inline-block px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-lg font-semibold rounded-full shadow-2xl backdrop-blur-md transform transition-all hover:scale-110 hover:shadow-primary-500/50 focus:outline-none focus:ring-4 focus:ring-primary-300"
            >
              Shop Now
            </Link>
          </Button>
        </animated.div>
      </div>

      <div className="absolute top-1/4 left-10 w-24 h-24 bg-primary-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-purple-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
    </section>
  );
};

export default Hero;
