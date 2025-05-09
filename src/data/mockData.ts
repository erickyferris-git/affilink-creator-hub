
import { Influencer, Program } from '../types';

export const influencers: Influencer[] = [
  {
    id: '1',
    name: 'Sophia Martinez',
    avatar: 'https://i.pravatar.cc/150?img=1',
    socialChannels: [
      { type: 'instagram', handle: '@sophia.creates', url: 'https://instagram.com/sophia.creates' },
      { type: 'tiktok', handle: '@sophia_creates', url: 'https://tiktok.com/@sophia_creates' }
    ],
    deliverables: ['Instagram Story', '1 TikTok Video', 'Feed Post'],
    metrics: {
      engagement: 3.2,
      followers: 85000,
      averageLikes: 5200
    }
  },
  {
    id: '2',
    name: 'James Wilson',
    avatar: 'https://i.pravatar.cc/150?img=12',
    socialChannels: [
      { type: 'youtube', handle: 'JamesWilsonVlogs', url: 'https://youtube.com/c/JamesWilsonVlogs' },
      { type: 'instagram', handle: '@jameswilson', url: 'https://instagram.com/jameswilson' }
    ],
    deliverables: ['YouTube Video', '3 Instagram Stories'],
    metrics: {
      engagement: 4.5,
      followers: 150000,
      averageLikes: 12500
    }
  },
  {
    id: '3',
    name: 'Emma Johnson',
    avatar: 'https://i.pravatar.cc/150?img=3',
    socialChannels: [
      { type: 'twitter', handle: '@emmajohnson', url: 'https://twitter.com/emmajohnson' },
      { type: 'instagram', handle: '@emma.j', url: 'https://instagram.com/emma.j' }
    ],
    deliverables: ['Twitter Campaign', '2 Instagram Posts'],
    metrics: {
      engagement: 2.8,
      followers: 65000,
      averageLikes: 3800
    }
  },
  {
    id: '4',
    name: 'Michael Chen',
    avatar: 'https://i.pravatar.cc/150?img=11',
    socialChannels: [
      { type: 'tiktok', handle: '@mikechen', url: 'https://tiktok.com/@mikechen' },
      { type: 'youtube', handle: 'MikeChenTech', url: 'https://youtube.com/c/MikeChenTech' }
    ],
    deliverables: ['TikTok Series (3 videos)', '1 YouTube Review'],
    metrics: {
      engagement: 5.1,
      followers: 210000,
      averageLikes: 15600
    }
  },
  {
    id: '5',
    name: 'Olivia Baker',
    avatar: 'https://i.pravatar.cc/150?img=5',
    socialChannels: [
      { type: 'instagram', handle: '@oliviabakes', url: 'https://instagram.com/oliviabakes' },
      { type: 'tiktok', handle: '@olivia_bakes', url: 'https://tiktok.com/@olivia_bakes' }
    ],
    deliverables: ['Recipe Creation', '2 TikToks', '1 Instagram Reel'],
    metrics: {
      engagement: 4.3,
      followers: 95000,
      averageLikes: 8200
    }
  }
];

export const programs: Program[] = [
  {
    id: 'p1',
    name: 'Summer Collection',
    baseUrl: 'https://example.com/summer',
  },
  {
    id: 'p2',
    name: 'Fall Essentials',
    baseUrl: 'https://example.com/fall',
  },
  {
    id: 'p3',
    name: 'Holiday Special',
    baseUrl: 'https://example.com/holiday',
  },
  {
    id: 'p4',
    name: 'Tech Gadgets',
    baseUrl: 'https://example.com/tech',
  },
];
