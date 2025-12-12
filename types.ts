export enum PostType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  AUDIO = 'AUDIO'
}

export enum Category {
  EDUCATION = 'শিক্ষা',
  HEALTH = 'স্বাস্থ্য',
  ECONOMY = 'অর্থনীতি',
  JUSTICE = 'বিচার বিভাগ',
  ADMINISTRATION = 'প্রশাসন',
  CULTURE = 'সংস্কৃতি',
  AGRICULTURE = 'কৃষি',
  OTHERS = 'অন্যান্য'
}

export enum PostStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export interface Post {
  id: string;
  type: PostType;
  content: string; // Text content or URL for media
  category: Category;
  status: PostStatus;
  timestamp: number;
  likes: number;
  authorName?: string; // Optional
}

export interface NavItem {
  label: string;
  id: string;
}