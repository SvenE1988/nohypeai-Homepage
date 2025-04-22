
import React from "react";
import NavHeader from "../components/blocks/nav-header";
import Footer from "../components/Footer";
import { getOptimizedImageProps } from "@/utils/optimizedImage";
import { OptimizedFAQImage } from "@/components/faq/OptimizedFAQImage";
import FAQList from "@/components/faq/FAQList";
import { useDeferredLoading } from "@/hooks/useDeferredLoading";

export default function FAQPage() {
  const isLoaded = useDeferredLoading({
    delay: 300,
    priority: false
  });

  const heroImageProps = getOptimizedImageProps({
    src: "/placeholder.svg",
    alt: "FAQ section hero image",
    width: 1200,
    height: 400,
    priority: true,
    className: "hidden lg:block absolute -z-10 opacity-5 top-0 right-0 w-2/3"
  });

  return (
    <main className="min-h-screen bg-black w-full overflow-x-hidden">
      <NavHeader />

      {/* Hero image with low opacity as background decoration */}
      {isLoaded ? (
        <OptimizedFAQImage
          src={heroImageProps.src}
          alt={heroImageProps.alt}
          priority={true}
          className={heroImageProps.className}
          width={heroImageProps.width}
          height={heroImageProps.height}
        />
      ) : null}

      <section className="max-w-3xl mx-auto py-20 px-4">
        <h1 className="text-4xl font-bold text-white mb-4 text-center">
          Häufig gestellte Fragen
        </h1>
        <p className="text-gray-400 mb-8 text-center">
          Antworten rund um unsere KI‑Lösungen – kurz, klar, ehrlich.
        </p>

        <FAQList />
      </section>
      <Footer />
    </main>
  );
}
