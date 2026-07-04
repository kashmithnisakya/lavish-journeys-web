export interface TourPackageData {
  title: string;
  duration: string;
  description: string;
  highlights: string[];
  image?: string;
  itinerary: Array<{
    day: number;
    title: string;
    activities: string[];
    accommodation?: string;
  }>;
  inclusions: string[];
  exclusions: string[];
  hotels: Array<{
    destination: string;
    hotel: string;
    supplement?: string;
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
  category: string;
  image: string;
  badge?: string;
}
