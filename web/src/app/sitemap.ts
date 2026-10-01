import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://zenith.work';
  const routes = [
    '',
    '/about',
    '/how-it-works',
    '/professionals',
    '/projects',
    '/categories',
    '/for-professionals',
    '/for-clients',
    '/pricing',
    '/faq',
    '/terms',
    '/privacy',
    '/refund',
    '/dispute',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
