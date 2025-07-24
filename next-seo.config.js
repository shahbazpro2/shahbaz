const canonicalUrl = 'https://shahbaz.pro';
const metaImage = '/images/shahbaz-new.png';
const metaDescription =
  'Passionate Full Stack Developer specializing in JavaScript ecosystem. I work with React, Next.js, Node.js, and Nest.js to create modern, scalable web applications.';

const defaultSEOConfig = {
  defaultTitle: 'Muhammad Shahbaz - Full Stack Developer',
  description: metaDescription,
  canonical: canonicalUrl,
  openGraph: {
    canonical: canonicalUrl,
    title: 'Muhammad Shahbaz - Full Stack Developer',
    description: metaDescription,
    type: 'website',
    images: [
      {
        url: metaImage,
        alt: 'shahbaz.dev og-image',
        width: 800,
        height: 600,
      },
      {
        url: metaImage,
        alt: 'shahbaz.dev og-image',
        width: 1200,
        height: 630,
      },
      {
        url: metaImage,
        alt: 'shahbaz.dev og-image',
        width: 1600,
        height: 900,
      },
    ],
    site_name: 'shahbazpro2',
  },
  twitter: {
    handle: '@shahbazpro2',
    site: '@shahbazpro2',
    cardType: 'summary_large_image',
  },
};

export default defaultSEOConfig;
