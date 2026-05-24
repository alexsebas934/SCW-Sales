export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  category: 'lighting' | 'body' | 'wheels' | 'performance' | 'interior' | 'collectibles' | 'cars' | 'lifestyle';
  compatibilities: {
    make: string;
    model: string;
    years: number[]; // e.g. [2010, 2011, 2012, 2013, 2014]
    notes?: string;
  }[];
  condition: 'New' | 'OEM Original / Like New' | 'OEM Original / Good' | 'Custom Specialized' | 'Pre-owned / Mint';
  description: string;
  imageSeed: string; // fallback if we don't have custom images, but we will make high quality ones
  isMustangSpecial: boolean;
  isFordSpecial: boolean;
  listingUrl?: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  comment: string;
  notableStrengths: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FittedVehicle {
  make: string;
  model: string;
  year: string;
}
