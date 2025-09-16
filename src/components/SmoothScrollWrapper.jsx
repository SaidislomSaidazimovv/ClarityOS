import { useEffect } from "react";

export default function SmoothScrollWrapper({ children }) {
  useEffect(() => {
    let scrollTarget = window.scrollY;
    let currentScroll = window.scrollY;

    const handleScroll = (e) => {
      e.preventDefault();

      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      scrollTarget += e.deltaY;

      if (scrollTarget < 0) scrollTarget = 0;
      if (scrollTarget > maxScroll) scrollTarget = maxScroll;
    };

    const animate = () => {
      currentScroll += (scrollTarget - currentScroll) * 0.08;
      window.scrollTo(0, currentScroll);
      requestAnimationFrame(animate);
    };

    window.addEventListener("wheel", handleScroll, { passive: false });
    animate();

    return () => window.removeEventListener("wheel", handleScroll);
  }, []);

  return <>{children}</>;
}
