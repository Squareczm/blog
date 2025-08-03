import { NextRequest, NextResponse } from 'next/server';
import { readJsonFile, writeJsonFile, DATA_FILES } from '@/lib/storage';

interface TimelineItem {
  id: string;
  year: string;
  title: string;
  description: string;
  type: 'education' | 'work' | 'achievement';
}

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  content?: string; // 项目详细内容
}

interface AboutData {
  introduction: string;
  avatar: string;
  backgroundImage: string;
  name: string;
  title: string;
  location: string;
  email: string;
  skills: string[];
  timeline: TimelineItem[];
  projects: Project[];
}

// 默认数据
const defaultAboutData: AboutData = {
  introduction: `
    <h2>关于我</h2>
    <p>你好！我是一名热爱技术的全栈开发者，专注于人工智能和现代Web开发技术。</p>
    <p>我相信技术的力量可以改变世界，同时也热爱生活中的美好事物——从雪山徒步到代码编写，每一次经历都让我成长。</p>
    <p>在这个博客中，我分享我在AI、技术学习和生活感悟方面的思考和经验。</p>
  `,
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  backgroundImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  name: 'AInova作者',
  title: '全栈开发者 & AI研究者',
  location: '中国，北京',
  email: 'contact@ainovalife.com',
  skills: [
    'JavaScript/TypeScript', 'React/Next.js', 'Node.js', 'Python', 
    'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch',
    'AWS/云服务', 'Docker', 'Git', 'Agile开发'
  ],
  timeline: [
    {
      id: '1',
      year: '2024',
      title: '开始AI博客创作',
      description: '创建AInovalife博客，分享AI技术和生活感悟',
      type: 'achievement'
    },
    {
      id: '2', 
      year: '2023',
      title: '全栈开发工程师',
      description: '专注于React、Node.js和AI技术栈的开发工作',
      type: 'work'
    },
    {
      id: '3',
      year: '2022',
      title: '计算机科学硕士毕业',
      description: '专业方向：人工智能与机器学习',
      type: 'education'
    },
    {
      id: '4',
      year: '2020',
      title: '开始机器学习研究',
      description: '深入学习深度学习和自然语言处理技术',
      type: 'achievement'
    }
  ],
  projects: [
    {
      id: '1',
      title: 'AInovalife博客系统',
      description: '基于Next.js构建的个人博客平台，支持内容管理和用户交互',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'React'],
      demoUrl: 'https://ainovalife.com',
      githubUrl: 'https://github.com/user/ainovalife',
      featured: true,
      content: `
        <h3>项目概述</h3>
        <p>AInovalife是一个现代化的个人博客平台，采用Next.js 15和TypeScript构建。</p>
        
        <h3>主要特性</h3>
        <ul>
          <li>响应式设计，支持移动端和桌面端</li>
          <li>完整的内容管理系统</li>
          <li>用户订阅和留言功能</li>
          <li>分类和标签管理</li>
          <li>SEO优化</li>
        </ul>
        
        <h3>技术栈</h3>
        <p>前端使用Next.js 15、TypeScript和Tailwind CSS，后端API使用Next.js的App Router。</p>
      `
    },
    {
      id: '2',
      title: 'AI文本分析工具',
      description: '使用机器学习技术分析文本情感和主题的Web应用',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      technologies: ['Python', 'Flask', 'scikit-learn', 'NLTK'],
      githubUrl: 'https://github.com/user/ai-text-analyzer',
      featured: false,
      content: `
        <h3>项目概述</h3>
        <p>基于自然语言处理技术的文本分析工具，可以分析文本的情感倾向和主题分类。</p>
        
        <h3>功能特性</h3>
        <ul>
          <li>文本情感分析</li>
          <li>主题分类</li>
          <li>关键词提取</li>
          <li>批量处理</li>
        </ul>
      `
    }
  ]
};

export async function GET() {
  try {
    const aboutData = await readJsonFile(DATA_FILES.ABOUT, defaultAboutData);
    return NextResponse.json(aboutData);
  } catch (error) {
    console.error('读取关于页面数据失败:', error);
    return NextResponse.json(defaultAboutData);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const currentData = await readJsonFile(DATA_FILES.ABOUT, defaultAboutData);
    const updatedData = { ...currentData, ...data };
    
    await writeJsonFile(DATA_FILES.ABOUT, updatedData);
    
    console.log('关于页面数据已更新:', updatedData);
    
    return NextResponse.json(
      { message: '更新成功', data: updatedData },
      { status: 200 }
    );
  } catch (error) {
    console.error('更新关于页面数据失败:', error);
    return NextResponse.json(
      { error: '更新失败' },
      { status: 500 }
    );
  }
}

// 时间线项目管理
export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const data = await request.json();
    
    const aboutData = await readJsonFile(DATA_FILES.ABOUT, defaultAboutData);

    switch (action) {
      case 'add-timeline':
        const newTimelineItem: TimelineItem = {
          id: Date.now().toString(),
          ...data
        };
        aboutData.timeline.push(newTimelineItem);
        aboutData.timeline.sort((a, b) => parseInt(b.year) - parseInt(a.year));
        break;

      case 'update-timeline':
        const timelineIndex = aboutData.timeline.findIndex(item => item.id === data.id);
        if (timelineIndex !== -1) {
          aboutData.timeline[timelineIndex] = { ...aboutData.timeline[timelineIndex], ...data };
          aboutData.timeline.sort((a, b) => parseInt(b.year) - parseInt(a.year));
        } else {
          return NextResponse.json({ error: '时间线项目不存在' }, { status: 404 });
        }
        break;

      case 'add-project':
        const newProject: Project = {
          id: Date.now().toString(),
          ...data
        };
        aboutData.projects.push(newProject);
        break;

      case 'update-project':
        const projectIndex = aboutData.projects.findIndex(project => project.id === data.id);
        if (projectIndex !== -1) {
          aboutData.projects[projectIndex] = { ...aboutData.projects[projectIndex], ...data };
        } else {
          return NextResponse.json({ error: '项目不存在' }, { status: 404 });
        }
        break;

      default:
        return NextResponse.json({ error: '无效的操作' }, { status: 400 });
    }

    await writeJsonFile(DATA_FILES.ABOUT, aboutData);

    return NextResponse.json(
      { message: '操作成功', data: aboutData },
      { status: 201 }
    );
  } catch (error) {
    console.error('操作数据失败:', error);
    return NextResponse.json(
      { error: '操作失败' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const id = searchParams.get('id');

    if (!type || !id) {
      return NextResponse.json({ error: '缺少参数' }, { status: 400 });
    }

    const aboutData = await readJsonFile(DATA_FILES.ABOUT, defaultAboutData);

    switch (type) {
      case 'timeline':
        aboutData.timeline = aboutData.timeline.filter(item => item.id !== id);
        break;

      case 'project':
        aboutData.projects = aboutData.projects.filter(project => project.id !== id);
        break;

      default:
        return NextResponse.json({ error: '无效的类型' }, { status: 400 });
    }

    await writeJsonFile(DATA_FILES.ABOUT, aboutData);

    return NextResponse.json(
      { message: '删除成功', data: aboutData },
      { status: 200 }
    );
  } catch (error) {
    console.error('删除数据失败:', error);
    return NextResponse.json(
      { error: '删除失败' },
      { status: 500 }
    );
  }
}