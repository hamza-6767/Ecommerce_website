import { client } from '@/sanity/lib/client';
import ProductDetails from '@/components/ProductDetails';

async function getProduct(slug) {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  return client.fetch(query);
}

async function getProducts() {
  const query = '*[_type == "product"]';
  return client.fetch(query);
}

export async function generateStaticParams() {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }`;
  
  const products = await client.fetch(query);
  
  return products.map((product) => ({
    slug: product.slug.current,
  }));
}

export default async function Page({ params: {slug} }) {
  const product = await getProduct(slug);
  const products = await getProducts();
  
  return <ProductDetails product={product} products={products} />;
}