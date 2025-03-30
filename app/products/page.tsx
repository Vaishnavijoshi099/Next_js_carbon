'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import Head from 'next/head';
import { Loading, ContentSwitcher, Switch, FlexGrid, Row, Column, Tile } from '@carbon/react';
import './products.scss';
import '/app/navbar.scss';


interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  brand: string;
  category: string;
  discountPercentage: number;
  rating: number;
}

const ProductTile = ({
  product,
  onClick,
  translations
}: {
  product: Product;
  onClick: () => void;
  translations: any;
}) => {
  const discount = product.discountPercentage > 0 ? (
    <div className="discount">
      {translations?.products?.discount || 'Save'}: {product.discountPercentage}%
    </div>
  ) : null;

  return (
    <Tile className="productTile" onClick={onClick}>
      <img src={product.thumbnail} alt={product.title} className="thumbnail" />
      <h3 className="productTitle">{product.title}</h3>
      <div className="productPrice">${product.price}</div>
      {discount}
      <div className="productBrand">{translations?.products?.brand || 'Brand'}: {product.brand}</div>
      <div className="productCategory">{translations?.products?.category || 'Category'}: {product.category}</div>
    </Tile>
  );
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [language, setLanguage] = useState<string>('en'); // Default language is English
  const [translations, setTranslations] = useState<any>({});
  const router = useRouter();

 

  // Fetch product data
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('https://dummyjson.com/products');
        const data = await res.json();
        setProducts(data.products);
        setFilteredProducts(data.products); 
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(translations?.products?.errorLoading || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [translations]);

  
  // Navigate to product details page
  const handleTileClick = (product: Product) => {
    router.push(`/products/${product.id}`);
  };

  if (loading) {
    return (
      <div className="loading">
        <Loading description={translations?.products?.errorLoading || "Loading products..."} withOverlay={false} />
      </div>
    );
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <>
      <Head>
        <title>{translations?.products?.productsTitle || 'Products'} | Carbon Store</title>
      </Head>
      <div className="container">
        <div className="header">
          <h1 className="title">{translations?.products?.productsTitle || 'Products'}</h1>

        </div>

       

        <div className="productsGrid">
          {filteredProducts.map((product) => (
            <ProductTile
              key={product.id}
              product={product}
              onClick={() => handleTileClick(product)}
              translations={translations}
            />
          ))}
        </div>
      </div>
    </>
  );
}
