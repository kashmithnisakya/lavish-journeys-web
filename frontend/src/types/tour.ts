export interface TourPackageData {
  title: string;
  duration: string;
  description: string;
  highlights: string[];
  price: {
    from: number;
    category: string;
  };
  image?: string;
  itinerary: Array<{
    day: number;
    title: string;
    activities: string[];
    accommodation?: string;
  }>;
  pricing: Array<{
    category: string;
    pax3: number;
    pax8: number;
    pax16: number;
    pax32: number;
  }>;
  inclusions: string[];
  exclusions: string[];
  hotels: Array<{
    destination: string;
    hotel: string;
    supplement?: string;
  }>;
  entranceFees: Array<{
    attraction: string;
    fee: number;
  }>;
}

export interface TourPackagesDataType {
  [key: string]: TourPackageData;
}

export interface Destination {
  img: string;
  title: string;
  desc: string;
}

export interface TourCategory {
  id: string;
  name: string;
}

export interface ProcessedTourPackage {
  key: string;
  title: string;
  duration: string;
  description: string;
  highlights: string[];
  price: {
    from: number;
    category: string;
  };
  category: string;
  image: string;
  badge?: string;
}
