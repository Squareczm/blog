export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: 'AI' | 'Nova' | 'Life';
  tags: string[];
  publishedAt: Date;
  updatedAt: Date;
  featuredImage?: string;
  readingTime: number;
  published: boolean;
}

export interface Category {
  id: string;
  name: 'AI' | 'Nova' | 'Life';
  description: string;
  slug: string;
  color: string;
}

export interface Subscriber {
  id: string;
  email: string;
  subscribedAt: Date;
  confirmed: boolean;
  confirmedAt?: Date;
}

export interface Message {
  id: string;
  email: string;
  content: string;
  createdAt: Date;
  read: boolean;
  readAt?: Date;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'education' | 'work' | 'project' | 'other';
}

export interface SiteSettings {
  title: string;
  description: string;
  slogan: string;
  heroImage?: string;
  wechatQr?: string;
  paymentQr?: string;
  copyright: string;
}