// Definice všech typů potřebných pro tRPC klienta

// Základní typy pro projekty
export interface Projects {
  _id: string;
  name: string;
  currency?: string;
  productLimit: number | null;
}

// Typy pro konkurenty
export interface CompetitorDataItem {
  name: string;
  price: number | null;
  url: string;
  stock: boolean;
}

export interface Competitor {
  _id: string;
  domain: string;
  price: number | null;
  stock: boolean | null;
  lastUpdate: Date;
  url: string | null;
}

// Typy pro produkty
export interface Product {
  _id: string;
  ean: string | null;
  code: string | null;
  category1: string | null;
  category2: string | null;
  name: string;
  price: number | null;
  competitorDescription: string | null;
  competitorData: CompetitorDataItem[] | null;
  competitorsPricing: Competitor[];
  competitorsUrl: string | null;
  productImageUrl: boolean;
}

export interface ProductHistory {
  _id: string;
  newPrice: number | null;
  oldPrice: number | null;
  newStock: boolean | null;
  oldStock: boolean | null;
  domain: string;
  added: boolean | null;
  deleted: boolean | null;
  createdAt: Date;
}

// Typy pro vstupy a výstupy procedur
export interface ProductEdit {
  _id: string;
  name: string;
  price: number;
  ean: string;
  code: string;
  category1: string;
  category2: string;
}

export interface ProductAdd {
  name: string;
  price: number;
  ean: string;
  code: string;
  category1: string;
  category2: string;
  projectId: string;
}

export interface ProductUpdateCompetitivenessUrl {
  ean: string;
  competitorsUrl: string;
  competitorDescription: string;
  projectId: string;
} 