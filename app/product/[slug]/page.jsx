import { client } from "../../../sanity/lib/client";
import ProductDetails from "../../../components/ProductDetails";

async function getProduct(slug) {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  return await client.fetch(query);
}

async function getProducts() {
  const query = '*[_type == "product"]';
  return await client.fetch(query);
}

export async function generateStaticParams() {
  const query = `*[_type == "product"] { slug { current } }`;
  const products = await client.fetch(query);
  return products.map(product => ({ params: { slug: product.slug.current } }));
}

export default async function Page({ params }) {
  if (!params?.slug) return null;
  const product = await getProduct(params.slug);
  const products = await getProducts();
  
  return product ? <ProductDetails product={product} products={products} /> : null;
}