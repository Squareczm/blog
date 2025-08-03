import Image from 'next/image';

export default function TestImagesPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">图片显示测试</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 直接使用 img 标签 */}
        <div className="border p-4">
          <h2 className="text-xl font-semibold mb-4">使用 img 标签</h2>
          <img 
            src="/uploads/demo-background.png" 
            alt="Demo background with img tag"
            className="w-full h-48 object-cover"
          />
          <p className="mt-2 text-sm text-gray-600">路径: /uploads/demo-background.png</p>
        </div>

        {/* 使用 Next.js Image 组件 */}
        <div className="border p-4">
          <h2 className="text-xl font-semibold mb-4">使用 Next.js Image 组件</h2>
          <Image 
            src="/uploads/demo-background.png" 
            alt="Demo background with Next Image"
            width={400}
            height={192}
            className="w-full h-48 object-cover"
          />
          <p className="mt-2 text-sm text-gray-600">路径: /uploads/demo-background.png</p>
        </div>

        {/* 测试头像图片 */}
        <div className="border p-4">
          <h2 className="text-xl font-semibold mb-4">头像图片 (img)</h2>
          <img 
            src="/uploads/1754216357470-zzvuxm1pf.png" 
            alt="Avatar with img tag"
            className="w-32 h-32 object-cover rounded-full"
          />
          <p className="mt-2 text-sm text-gray-600">路径: /uploads/1754216357470-zzvuxm1pf.png</p>
        </div>

        {/* 测试头像图片 Next.js */}
        <div className="border p-4">
          <h2 className="text-xl font-semibold mb-4">头像图片 (Next.js Image)</h2>
          <Image 
            src="/uploads/1754216357470-zzvuxm1pf.png" 
            alt="Avatar with Next Image"
            width={128}
            height={128}
            className="w-32 h-32 object-cover rounded-full"
          />
          <p className="mt-2 text-sm text-gray-600">路径: /uploads/1754216357470-zzvuxm1pf.png</p>
        </div>

        {/* 测试文章图片 */}
        <div className="border p-4">
          <h2 className="text-xl font-semibold mb-4">文章图片 (img)</h2>
          <img 
            src="/uploads/1754210696380-b1zx6w5wo.jpg" 
            alt="Article image with img tag"
            className="w-full h-48 object-cover"
          />
          <p className="mt-2 text-sm text-gray-600">路径: /uploads/1754210696380-b1zx6w5wo.jpg</p>
        </div>

        {/* 测试文章图片 Next.js */}
        <div className="border p-4">
          <h2 className="text-xl font-semibold mb-4">文章图片 (Next.js Image)</h2>
          <Image 
            src="/uploads/1754210696380-b1zx6w5wo.jpg" 
            alt="Article image with Next Image"
            width={400}
            height={192}
            className="w-full h-48 object-cover"
          />
          <p className="mt-2 text-sm text-gray-600">路径: /uploads/1754210696380-b1zx6w5wo.jpg</p>
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h3 className="text-lg font-semibold mb-2">测试说明</h3>
        <ul className="list-disc list-inside text-sm text-gray-700">
          <li>如果 img 标签可以显示但 Next.js Image 不能，说明是 Next.js 图片优化问题</li>
          <li>如果都不能显示，说明是图片路径或服务问题</li>
          <li>如果某些图片可以显示某些不能，说明是特定文件的问题</li>
        </ul>
      </div>
    </div>
  );
}