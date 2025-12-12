import { Category, Post, PostStatus, PostType } from './types';

export const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    type: PostType.TEXT,
    content: 'শিক্ষা ব্যবস্থায় নৈতিকতা ও প্রযুক্তির সমন্বয় চাই। প্রতিটি গ্রামে মানসম্মত স্কুল নিশ্চিত করতে হবে।',
    category: Category.EDUCATION,
    status: PostStatus.APPROVED,
    timestamp: Date.now() - 10000000,
    likes: 120,
    authorName: 'আব্দুল্লাহ'
  },
  {
    id: '2',
    type: PostType.TEXT,
    content: 'কৃষকদের জন্য ফসলের ন্যায্য মূল্য নিশ্চিত করতে হবে। মধ্যস্বত্বভোগীদের দৌরাত্ম্য কমাতে হবে।',
    category: Category.AGRICULTURE,
    status: PostStatus.APPROVED,
    timestamp: Date.now() - 5000000,
    likes: 85,
    authorName: 'রহিম মিয়া'
  },
  {
    id: '3',
    type: PostType.IMAGE,
    content: 'https://picsum.photos/400/300?random=1',
    category: Category.JUSTICE,
    status: PostStatus.APPROVED,
    timestamp: Date.now() - 2000000,
    likes: 200,
    authorName: 'সচেতন নাগরিক'
  },
  {
    id: '4',
    type: PostType.TEXT,
    content: 'হাসপাতালে গরিব রোগীদের জন্য বিনামূল্যে চিকিৎসার ব্যবস্থা চাই।',
    category: Category.HEALTH,
    status: PostStatus.PENDING,
    timestamp: Date.now() - 100000,
    likes: 0,
    authorName: 'অজ্ঞাত'
  }
];

export const CATEGORIES = Object.values(Category);