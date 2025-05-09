
export interface Influencer {
  id: string;
  name: string;
  avatar: string;
  socialChannels: SocialChannel[];
  deliverables: string[];
  metrics: {
    engagement: number;
    followers: number;
    averageLikes: number;
  };
  affiliateLink?: string;
}

export interface SocialChannel {
  type: 'instagram' | 'tiktok' | 'youtube' | 'twitter';
  handle: string;
  url: string;
}

export interface Program {
  id: string;
  name: string;
  baseUrl: string;
}

export interface DiscountType {
  type: 'percentage' | 'fixed';
  value: number;
}

export interface AffiliateFormData {
  programId: string;
  itemParams: string;
  discount: DiscountType;
}
