import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Globe, CheckCircle2, ChevronRight, Activity, Handshake, BarChart, Navigation, MousePointer2 } from 'lucide-react';
import Lenis from 'lenis';
import lukePhoto from './assets/luke-meyer.avif';

gsap.registerPlugin(ScrollTrigger);

// Utility for Magnetic Button
const MagneticButton = ({ children, className = '', onClick }) => {
  const btnRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const btn = btnRef.current;
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
          x: x * 0.2,
          y: y * 0.2,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    }, btnRef);
    return () => ctx.revert();
  }, []);

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      className={`magnetic-btn rounded-full overflow-hidden relative group ${className}`}
    >
      <span className="absolute inset-0 w-full h-full bg-accent/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></span>
      <span className="relative z-10">{children}</span>
    </button>
  );
};


// --- MICRO-UI CARDS FOR FEATURES SECTION ---

// --- MICRO-UI CARDS FOR FEATURES SECTION ---

const Satellite = () => {
  const satelliteRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Slow drift across the sky
      gsap.to(satelliteRef.current, {
        x: '200vw',
        y: '50vh',
        rotation: 360,
        duration: 120,
        repeat: -1,
        ease: 'none'
      });
    }, satelliteRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={satelliteRef} className="absolute -left-20 top-[15%] opacity-40 z-10 pointer-events-none scale-75">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 10l5 5m10 10l5 5M10 25l5-5m10-10l5-5M5 15h30v10H5V15z" stroke="white" strokeWidth="1" />
        <circle cx="20" cy="20" r="4" fill="white" />
        <rect x="18" y="10" width="4" height="20" fill="white" opacity="0.5" />
      </svg>
    </div>
  );
};

const ShootingStar = () => {
  const starRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const triggerStar = () => {
        const startX = Math.random() * 100;
        const startY = Math.random() * 40;

        gsap.fromTo(starRef.current,
          { x: `${startX}vw`, y: `${startY}vh`, opacity: 0, scale: 0, rotation: -45 },
          {
            x: `${startX + 40}vw`,
            y: `${startY + 40}vh`,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power2.in',
            onComplete: () => {
              gsap.to(starRef.current, { opacity: 0, scale: 0, duration: 0.2 });
              setTimeout(triggerStar, Math.random() * 10000 + 5000);
            }
          }
        );
      };

      setTimeout(triggerStar, 3000);
    }, starRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={starRef} className="absolute top-0 left-0 w-32 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-0 z-10 pointer-events-none" style={{ transform: 'rotate(-45deg)' }}>
      <div className="absolute right-0 top-0 w-1 h-1 bg-white rounded-full blur-[2px] shadow-[0_0_10px_white]"></div>
    </div>
  );
};

const Thunderstorm = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const flashes = gsap.utils.toArray('.lightning-flash');

      const triggerFlash = (flash) => {
        const tl = gsap.timeline({
          onComplete: () => {
            gsap.set(flash, {
              top: `${Math.random() * 40 + 20}%`,
              left: `${Math.random() * 60 + 20}%`,
              scale: Math.random() * 1.5 + 0.5
            });
            setTimeout(() => triggerFlash(flash), Math.random() * 8000 + 2000);
          }
        });

        tl.to(flash, { opacity: 0.4, duration: 0.05, ease: 'power2.out' })
          .to(flash, { opacity: 0.1, duration: 0.05 })
          .to(flash, { opacity: 0.6, duration: 0.05 })
          .to(flash, { opacity: 0, duration: 0.4, ease: 'power4.out' });
      };

      flashes.forEach((flash, i) => {
        setTimeout(() => triggerFlash(flash), i * 3000 + 1000);
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-10 pointer-events-none">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="lightning-flash absolute w-48 h-48 rounded-full opacity-0"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(100,200,255,0.4) 40%, transparent 70%)',
            top: `${Math.random() * 40 + 20}%`,
            left: `${Math.random() * 60 + 20}%`,
            filter: 'blur(20px)'
          }}
        />
      ))}
    </div>
  );
};

const StarryBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const stars = gsap.utils.toArray('.star-particle');
      stars.forEach(star => {
        gsap.to(star, {
          opacity: () => Math.random() * 0.8 + 0.2,
          duration: () => Math.random() * 3 + 1,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
          delay: Math.random() * 5
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="star-particle absolute bg-white rounded-full"
          style={{
            top: `${Math.random() * 60}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            opacity: Math.random() * 0.4
          }}
        />
      ))}
    </div>
  );
};

const ShufflerCard = () => {
  const [items, setItems] = useState([
    { id: 1, text: 'Distributor — UAE', color: 'bg-blue-500' },
    { id: 2, text: 'Retailer — South Africa', color: 'bg-indigo-500' },
    { id: 3, text: 'Partner — Mauritius', color: 'bg-sky-500' },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setItems(prev => {
        const clone = [...prev];
        const last = clone.pop();
        clone.unshift(last);
        return clone;
      });
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="reveal-up p-10 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors group relative overflow-hidden flex flex-col justify-between" style={{ minHeight: '380px' }}>
      <div className="flex-1 relative mb-6 w-full pt-4 h-[120px]">
        {items.map((item, i) => (
          <div
            key={item.id}
            className={`absolute left-0 w-full p-4 rounded-xl flex items-center gap-3 border border-white/10 transition-all duration-700 ease-in-out shadow-lg`}
            style={{
              transform: `translateY(${i * 12}px) scale(${1 - i * 0.04})`,
              zIndex: 10 - i,
              opacity: 1 - i * 0.2,
              backgroundColor: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(8px)'
            }}
          >
            <div className={`w-3 h-3 rounded-full ${item.color} animate-pulse`}></div>
            <span className="font-mono text-sm text-white/90">{item.text}</span>
          </div>
        ))}
      </div>
      <div>
        <Handshake className="w-10 h-10 text-accent mb-4 group-hover:scale-110 transition-transform origin-left" />
        <h3 className="font-heading text-2xl mb-3 text-white">Importer Connections</h3>
        <p className="text-white/60 text-base leading-relaxed font-sans">
          Direct introductions to reliable importers and distributors well-suited for your brand.
        </p>
      </div>
    </div>
  );
};

const TypewriterCard = () => {
  const [text, setText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);
  const fullText = "Scanning HoReCa network...\nAnalyzing retail footprint...\n> 142 Active prospects.\n> Match probability: 94%";

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.5 });

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, [isVisible]);

  return (
    <div ref={cardRef} className="reveal-up p-10 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors group relative overflow-hidden flex flex-col justify-between" style={{ transitionDelay: '100ms', minHeight: '380px' }}>
      <div className="mb-6 bg-black/40 rounded-xl p-5 border border-white/5 font-mono text-xs text-green-400 whitespace-pre-wrap relative h-[140px] w-full shadow-inner">
        <div className="absolute top-2 right-3 flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
          <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
        </div>
        <div className="text-white/30 text-[10px] mb-3 font-sans uppercase tracking-widest border-b border-white/10 pb-1 w-full">Live Telemetry Feed</div>
        <div className="leading-relaxed">
          {text}
          <span className="animate-pulse ml-1 text-green-400">█</span>
        </div>
      </div>
      <div>
        <Navigation className="w-10 h-10 text-accent mb-4 group-hover:scale-110 transition-transform origin-left" />
        <h3 className="font-heading text-2xl mb-3 text-white">Retail &amp; HoReCa Research</h3>
        <p className="text-white/60 text-base leading-relaxed font-sans">
          In-depth analysis of local retail and HoReCa markets to identify key opportunities.
        </p>
      </div>
    </div>
  );
};

const ScannerCard = () => {
  const laserRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Animate laser up and down
      gsap.to(laserRef.current, {
        y: 110,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Animate bars pseudo-randomly
      gsap.utils.toArray('.bar-chart').forEach(bar => {
        gsap.to(bar, {
          height: () => Math.random() * 80 + 20 + '%',
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: Math.random()
        });
      });
    }, chartRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={chartRef} className="reveal-up p-10 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors group relative overflow-hidden flex flex-col justify-between" style={{ transitionDelay: '200ms', minHeight: '380px' }}>
      <div className="mb-6 relative bg-[#001020]/50 rounded-xl border border-white/5 overflow-hidden p-4 h-[140px] w-full flex items-end justify-between gap-2">
        <div ref={laserRef} className="absolute top-0 left-0 w-full h-[2px] bg-primary shadow-[0_0_15px_3px_rgba(0,75,135,0.8)] z-10"></div>
        {[...Array(12)].map((_, i) => (
          <div key={i} className="w-full bg-white/10 rounded-t-sm relative bar-chart" style={{ height: `${Math.random() * 80 + 20}%` }}>
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
          </div>
        ))}
      </div>
      <div>
        <Activity className="w-10 h-10 text-accent mb-4 group-hover:scale-110 transition-transform origin-left" />
        <h3 className="font-heading text-2xl mb-3 text-white">Competitor Review</h3>
        <p className="text-white/60 text-base leading-relaxed font-sans">
          Evaluation of competitors to understand market positioning and pricing strategies.
        </p>
      </div>
    </div>
  );
};

const SchedulerCard = () => {
  const cursorRef = useRef(null);
  const cellRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });
      tl.set(cursorRef.current, { x: 0, y: 0, scale: 1, opacity: 0 })
        .to(cursorRef.current, { opacity: 1, duration: 0.3 })
        .to(cursorRef.current, { x: 70, y: 40, duration: 1, ease: 'power2.out' })
        .to(cursorRef.current, { scale: 0.8, duration: 0.15, yoyo: true, repeat: 1 })
        .to(cellRef.current, { backgroundColor: '#004B87', scale: 0.95, duration: 0.2 }, "-=0.2")
        .to(cellRef.current, { scale: 1, duration: 0.2 })
        .to(cursorRef.current, { x: 180, y: 80, duration: 1, delay: 0.3, ease: 'power2.inOut' })
        .to(cursorRef.current, { opacity: 0, duration: 0.3 })
        .to(cellRef.current, { backgroundColor: 'rgba(255,255,255,0.05)', duration: 0.5 });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="reveal-up p-10 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors group relative overflow-hidden flex flex-col justify-between" style={{ transitionDelay: '300ms', minHeight: '380px' }}>
      <div className="mb-6 relative bg-black/20 rounded-xl border border-white/5 p-5 h-[140px] w-full flex flex-col">
        <div className="flex justify-between w-full text-[10px] uppercase font-mono text-white/40 mb-3 px-1 border-b border-white/5 pb-2">
          <span>Q1 FORECAST</span>
          <span>BUDGET ALLOC</span>
        </div>
        <div className="grid grid-cols-7 gap-2 flex-1">
          {[...Array(14)].map((_, i) => (
            <div key={i} ref={i === 10 ? cellRef : null} className="w-full h-8 bg-white/5 rounded border border-white/5 relative flex items-center justify-center overflow-hidden">
              {i === 10 && <span className="text-[8px] font-mono text-white/50 z-0">EXEC</span>}
            </div>
          ))}
        </div>
        <MousePointer2
          ref={cursorRef}
          className="absolute top-8 left-4 w-6 h-6 text-white drop-shadow-2xl z-20 pointer-events-none"
          fill="black"
          strokeWidth={1.5}
        />
      </div>
      <div>
        <BarChart className="w-10 h-10 text-accent mb-4 group-hover:scale-110 transition-transform origin-left" />
        <h3 className="font-heading text-2xl mb-3 text-white">Budget Forecast</h3>
        <p className="text-white/60 text-base leading-relaxed font-sans">
          Detailed retail listing budget forecasts tailored to your market entry goals.
        </p>
      </div>
    </div>
  );
};

const GlitchTitle = ({ text = "Across Oceans & Continents" }) => {
  return (
    <div className="glitch-container glitch-active">
      {text.split('').map((char, i) => {
        if (char === ' ') {
          return <span key={i}>&nbsp;</span>;
        }
        // Map characters to 1-9 based on their index (1-indexed for CSS)
        const glitchIndex = (i % 9) + 1;
        return (
          <span key={i} className={`glitch-letter-${glitchIndex}`}>
            {char}
          </span>
        );
      })}
    </div>
  );
};


// --- MAIN APP COMPONENT ---

export default function App() {
  const containerRef = useRef(null);

  // Smooth Scroll Initialization
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Springy bounce
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  // Utility to scroll to section
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Hero Animations
      gsap.from('.hero-text', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2
      });

      // Navbar Morph
      ScrollTrigger.create({
        trigger: '.hero-section',
        start: 'bottom top',
        onEnter: () => gsap.to('.navbar', { backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(16px)', color: '#004B87', borderBottom: '1px solid rgba(0,0,0,0.05)', duration: 0.3 }),
        onLeaveBack: () => gsap.to('.navbar', { backgroundColor: 'transparent', backdropFilter: 'blur(0px)', color: '#FAFAFA', borderBottom: '1px solid rgba(255,255,255,0)', duration: 0.3 }),
      });

      // Reveal animations for sections
      gsap.utils.toArray('.reveal-up').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
        });
      });

      // Protocol Stacking Archive
      const cards = gsap.utils.toArray('.stack-card');
      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          pin: true,
          pinSpacing: false,
          end: "max",
        });

        if (i < cards.length - 1) {
          gsap.to(card, {
            scrollTrigger: {
              trigger: cards[i + 1],
              start: "top 80%",
              end: "top top",
              scrub: 1,
            },
            scale: 0.95,
            opacity: 0.4,
            filter: "blur(10px)",
          });
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-background min-h-screen text-dark selection:bg-primary/20">

      {/* A. NAVBAR */}
      <nav className="navbar fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full flex items-center justify-between w-[90%] max-w-5xl transition-colors duration-300 text-background">
        <div className="font-heading font-bold text-xl tracking-tight flex items-center gap-2">
          <Globe className="w-5 h-5" /> ME <span className="opacity-50">—</span> AFRICA
        </div>
        <div className="hidden md:flex items-center gap-8 font-sans text-sm font-medium">
          <button onClick={() => scrollTo('service')} className="link-lift hover:opacity-70 transition-colors">Service</button>
          <button onClick={() => scrollTo('expertise')} className="link-lift hover:opacity-70 transition-colors">Expertise</button>
          <button onClick={() => scrollTo('contact')} className="link-lift hover:opacity-70 transition-colors">Contact</button>
        </div>
        <MagneticButton onClick={() => scrollTo('contact')} className="bg-primary text-background px-5 py-2 text-sm font-medium shadow-lg hover:shadow-xl">
          Get in Touch
        </MagneticButton>
      </nav>

      {/* B. HERO SECTION */}
      <section className="hero-section relative h-[100dvh] w-full flex items-end pb-24 px-6 md:px-12 lg:px-24 overflow-hidden">
        {/* Background Image & Gradient */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop"
            alt="Global Network"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#001020] via-[#002040]/80 to-transparent"></div>

          {/* CINEMATIC ENHANCEMENTS */}
          <StarryBackground />
          <Satellite />
          <ShootingStar />
          <Thunderstorm />
        </div>

        <div className="relative z-10 max-w-4xl text-background">
          <h1 className="flex flex-col gap-2">
            <span className="hero-text font-heading text-xl md:text-3xl font-semibold tracking-wide text-accent uppercase mb-2">
              Connecting your brand
            </span>
            <div className="hero-text font-drama text-5xl md:text-7xl lg:text-8xl leading-[1.1]">
              <GlitchTitle text="Across Oceans & Continents" />
            </div>
          </h1>
          <p className="hero-text mt-6 text-lg md:text-xl text-accent/80 max-w-2xl font-sans font-light">
            Experienced guidance in connecting brands with reliable importers across Africa, the Middle East, and the Indian Ocean region.
          </p>
          <div className="hero-text mt-10">
            <MagneticButton onClick={() => scrollTo('expertise')} className="bg-primary hover:bg-primary/90 text-background px-8 py-4 text-base font-semibold shadow-xl flex items-center justify-center gap-2 rounded-full">
              Learn More <ArrowRight className="w-5 h-5" />
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* C. EXPERTISE (Luke Meyer Profile) */}
      <section id="expertise" className="py-24 px-6 md:px-12 lg:px-24 bg-background relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="reveal-up mb-16 text-center md:text-left">
            <h2 className="font-sans font-semibold text-primary tracking-widest uppercase text-sm mb-3">Luke Meyer</h2>
            <h3 className="font-drama text-4xl md:text-5xl text-dark">30 Years of Regional Expertise</h3>
          </div>

          <div className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-5 reveal-up">
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl group">
                <img
                  src={lukePhoto}
                  alt="Luke Meyer - International Trade Expert"
                  className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 border border-black/10 rounded-[2rem] pointer-events-none"></div>
              </div>
            </div>
            <div className="md:col-span-7 reveal-up space-y-6">
              <p className="text-xl leading-relaxed text-dark/80 font-sans">
                With over <strong className="text-dark font-semibold">30 years of experience</strong>, Luke Meyer is a seasoned expert in international trade across Africa, the Middle East, and the Indian Ocean region.
              </p>
              <p className="text-lg leading-relaxed text-dark/70 font-sans">
                Over the last three decades, Luke has built extensive relationships and a deep understanding of how to navigate these markets, working out of Mauritius as a central hub.
              </p>

              <ul className="mt-8 space-y-5 font-sans">
                {[
                  "30+ years of experience in Africa, the Middle East, and the Indian Ocean region.",
                  "Extensive network of reliable importers and local partners.",
                  "Proven track record in sourcing and market expansion."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 p-4 rounded-3xl bg-white shadow-sm border border-black/5 hover:border-primary/20 transition-colors">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                    <span className="text-dark/80 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* D. FEATURES (Importer Introductions) WITH NEW MICRO-UI CARDS */}
      <section id="service" className="py-24 px-6 md:px-12 lg:px-24 bg-dark text-background rounded-t-[3rem] relative z-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 blur-[100px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="reveal-up text-center mb-20 max-w-3xl mx-auto space-y-6">
            <h2 className="font-drama text-4xl md:text-5xl lg:text-6xl text-background">Facilitation of Importer Introductions</h2>
            <p className="font-sans text-xl text-accent/80 font-light">
              Connecting your brand with the right import partners to grow your market presence in Africa, the Middle East &amp; the Indian Ocean.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 relative">
            <ShufflerCard />
            <TypewriterCard />
            <ScannerCard />
            <SchedulerCard />
          </div>
        </div>
      </section>

      {/* E. MARKET RESEARCH (Stacking Archive) */}
      <section className="bg-background relative z-30 pt-12 pb-24">
        <div className="text-center px-6 reveal-up mb-12">
          <h2 className="font-drama text-4xl md:text-5xl text-primary mt-12 mb-6">Comprehensive Market Research &amp; Strategy</h2>
          <p className="font-sans text-xl text-dark/70 max-w-3xl mx-auto">
            Our services are designed to provide the insights and connections necessary for a successful market entry and support your brand's growth.
          </p>
        </div>

        <div className="relative">
          {[
            { step: '01', title: 'Local Market Analysis', desc: 'Research of local retail and HoReCa sectors to understand market trends and consumer behavior.', img: 'https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=2670&auto=format&fit=crop' },
            { step: '02', title: 'Pricing Comparison', desc: 'Comparison of prices in the local market to position your brand competitively.', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop' },
            { step: '03', title: 'Retail Listing Strategy', desc: 'Development of strategies for retail listings that maximize your products visibility.', img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2574&auto=format&fit=crop' },
            { step: '04', title: 'HoReCa Insights', desc: 'Insights into hotel, restaurant, and café sectors to tailor your approach for HoReCa distribution.', img: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2574&auto=format&fit=crop' }
          ].map((item, i) => (
            <div key={i} className="stack-card h-screen w-full flex items-center justify-center sticky top-0 bg-background px-6">
              <div className="max-w-6xl w-full bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-black/5 flex flex-col md:flex-row h-[70vh]">
                <div className="md:w-1/2 p-12 md:p-20 flex flex-col justify-center bg-gray-50/50">
                  <span className="font-mono text-primary font-bold text-lg mb-6 tracking-widest bg-primary/10 w-max px-4 py-2 rounded-full">{item.step} — STRATEGY</span>
                  <h3 className="font-heading text-4xl mb-6 text-dark">{item.title}</h3>
                  <p className="text-dark/70 text-xl font-sans leading-relaxed">{item.desc}</p>
                </div>
                <div className="md:w-1/2 h-full relative">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* F. FOOTER */}
      <footer id="contact" className="bg-[#001020] text-background rounded-t-[4rem] px-6 md:px-12 lg:px-24 pt-24 pb-12 relative z-50">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-16 pb-20 border-b border-white/10">
          <div className="max-w-xl">
            <h2 className="font-drama text-5xl md:text-7xl mb-8">Ready to expand?</h2>
            <p className="text-xl text-accent/70 font-sans mb-12 font-light">
              Connect your brand with the right partners across Africa, the Middle East, and the Indian Ocean.
            </p>
            <MagneticButton onClick={() => scrollTo('contact')} className="bg-white text-[#001020] px-10 py-5 text-lg font-bold shadow-xl flex items-center gap-3">
              Get In Touch <ChevronRight className="w-5 h-5" />
            </MagneticButton>
          </div>

          <div className="grid grid-cols-2 gap-12 text-sm font-sans font-medium text-white/50 w-full lg:w-auto">
            <div className="flex flex-col gap-4">
              <h4 className="text-white text-xs tracking-widest uppercase mb-2">Navigation</h4>
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-left hover:text-white transition-colors">Home</button>
              <button onClick={() => scrollTo('service')} className="text-left hover:text-white transition-colors">Service</button>
              <button onClick={() => scrollTo('expertise')} className="text-left hover:text-white transition-colors">Expertise</button>
              <button onClick={() => scrollTo('contact')} className="text-left hover:text-white transition-colors">Contact</button>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-white text-xs tracking-widest uppercase mb-2">Legal</h4>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-heading font-bold text-2xl tracking-tight flex items-center gap-2">
            <Globe className="w-6 h-6 text-primary" /> ME <span className="opacity-50 text-primary">—</span> AFRICA
          </div>

          <div className="font-mono text-xs flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            SYSTEM OPERATIONAL
          </div>

          <div className="text-xs font-sans text-white/40">
            &copy; {new Date().getFullYear()} ME-AFRICA. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
