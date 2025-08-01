'use client';

import { useState, useRef } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder = '开始写作...' }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const insertImage = () => {
    const url = prompt('请输入图片URL:');
    if (url) {
      execCommand('insertImage', url);
    }
  };

  const insertVideo = () => {
    const url = prompt('请输入视频URL (支持YouTube/Bilibili):');
    if (url) {
      const videoHtml = `<div class="video-container"><iframe src="${url}" frameborder="0" allowfullscreen></iframe></div>`;
      execCommand('insertHTML', videoHtml);
    }
  };

  const insertLink = () => {
    const url = prompt('请输入链接URL:');
    const text = prompt('请输入链接文本:');
    if (url && text) {
      execCommand('createLink', url);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => execCommand('bold')}
          className={`px-3 py-1 rounded text-sm font-medium ${
            isBold ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          粗体
        </button>
        <button
          type="button"
          onClick={() => execCommand('italic')}
          className={`px-3 py-1 rounded text-sm font-medium ${
            isItalic ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          斜体
        </button>
        <button
          type="button"
          onClick={() => execCommand('underline')}
          className={`px-3 py-1 rounded text-sm font-medium ${
            isUnderline ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          下划线
        </button>
        
        <div className="w-px h-6 bg-gray-300 mx-2"></div>
        
        <button
          type="button"
          onClick={() => execCommand('formatBlock', '<h1>')}
          className="px-3 py-1 rounded text-sm font-medium bg-white text-gray-700 hover:bg-gray-100"
        >
          H1
        </button>
        <button
          type="button"
          onClick={() => execCommand('formatBlock', '<h2>')}
          className="px-3 py-1 rounded text-sm font-medium bg-white text-gray-700 hover:bg-gray-100"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => execCommand('formatBlock', '<h3>')}
          className="px-3 py-1 rounded text-sm font-medium bg-white text-gray-700 hover:bg-gray-100"
        >
          H3
        </button>
        
        <div className="w-px h-6 bg-gray-300 mx-2"></div>
        
        <button
          type="button"
          onClick={() => execCommand('insertUnorderedList')}
          className="px-3 py-1 rounded text-sm font-medium bg-white text-gray-700 hover:bg-gray-100"
        >
          无序列表
        </button>
        <button
          type="button"
          onClick={() => execCommand('insertOrderedList')}
          className="px-3 py-1 rounded text-sm font-medium bg-white text-gray-700 hover:bg-gray-100"
        >
          有序列表
        </button>
        
        <div className="w-px h-6 bg-gray-300 mx-2"></div>
        
        <button
          type="button"
          onClick={insertLink}
          className="px-3 py-1 rounded text-sm font-medium bg-white text-gray-700 hover:bg-gray-100"
        >
          插入链接
        </button>
        <button
          type="button"
          onClick={insertImage}
          className="px-3 py-1 rounded text-sm font-medium bg-white text-gray-700 hover:bg-gray-100"
        >
          插入图片
        </button>
        <button
          type="button"
          onClick={insertVideo}
          className="px-3 py-1 rounded text-sm font-medium bg-white text-gray-700 hover:bg-gray-100"
        >
          插入视频
        </button>
        
        <div className="w-px h-6 bg-gray-300 mx-2"></div>
        
        <button
          type="button"
          onClick={() => execCommand('insertHTML', '<blockquote>引用文本</blockquote>')}
          className="px-3 py-1 rounded text-sm font-medium bg-white text-gray-700 hover:bg-gray-100"
        >
          引用
        </button>
        <button
          type="button"
          onClick={() => execCommand('insertHTML', '<pre><code>代码块</code></pre>')}
          className="px-3 py-1 rounded text-sm font-medium bg-white text-gray-700 hover:bg-gray-100"
        >
          代码块
        </button>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onBlur={handleInput}
        dangerouslySetInnerHTML={{ __html: value }}
        className="min-h-[400px] p-4 focus:outline-none prose max-w-none"
        style={{ 
          fontFamily: 'inherit',
          fontSize: 'inherit',
          lineHeight: 'inherit'
        }}
        data-placeholder={placeholder}
      />
    </div>
  );
} 