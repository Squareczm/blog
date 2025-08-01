import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github, Calendar } from 'lucide-react';

interface ProjectPageProps {
  params: Promise<{
    id: string;
  }>;
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
  content?: string;
}

async function getProject(id: string): Promise<Project | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'}/api/about`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    return data.projects?.find((project: Project) => project.id === id) || null;
  } catch (error) {
    console.error('获取项目详情失败:', error);
    return null;
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project || !project.content) {
    notFound();
  }

  return (
    <>
      <Header />
      
      <main className="pt-20">
        {/* Header */}
        <section className="py-12 bg-gray-50 border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <Link
                href="/about"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回关于页面
              </Link>
            </div>
            
            <div className="flex items-center space-x-3 mb-4">
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
                {project.title}
              </h1>
              {project.featured && (
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                  推荐项目
                </span>
              )}
            </div>
            
            <p className="text-lg text-gray-600 mb-6">
              {project.description}
            </p>
            
            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            {/* Links */}
            <div className="flex space-x-4">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  查看演示
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Github className="w-4 h-4 mr-2" />
                  查看代码
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Project Image */}
        <section className="py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative h-64 md:h-96 rounded-xl overflow-hidden shadow-lg">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        {/* Project Content */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <article 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: project.content }}
            />
          </div>
        </section>

        {/* Related Projects or Call to Action */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">
              查看更多项目
            </h2>
            <p className="text-gray-600 mb-8">
              了解我的其他作品和技术实践
            </p>
            <Link
              href="/about#projects"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              返回项目列表
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}