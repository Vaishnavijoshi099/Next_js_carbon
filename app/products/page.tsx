'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import Head from 'next/head';
import { Loading, ContentSwitcher, Switch, FlexGrid, Row, Column, Tile } from '@carbon/react';
import './products.scss';
import '/app/navbar.scss';

const loadLanguage = async (lang: string) => {
  try {
    const module = await import(`../messages/${lang}.json`);
    return module.default;
  } catch (error) {
    console.error('Error loading language:', error);
    return {};
  }
};

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

  // Fetch and load language on language change
  useEffect(() => {
    loadLanguage(language).then((data) => setTranslations(data));
  }, [language]);

  // Fetch product data
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('https://dummyjson.com/products');
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await res.json();
        setProducts(data.products);
        setFilteredProducts(data.products); // Set all products initially
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(translations?.products?.errorLoading || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [translations]);

  // Filter products based on selected filter
  const handleFilterChange = (selectedIndex: number) => {
    let filtered = [...products];

    if (selectedIndex === 1) {
      filtered = products.filter(product => product.rating >= 4); // Featured products
    } else if (selectedIndex === 2) {
      filtered = products.filter(product => product.discountPercentage > 20); // On-sale products
    }

    setSelectedFilter(selectedIndex === 0 ? 'all' : selectedIndex === 1 ? 'featured' : 'sale');
    setFilteredProducts(filtered);
  };

  // Navigate to product details page
  const handleTileClick = (product: Product) => {
    router.push(`/products/${product.id}`);
  };

  // Change language function
  const changeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = event.target.value;
    setLanguage(selectedLang);
    loadLanguage(selectedLang).then((data) => setTranslations(data));
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

          {/* <div className="search-bar">
            <input type="text" placeholder={translations?.products?.search || "Search products..."} />
          </div> */}

          <div className="language-selector">
            <select onChange={changeLanguage} value={language}>
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </select>
          </div>
        </div>

        <div className="filterControls">
          <ContentSwitcher
            onChange={({ index = 0 }) => handleFilterChange(index)}
            selectedIndex={selectedFilter === 'all' ? 0 : selectedFilter === 'featured' ? 1 : 2}
            size="md"
          >
            <Switch name="all" text={translations?.products?.all || 'All'} />
            <Switch name="featured" text={translations?.products?.featured || 'Featured'} />
            <Switch name="sale" text={translations?.products?.sale || 'On Sale'} />
          </ContentSwitcher>
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
