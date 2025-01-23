import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url';


export const client = createClient({
  projectId : "9drwfmlx",
  dataset : "ecommercce",
  apiVersion: '2025-01-17',
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token:process.env.NEXT_PUBLIC_SANITY_TOKEN,
})

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
