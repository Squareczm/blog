'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SupportButton from '@/components/SupportButton';

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

export default function ProjectDetail() {
  const params = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch('/api/about', {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
          },
        });
        const data = await response.json();
        const foundProject = data.projects.find((p: Project) => p.id === params.id);
        
        if (foundProject) {
          setProject(foundProject);
        } else {
          // 项目不存在，可以重定向到关于页面
          window.location.href = '/about';
        }
      } catch (error) {
        console.error('获取项目详情失败:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProject();
    }
  }, [params.id]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="pt-20 min-h-screen flex items-center justify-center">
          <div className="text-gray-500">加载中...</div>
        </main>
        <Footer />
      </>
    );
  }

  if (!project) {
    return (
      <>
        <Header />
        <main className="pt-20 min-h-screen flex items-center justify-center">
          <div className="text-gray-500">项目不存在</div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      
      <main className="pt-20">
        {/* Project Header */}
        <section className="relative">
          <div className="absolute inset-0">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="flex items-center mb-6">
              <Link
                href="/about"
                className="inline-flex items-center text-white hover:text-gray-200 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                返回项目列表
              </Link>
            </div>
            
            <div className="text-white">
              {project.featured && (
                <span className="inline-block bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold mb-4">
                  推荐项目
                </span>
              )}
              
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                {project.title}
              </h1>
              
              <p className="text-xl text-gray-200 max-w-3xl leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>
        </section>

        {/* Project Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {project.content ? (
                  <div 
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: project.content }}
                  />
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500">暂无详细内容</p>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Project Info */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">项目信息</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">技术栈</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {project.demoUrl && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">演示链接</h4>
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 hover:text-blue-800"
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          查看演示
                        </a>
                      </div>
                    )}

                    {project.githubUrl && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">源代码</h4>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-gray-600 hover:text-gray-800"
                        >
                          <Github className="w-4 h-4 mr-1" />
                          查看代码
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Support */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">支持作者</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    如果这个项目对您有帮助，请给作者一些鼓励
                  </p>
                  <SupportButton />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}