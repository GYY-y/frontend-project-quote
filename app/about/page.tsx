'use client';

import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部 */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                关于我们
              </h1>
              <p className="text-gray-600 mt-1">
                了解每日励志金句项目的详细信息
              </p>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                首页
              </Link>
              <Link href="/history" className="text-gray-600 hover:text-blue-600 transition-colors">
                历史
              </Link>
              <Link href="/search" className="text-gray-600 hover:text-blue-600 transition-colors">
                搜索
              </Link>
              <Link href="/about" className="text-blue-600 font-medium">
                关于
              </Link>
            </nav>
          </div>
          
          {/* 移动端导航 */}
          <div className="md:hidden mt-4 flex space-x-6">
            <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
              首页
            </Link>
            <Link href="/history" className="text-gray-600 hover:text-blue-600 transition-colors">
              历史
            </Link>
            <Link href="/search" className="text-gray-600 hover:text-blue-600 transition-colors">
              搜索
            </Link>
            <Link href="/about" className="text-blue-600 font-medium">
              关于
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* 项目介绍 */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">项目介绍</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                <strong>每日励志金句</strong>是一个专注于聚合权威媒体励志内容的网站。
                我们通过自动化爬虫技术，每日从人民网、央视网、人民日报等官方媒体
                抓取最新发布的励志金句和正能量内容，为用户提供每日的精神激励。
              </p>
              <p className="mb-4">
                项目采用现代化的技术架构，前端使用Next.js框架提供优秀的用户体验
                和SEO效果，后端使用Python FastAPI构建高性能的API服务，数据存储在
                SQLite数据库中，确保系统的轻量化和高效率。
              </p>
            </div>
          </div>
        </section>

        {/* 核心特色 */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">核心特色</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">权威内容源</h3>
                <p className="text-sm text-gray-600">
                  专注央视、人民网等官方媒体金句，确保内容的权威性和可靠性
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">每日更新</h3>
                <p className="text-sm text-gray-600">
                  自动化抓取每日最新内容，确保用户每天都能获得新的励志金句
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">SEO优化</h3>
                <p className="text-sm text-gray-600">
                  采用Next.js SSR技术，提升搜索引擎可见性，让更多人发现励志内容
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">轻量化设计</h3>
                <p className="text-sm text-gray-600">
                  无需用户登录注册，即开即用，专注于提供简洁高效的阅读体验
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 技术架构 */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">技术架构</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">前端技术</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Next.js 14 - React框架，支持SSR
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    TypeScript - 类型安全的JavaScript
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Tailwind CSS - 实用优先的CSS框架
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    响应式设计 - 适配各种设备
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">后端技术</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Python FastAPI - 高性能API框架
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    SQLite - 轻量级数据库
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    BeautifulSoup4 - 网页解析库
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    APScheduler - 定时任务调度
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 数据来源 */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">数据来源</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                  <h3 className="font-semibold text-gray-900">人民网</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  重点抓取观点、理论等栏目的励志内容和正能量文章
                </p>
                <a 
                  href="http://people.com.cn" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  访问官网 →
                </a>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                  <h3 className="font-semibold text-gray-900">央视网</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  关注新闻评论、专题报道等栏目的深度励志内容
                </p>
                <a 
                  href="https://cctv.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  访问官网 →
                </a>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                  <h3 className="font-semibold text-gray-900">人民日报</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  聚焦评论版面的权威观点和深度励志分析文章
                </p>
                <a 
                  href="https://people.com.cn" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  访问官网 →
                </a>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>声明：</strong>本站所有金句内容均来自公开媒体，版权归原作者所有。
                我们仅做内容聚合和展示，不拥有内容的版权。如涉及版权问题，请联系我们删除。
              </p>
            </div>
          </div>
        </section>

        {/* 联系我们 */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">联系我们</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">项目信息</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>项目名称：每日励志金句</li>
                  <li>项目类型：开源项目</li>
                  <li>开发时间：2024年</li>
                  <li>技术栈：Next.js + Python FastAPI</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">快速链接</h3>
                <div className="space-y-2">
                  <Link href="/" className="block text-blue-600 hover:text-blue-800">
                    ← 返回首页
                  </Link>
                  <Link href="/history" className="block text-blue-600 hover:text-blue-800">
                    浏览历史金句
                  </Link>
                  <Link href="/search" className="block text-blue-600 hover:text-blue-800">
                    搜索励志内容
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 页脚 */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-gray-600">
            <p>&copy; 2024 每日励志金句. 所有权利保留.</p>
            <p className="mt-1">
              数据每日自动更新 | 
              <Link href="/about" className="text-blue-600 hover:underline ml-1">
                了解更多
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}