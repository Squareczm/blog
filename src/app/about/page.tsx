'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Github, Calendar, MapPin, Mail, Phone } from 'lucide-react';

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
  content?: string;
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

export default function AboutPage() {
  const [aboutData, setAboutData] = useState<AboutData>({
    introduction: '',
    avatar: '',
    backgroundImage: '',
    name: '',
    title: '',
    location: '',
    email: '',
    skills: [],
    timeline: [],
    projects: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch('/api/about', {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
          },
        });
        const data = await response.json();
        setAboutData(data);
      } catch (error) {
        console.error('获取关于页面数据失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
    
    // 每30秒自动刷新一次（前台刷新频率较低）
    const interval = setInterval(fetchAboutData, 30000);
    
    return () => clearInterval(interval);
  }, []);

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

  return (
    <>
      <Header />
      
      <main className="pt-20">
        {/* Hero Section with Images */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={aboutData.backgroundImage || "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"}
              alt="About hero background"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-8">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <Image
                  src={aboutData.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"}
                  alt="Profile photo"
                  fill
                  className="object-cover rounded-full border-4 border-white shadow-lg"
                />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
              {aboutData.name || '关于我'}
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              {aboutData.title || '一个热爱技术与生活的全栈开发者'}
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: aboutData.introduction }}
            />
          </div>
        </section>

        {/* Skills */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                技能专长
              </h2>
              <p className="text-lg text-gray-600">
                我擅长的技术领域和工具
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3">
              {aboutData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-4 py-2 rounded-full bg-white text-gray-800 font-medium shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                成长时光
              </h2>
              <p className="text-lg text-gray-600">
                我的技术成长和职业发展历程
              </p>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gray-200"></div>
              
              {aboutData.timeline.map((item, index) => (
                <div key={item.id} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'} mb-12`}>
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10"></div>
                  
                  {/* Content */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
                      <div className={`flex items-center ${index % 2 === 0 ? 'justify-end' : 'justify-start'} mb-2`}>
                        <span className="text-2xl font-bold text-blue-600 mr-3">{item.year}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.type === 'education' ? 'bg-green-100 text-green-800' :
                          item.type === 'work' ? 'bg-blue-100 text-blue-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {item.type === 'education' ? '教育' : 
                           item.type === 'work' ? '工作' : '成就'}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                项目作品
              </h2>
              <p className="text-lg text-gray-600">
                一些我参与开发的项目和作品
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {aboutData.projects.map((project) => (
                <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {project.featured && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold">
                          推荐
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {project.description}
                    </p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
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
                          className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          <ExternalLink size={16} className="mr-1" />
                          演示
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-gray-600 hover:text-gray-800 text-sm font-medium"
                        >
                          <Github size={16} className="mr-1" />
                          代码
                        </a>
                      )}
                      {project.content && (
                        <Link
                          href={`/projects/${project.id}`}
                          className="inline-flex items-center text-green-600 hover:text-green-800 text-sm font-medium"
                        >
                          详细介绍
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative">
                {/* Background pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100"></div>
                <div className="relative px-8 py-12 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                    <Mail className="w-8 h-8 text-blue-600" />
                  </div>
                  
                  <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                    让我们连接
                  </h2>
                  <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                    如果您对我的工作感兴趣，或者想要合作交流，欢迎随时联系我
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                    >
                      <Mail className="w-5 h-5 mr-2" />
                      发送消息
                    </Link>
                    <a
                      href={`mailto:${aboutData.email || 'contact@ainovalife.com'}`}
                      className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Mail className="w-5 h-5 mr-2" />
                      直接邮件联系
                    </a>
                  </div>
                  
                  {/* Contact info */}
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row gap-6 justify-center text-sm text-gray-600">
                      <div className="flex items-center justify-center">
                        <Mail className="w-4 h-4 mr-2 text-gray-400" />
                        {aboutData.email || 'contact@ainovalife.com'}
                      </div>
                      <div className="flex items-center justify-center">
                        <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                        {aboutData.location || '中国，北京'}
                      </div>
                      <div className="flex items-center justify-center">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        通常24小时内回复
                      </div>
                    </div>
                  </div>
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