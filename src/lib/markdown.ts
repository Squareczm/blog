// 简单的Markdown到HTML转换器（基础版）
export function markdownToHtml(markdown: string): string {
  let html = markdown;

  // 代码块
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
    const escapedCode = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return `<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto"><code class="language-${lang || 'text'}">${escapedCode}</code></pre>`;
  });

  // 行内代码
  html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm">$1</code>');

  // 链接
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:underline">$1</a>');

  // 图片
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="rounded-lg my-4" />');

  // 引用
  html = html.replace(/^>\s+(.+)$/gm, '<blockquote class="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4">$1</blockquote>');

  // 粗体
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');

  // 斜体
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(/_(.+?)_/g, '<em>$1</em>');

  // 标题
  html = html.replace(/^### (.+)$/gm, '<h3 class="text-2xl font-serif font-bold mt-8 mb-4">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="text-3xl font-serif font-bold mt-10 mb-6">$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1 class="text-4xl font-serif font-bold mt-12 mb-8">$1</h1>');

  // 无序列表
  html = html.replace(/^- (.+)$/gm, '<li class="ml-6 list-disc">$1</li>');
  html = html.replace(/(<li class="ml-6 list-disc">.*<\/li>\n)+/g, (match) => {
    return `<ul class="my-4">${match}</ul>`;
  });

  // 有序列表
  html = html.replace(/^\d+\. (.+)$/gm, '<li class="ml-6 list-decimal">$1</li>');
  html = html.replace(/(<li class="ml-6 list-decimal">.*<\/li>\n)+/g, (match) => {
    return `<ol class="my-4">${match}</ol>`;
  });

  // 段落
  html = html.split('\n\n').map(paragraph => {
    paragraph = paragraph.trim();
    if (!paragraph) return '';
    if (paragraph.startsWith('<')) return paragraph;
    return `<p class="mb-6 text-gray-700 leading-relaxed">${paragraph}</p>`;
  }).join('\n');

  return html;
}