import { useEffect, useRef, useState , useCallback} from "react";
export const generateKeyframes = (name, frames) => {
  return `
    @keyframes ${name} {
      ${frames}
    }
  `;
};

// Predefined animations
export const animations = {
  fadeIn: `
    from { opacity: 0; }
    to { opacity: 1; }
  `,
  fadeOut: `
    from { opacity: 1; }
    to { opacity: 0; }
  `,
  slideInUp: `
    from { 
      opacity: 0;
      transform: translateY(30px);
    }
    to { 
      opacity: 1;
      transform: translateY(0);
    }
  `,
  slideInDown: `
    from { 
      opacity: 0;
      transform: translateY(-30px);
    }
    to { 
      opacity: 1;
      transform: translateY(0);
    }
  `,
  slideInLeft: `
    from { 
      opacity: 0;
      transform: translateX(-30px);
    }
    to { 
      opacity: 1;
      transform: translateX(0);
    }
  `,
  slideInRight: `
    from { 
      opacity: 0;
      transform: translateX(30px);
    }
    to { 
      opacity: 1;
      transform: translateX(0);
    }
  `,
  bounce: `
    0%, 20%, 53%, 80%, 100% {
      transform: translate3d(0, 0, 0);
    }
    40%, 43% {
      transform: translate3d(0, -15px, 0);
    }
    70% {
      transform: translate3d(0, -7px, 0);
    }
    90% {
      transform: translate3d(0, -3px, 0);
    }
  `,
  pulse: `
    0% {
      transform: scale3d(1, 1, 1);
    }
    50% {
      transform: scale3d(1.05, 1.05, 1.05);
    }
    100% {
      transform: scale3d(1, 1, 1);
    }
  `,
  shake: `
    0%, 100% {
      transform: translate3d(0, 0, 0);
    }
    10%, 30%, 50%, 70%, 90% {
      transform: translate3d(-5px, 0, 0);
    }
    20%, 40%, 60%, 80% {
      transform: translate3d(5px, 0, 0);
    }
  `,
  spin: `
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  `,
  electronOrbit: `
    0% {
      transform: rotate(0deg) translateX(50px) rotate(0deg);
    }
    100% {
      transform: rotate(360deg) translateX(50px) rotate(-360deg);
    }
  `,
};

// Animation presets
export const animationPresets = {
  gentle: {
    duration: "0.3s",
    timing: "ease-out",
    fillMode: "both",
  },
  moderate: {
    duration: "0.5s",
    timing: "ease-in-out",
    fillMode: "both",
  },
  dramatic: {
    duration: "0.8s",
    timing: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    fillMode: "both",
  },
};

// Create CSS animation string
export const createAnimation = (name, preset = "gentle") => {
  const { duration, timing, fillMode } =
    animationPresets[preset] || animationPresets.gentle;
  return `${name} ${duration} ${timing} ${fillMode}`;
};

// Electron orbit animation generator
export const generateElectronOrbit = (
  radius,
  duration = 2,
  electronCount = 1
) => {
  const animations = [];
  const angleIncrement = (2 * Math.PI) / electronCount;

  for (let i = 0; i < electronCount; i++) {
    const startAngle = angleIncrement * i;
    animations.push(`
      .electron-${i} {
        animation: electronOrbit-${i} ${duration}s linear infinite;
      }
      
      @keyframes electronOrbit-${i} {
        0% {
          transform: 
            rotate(${startAngle}rad) 
            translateX(${radius}px) 
            rotate(-${startAngle}rad);
        }
        100% {
          transform: 
            rotate(${startAngle + 2 * Math.PI}rad) 
            translateX(${radius}px) 
            rotate(-${startAngle + 2 * Math.PI}rad);
        }
      }
    `);
  }

  return animations.join("\n");
};

// Particle animation system
export const createParticleSystem = (count, options = {}) => {
  const {
    colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#f9c74f", "#ff6b6b"],
    sizes = [2, 4, 6],
    durations = [1, 2, 3],
    delays = [0, 0.5, 1],
  } = options;

  const particles = [];

  for (let i = 0; i < count; i++) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = sizes[Math.floor(Math.random() * sizes.length)];
    const duration = durations[Math.floor(Math.random() * durations.length)];
    const delay = delays[Math.floor(Math.random() * delays.length)];

    particles.push(`
      .particle-${i} {
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        animation: particleFloat-${i} ${duration}s ease-in-out ${delay}s infinite;
      }
      
      @keyframes particleFloat-${i} {
        0% {
          transform: translate(0, 0) rotate(0deg);
          opacity: 0;
        }
        50% {
          opacity: 1;
        }
        100% {
          transform: 
            translate(${Math.random() * 100 - 50}px, ${
      Math.random() * 100 - 50
    }px) 
            rotate(${Math.random() * 360}deg);
          opacity: 0;
        }
      }
    `);
  }

  return particles.join("\n");
};

// Transition utilities
export const transitions = {
  smooth: "all 0.3s ease-in-out",
  quick: "all 0.15s ease-out",
  bounce: "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
};

// Animation hooks for React
export const useAnimation = (initialState = false) => {
  const [isAnimating, setIsAnimating] = useState(initialState);

  const startAnimation = useCallback(() => {
    setIsAnimating(true);
  }, []);

  const stopAnimation = useCallback(() => {
    setIsAnimating(false);
  }, []);

  const toggleAnimation = useCallback(() => {
    setIsAnimating((prev) => !prev);
  }, []);

  return {
    isAnimating,
    startAnimation,
    stopAnimation,
    toggleAnimation,
  };
};

// Scroll-based animations
export const useScrollAnimation = (threshold = 0.3) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, ref]);

  return [ref, isInView];
};

// Sequential animation delays
export const getStaggeredDelay = (index, increment = 0.1) => {
  return index * increment;
};

export default {
  generateKeyframes,
  animations,
  animationPresets,
  createAnimation,
  generateElectronOrbit,
  createParticleSystem,
  transitions,
  useAnimation,
  useScrollAnimation,
  getStaggeredDelay,
};
