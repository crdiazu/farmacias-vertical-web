import { ProductCarousel } from '@/components/catalog/ProductCarousel';
import { BlogSection } from '@/components/home/BlogSection';
import { BrandStrip } from '@/components/home/BrandStrip';
import { HeroSlideshow } from '@/components/home/HeroSlideshow';
import { ProgramsBanner } from '@/components/home/ProgramsBanner';
import { TrustBar } from '@/components/home/TrustBar';
import { JsonLd } from '@/components/seo/JsonLd';
import { getAppConfig } from '@/lib/config/env';
import { getCatalogRepository } from '@/lib/repositories';

export const revalidate = 300;

export default async function HomePage() {
  const config = getAppConfig();
  const repo = getCatalogRepository();

  const [sections, brands, posts] = await Promise.all([
    repo.getFeaturedSections(),
    repo.getFeaturedBrands(),
    repo.getRecentBlogPosts(3),
  ]);

  const organizationLd = {
    '@context': 'https://schema.org',
    '@type': 'Pharmacy',
    name: config.NEXT_PUBLIC_SITE_NAME,
    url: config.NEXT_PUBLIC_SITE_URL,
    areaServed: 'CL',
    priceRange: 'CLP',
  };

  return (
    <>
      <JsonLd data={organizationLd} />
      <HeroSlideshow whatsappNumber={config.NEXT_PUBLIC_WHATSAPP_NUMBER} />
      <TrustBar />

      {sections.map((section) => (
        <ProductCarousel
          key={section.categorySlug}
          title={section.title}
          subtitle={section.subtitle}
          ctaHref={section.ctaHref}
          products={section.products}
          regulatoryMode={config.STORE_REGULATORY_MODE}
          whatsappNumber={config.NEXT_PUBLIC_WHATSAPP_NUMBER}
        />
      ))}

      <BrandStrip brands={brands} />
      <ProgramsBanner />
      <BlogSection posts={posts} />
    </>
  );
}
