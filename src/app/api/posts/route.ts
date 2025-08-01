import { NextRequest, NextResponse } from 'next/server';

interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: 'ai' | 'nova' | 'life';
  status: 'draft' | 'published';
  publishedAt: string | null;
  slug: string;
  featuredImage: string;
  tags: string[];
  readingTime: number;
}

// 使用全局变量确保数据持久化
declare global {
  var posts: Post[] | undefined;
}

// 初始化或使用现有的全局数据
if (!global.posts) {
  global.posts = [
  {
    id: '1',
    title: '深度学习在自然语言处理中的最新进展',
    content: '# 深度学习在自然语言处理中的最新进展\n\n自然语言处理（NLP）领域在过去几年中经历了革命性的变化...',
    excerpt: '探索深度学习如何改变自然语言处理领域，从Transformer到GPT的发展历程。',
    category: 'ai',
    status: 'published',
    publishedAt: '2024-01-15T10:00:00Z',
    slug: 'deep-learning-nlp-progress',
    featuredImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    tags: ['深度学习', 'NLP', 'AI'],
    readingTime: 8
  },
  {
    id: '2',
    title: '我的2024年学习计划：从零到全栈开发者',
    content: '# 我的2024年学习计划\n\n新的一年，新的开始。我为自己制定了一个全面的学习计划...',
    excerpt: '分享我的全栈开发学习路径，从前端到后端，从理论到实践的完整规划。',
    category: 'nova',
    status: 'published',
    publishedAt: '2024-01-10T14:00:00Z',
    slug: 'my-2024-learning-plan',
    featuredImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    tags: ['学习', '全栈开发', '计划'],
    readingTime: 6
  },
  {
    id: '3',
    title: '雪山徒步：在自然中寻找内心的平静',
    content: '# 雪山徒步：在自然中寻找内心的平静\n\n在这个快节奏的时代，我们都需要偶尔停下来...',
    excerpt: '记录一次难忘的雪山徒步经历，分享在大自然中获得的心灵感悟。',
    category: 'life',
    status: 'published',
    publishedAt: '2024-01-05T09:00:00Z',
    slug: 'mountain-hiking-peace',
    featuredImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    tags: ['徒步', '自然', '生活感悟'],
    readingTime: 5
  },
  {
    id: '4',
    title: 'Next.js 15 新特性详解',
    content: '# Next.js 15 新特性详解\n\nNext.js 15 带来了许多令人兴奋的新功能...',
    excerpt: '深入了解 Next.js 15 的新特性，包括性能优化和开发体验改进。',
    category: 'ai',
    status: 'draft',
    publishedAt: null,
    slug: 'nextjs-15-features',
    featuredImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    tags: ['Next.js', 'React', '前端'],
    readingTime: 7
  }
];
}

let posts = global.posts;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const category = searchParams.get('category');
  const status = searchParams.get('status');
  const limit = searchParams.get('limit');

  let filteredPosts = [...posts];

  // 按slug查找单个文章
  if (slug) {
    const post = filteredPosts.find(p => p.slug === slug);
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json({ post });
  }

  // 按分类筛选
  if (category) {
    filteredPosts = filteredPosts.filter(p => p.category === category);
  }

  // 按状态筛选
  if (status) {
    filteredPosts = filteredPosts.filter(p => p.status === status);
  }

  // 按发布时间倒序排列
  filteredPosts.sort((a, b) => {
    if (!a.publishedAt) return 1;
    if (!b.publishedAt) return -1;
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  // 限制数量
  if (limit) {
    filteredPosts = filteredPosts.slice(0, parseInt(limit));
  }

  return NextResponse.json({ posts: filteredPosts });
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const newPost: Post = {
      id: Date.now().toString(),
      title: data.title || '无标题',
      content: data.content || '',
      excerpt: data.excerpt || '',
      category: data.category || 'ai',
      status: data.status || 'draft',
      publishedAt: data.status === 'published' ? new Date().toISOString() : null,
      slug: generateSlug(data.title || '无标题'),
      featuredImage: data.coverImage || 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      tags: data.tags || [],
      readingTime: Math.ceil((data.content || '').length / 500)
    };

    posts.push(newPost);
    global.posts = posts; // 更新全局变量

    console.log('新文章已创建:', newPost);

    return NextResponse.json(
      { message: '文章创建成功', post: newPost },
      { status: 201 }
    );
  } catch (error) {
    console.error('创建文章错误:', error);
    return NextResponse.json(
      { error: '创建文章失败' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const { id, ...updateData } = data;

    const postIndex = posts.findIndex(p => p.id === id);
    if (postIndex === -1) {
      return NextResponse.json({ error: '文章不存在' }, { status: 404 });
    }

    posts[postIndex] = {
      ...posts[postIndex],
      ...updateData,
      publishedAt: updateData.status === 'published' && !posts[postIndex].publishedAt 
        ? new Date().toISOString() 
        : posts[postIndex].publishedAt
    };

    global.posts = posts; // 更新全局变量
    console.log('文章已更新:', posts[postIndex]);

    return NextResponse.json(
      { message: '文章更新成功', post: posts[postIndex] },
      { status: 200 }
    );
  } catch (error) {
    console.error('更新文章错误:', error);
    return NextResponse.json(
      { error: '更新文章失败' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: '缺少文章ID' }, { status: 400 });
    }

    const postIndex = posts.findIndex(p => p.id === id);
    if (postIndex === -1) {
      return NextResponse.json({ error: '文章不存在' }, { status: 404 });
    }

    const deletedPost = posts.splice(postIndex, 1)[0];
    global.posts = posts; // 更新全局变量

    console.log('文章已删除:', deletedPost);

    return NextResponse.json(
      { message: '文章删除成功' },
      { status: 200 }
    );
  } catch (error) {
    console.error('删除文章错误:', error);
    return NextResponse.json(
      { error: '删除文章失败' },
      { status: 500 }
    );
  }
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();
}