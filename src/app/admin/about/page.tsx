'use client';
import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, Eye, ExternalLink, Github } from 'lucide-react';
import RichTextEditor from '@/components/RichTextEditor';
import ImageUpload from '@/components/ImageUpload';

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

export default function AboutManagement() {
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
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'intro' | 'timeline' | 'projects'>('intro');
  
  // 模态框状态
  const [showTimelineModal, setShowTimelineModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingTimeline, setEditingTimeline] = useState<TimelineItem | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // 表单状态
  const [timelineForm, setTimelineForm] = useState({
    year: '',
    title: '',
    description: '',
    type: 'work' as 'education' | 'work' | 'achievement'
  });

  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    image: '',
    technologies: '',
    demoUrl: '',
    githubUrl: '',
    featured: false,
    content: ''
  });

  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    fetchAboutData();
    
    // 每10秒自动刷新一次
    const interval = setInterval(fetchAboutData, 10000);
    
    return () => clearInterval(interval);
  }, []);

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

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(aboutData),
      });

      if (response.ok) {
        alert('保存成功！');
      } else {
        alert('保存失败');
      }
    } catch (error) {
      console.error('保存失败:', error);
      alert('保存失败');
    } finally {
      setSaving(false);
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !aboutData.skills.includes(newSkill.trim())) {
      setAboutData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setAboutData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const handleAddTimeline = async () => {
    try {
      const response = await fetch('/api/about?action=add-timeline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(timelineForm),
      });

      if (response.ok) {
        const data = await response.json();
        setAboutData(data.data);
        setShowTimelineModal(false);
        setTimelineForm({ year: '', title: '', description: '', type: 'work' });
      }
    } catch (error) {
      console.error('添加时间线失败:', error);
    }
  };

  const handleDeleteTimeline = async (id: string) => {
    if (!confirm('确定要删除这个时间线项目吗？')) return;

    try {
      const response = await fetch(`/api/about?type=timeline&id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const data = await response.json();
        setAboutData(data.data);
      }
    } catch (error) {
      console.error('删除时间线失败:', error);
    }
  };

  const handleAddProject = async () => {
    try {
      const projectData = {
        ...projectForm,
        technologies: projectForm.technologies.split(',').map(t => t.trim())
      };

      const response = await fetch('/api/about?action=add-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
      });

      if (response.ok) {
        const data = await response.json();
        setAboutData(data.data);
        setShowProjectModal(false);
        setProjectForm({
          title: '', description: '', image: '', technologies: '', 
          demoUrl: '', githubUrl: '', featured: false, content: ''
        });
      }
    } catch (error) {
      console.error('添加项目失败:', error);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('确定要删除这个项目吗？')) return;

    try {
      const response = await fetch(`/api/about?type=project&id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const data = await response.json();
        setAboutData(data.data);
      }
    } catch (error) {
      console.error('删除项目失败:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">加载中...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">关于页面管理</h1>
          <p className="mt-1 text-sm text-gray-600">管理个人简介、时间线和项目信息</p>
        </div>
        <div className="flex space-x-3">
          <a
            href="/about"
            target="_blank"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Eye className="w-4 h-4 mr-2" />
            预览页面
          </a>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? '保存中...' : '保存更改'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'intro', name: '个人简介' },
            { id: 'timeline', name: '时间线' },
            { id: 'projects', name: '项目管理' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'intro' && (
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">基本信息</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  头像
                </label>
                <ImageUpload
                  onImageUploaded={(url) => setAboutData(prev => ({ ...prev, avatar: url }))}
                  currentImage={aboutData.avatar}
                  className="max-w-xs"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  背景大图
                </label>
                <ImageUpload
                  onImageUploaded={(url) => setAboutData(prev => ({ ...prev, backgroundImage: url }))}
                  currentImage={aboutData.backgroundImage}
                  className="max-w-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  姓名
                </label>
                <input
                  type="text"
                  value={aboutData.name}
                  onChange={(e) => setAboutData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  职位/角色
                </label>
                <input
                  type="text"
                  value={aboutData.title}
                  onChange={(e) => setAboutData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  邮箱
                </label>
                <input
                  type="email"
                  value={aboutData.email}
                  onChange={(e) => setAboutData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  地址
                </label>
                <input
                  type="text"
                  value={aboutData.location}
                  onChange={(e) => setAboutData(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Introduction */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">个人简介</h3>
            <RichTextEditor
              value={aboutData.introduction}
              onChange={(value) => setAboutData(prev => ({ ...prev, introduction: value }))}
              placeholder="在这里编写您的个人简介..."
            />
          </div>

          {/* Skills */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">技能标签</h3>
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="添加新技能..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                />
                <button
                  onClick={handleAddSkill}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                >
                  添加
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {aboutData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                  >
                    {skill}
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'timeline' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">时间线管理</h3>
            <button
              onClick={() => setShowTimelineModal(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              添加时间线
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm">
            <div className="divide-y divide-gray-200">
              {aboutData.timeline.map((item) => (
                <div key={item.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg font-bold text-blue-600">{item.year}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.type === 'education' ? 'bg-green-100 text-green-800' :
                          item.type === 'work' ? 'bg-blue-100 text-blue-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {item.type === 'education' ? '教育' : 
                           item.type === 'work' ? '工作' : '成就'}
                        </span>
                      </div>
                      <h4 className="text-lg font-medium text-gray-900 mt-2">{item.title}</h4>
                      <p className="text-gray-600 mt-1">{item.description}</p>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteTimeline(item.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">项目管理</h3>
            <button
              onClick={() => setShowProjectModal(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              添加项目
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {aboutData.projects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="text-lg font-medium text-gray-900">{project.title}</h4>
                        {project.featured && (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                            推荐
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mt-2">{project.description}</p>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {project.technologies.map((tech, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex space-x-4 mt-4">
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm"
                          >
                            <ExternalLink className="w-4 h-4 mr-1" />
                            演示
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            className="inline-flex items-center text-gray-600 hover:text-gray-800 text-sm"
                          >
                            <Github className="w-4 h-4 mr-1" />
                            代码
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Timeline Modal */}
      {showTimelineModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">添加时间线项目</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="年份"
                  value={timelineForm.year}
                  onChange={(e) => setTimelineForm(prev => ({ ...prev, year: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  placeholder="标题"
                  value={timelineForm.title}
                  onChange={(e) => setTimelineForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <textarea
                  placeholder="描述"
                  value={timelineForm.description}
                  onChange={(e) => setTimelineForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={3}
                />
                <select
                  value={timelineForm.type}
                  onChange={(e) => setTimelineForm(prev => ({ ...prev, type: e.target.value as any }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="work">工作</option>
                  <option value="education">教育</option>
                  <option value="achievement">成就</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowTimelineModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  取消
                </button>
                <button
                  onClick={handleAddTimeline}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  添加
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Project Modal */}
      {showProjectModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">添加项目</h3>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                <input
                  type="text"
                  placeholder="项目名称"
                  value={projectForm.title}
                  onChange={(e) => setProjectForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <textarea
                  placeholder="项目描述"
                  value={projectForm.description}
                  onChange={(e) => setProjectForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={3}
                />
                <input
                  type="text"
                  placeholder="项目图片URL"
                  value={projectForm.image}
                  onChange={(e) => setProjectForm(prev => ({ ...prev, image: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  placeholder="技术栈（用逗号分隔）"
                  value={projectForm.technologies}
                  onChange={(e) => setProjectForm(prev => ({ ...prev, technologies: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  placeholder="演示链接（可选）"
                  value={projectForm.demoUrl}
                  onChange={(e) => setProjectForm(prev => ({ ...prev, demoUrl: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  placeholder="GitHub链接（可选）"
                  value={projectForm.githubUrl}
                  onChange={(e) => setProjectForm(prev => ({ ...prev, githubUrl: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={projectForm.featured}
                    onChange={(e) => setProjectForm(prev => ({ ...prev, featured: e.target.checked }))}
                    className="mr-2"
                  />
                  推荐项目
                </label>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    项目详细内容
                  </label>
                  <RichTextEditor
                    value={projectForm.content}
                    onChange={(value) => setProjectForm(prev => ({ ...prev, content: value }))}
                    placeholder="项目的详细介绍和技术说明..."
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowProjectModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  取消
                </button>
                <button
                  onClick={handleAddProject}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  添加
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}