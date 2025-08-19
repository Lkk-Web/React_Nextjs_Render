"use client";

import Image from "next/image";
import { useMemo, useState, useEffect } from "react";

// 生成大量模拟数据的函数
function generateLargeDataset(size: number) {
  return Array.from({ length: size }, (_, i) => ({
    id: i,
    name: `用户 ${i}`,
    email: `user${i}@example.com`,
    avatar: `/next.svg`,
    score: Math.floor(Math.random() * 1000),
    description:
      `这是用户 ${i} 的详细描述信息，包含了很多文字内容用于测试渲染性能。`.repeat(
        3
      ),
    tags: Array.from({ length: 5 }, (_, j) => `标签${j}`),
    createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
    isActive: Math.random() > 0.5,
    metadata: {
      views: Math.floor(Math.random() * 10000),
      likes: Math.floor(Math.random() * 1000),
      comments: Math.floor(Math.random() * 500),
    },
  }));
}

// 复杂计算函数
function performComplexCalculation(data: any[]) {
  return data.reduce((acc, item, index) => {
    // 模拟复杂的数学运算
    const fibonacci = (n: number): number => {
      if (n <= 1) return n;
      return fibonacci(n - 1) + fibonacci(n - 2);
    };

    const complexValue =
      Math.sin(item.score) * Math.cos(index) +
      fibonacci(Math.min(item.id % 10, 8));
    return acc + complexValue;
  }, 0);
}

// 用户卡片组件
function UserCard({ user, index }: { user: any; index: number }) {
  const animationDelay = `${index * 0.05}s`;

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transform transition-all duration-500 hover:scale-105 hover:shadow-xl"
      style={{ animationDelay }}
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className="relative">
          <Image
            src={user.avatar}
            alt={user.name}
            width={60}
            height={60}
            className="rounded-full border-2 border-blue-500 dark:invert"
          />
          {user.isActive && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {user.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {user.email}
          </p>
          <div className="flex items-center mt-1">
            <span className="text-yellow-500">★</span>
            <span className="text-sm text-gray-700 dark:text-gray-300 ml-1">
              {user.score}
            </span>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
        {user.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {user.tags.map((tag: string, tagIndex: number) => (
          <span
            key={tagIndex}
            className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
        <div className="flex space-x-4">
          <span>👁 {user.metadata.views}</span>
          <span>❤️ {user.metadata.likes}</span>
          <span>💬 {user.metadata.comments}</span>
        </div>
        <span>{new Date(user.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
}

// 统计面板组件
function StatsPanel({
  data,
  calculationResult,
}: {
  data: any[];
  calculationResult: number;
}) {
  const stats = useMemo(() => {
    const totalUsers = data.length;
    const activeUsers = data.filter((u) => u.isActive).length;
    const avgScore = data.reduce((sum, u) => sum + u.score, 0) / totalUsers;
    const totalViews = data.reduce((sum, u) => sum + u.metadata.views, 0);

    return { totalUsers, activeUsers, avgScore, totalViews };
  }, [data]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-2">总用户数</h3>
        <p className="text-3xl font-bold">
          {stats.totalUsers.toLocaleString()}
        </p>
      </div>
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-2">活跃用户</h3>
        <p className="text-3xl font-bold">
          {stats.activeUsers.toLocaleString()}
        </p>
      </div>
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-2">平均评分</h3>
        <p className="text-3xl font-bold">{stats.avgScore.toFixed(1)}</p>
      </div>
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-2">总浏览量</h3>
        <p className="text-3xl font-bold">
          {stats.totalViews.toLocaleString()}
        </p>
      </div>
      <div className="col-span-full bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-2">复杂计算结果</h3>
        <p className="text-2xl font-bold">{calculationResult.toFixed(6)}</p>
        <p className="text-sm opacity-90 mt-1">
          基于斐波那契数列和三角函数的复合运算
        </p>
      </div>
    </div>
  );
}

export default function CSRPage() {
  const [largeDataset, setLargeDataset] = useState<any[]>([]);
  const [calculationResult, setCalculationResult] = useState<number>(0);
  const [chartData, setChartData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [renderTime, setRenderTime] = useState<number>(0);
  const [pageStartTime] = useState(() => performance.now());

  useEffect(() => {
    // 模拟初始加载延迟
    setTimeout(() => {
      // 客户端数据生成和计算
      const dataset = generateLargeDataset(1000);
      const calculation = performComplexCalculation(dataset);
      const chart = Array.from({ length: 50 }, (_, i) => ({
        x: i,
        y: Math.sin(i * 0.1) * 100 + Math.random() * 50,
        z: Math.cos(i * 0.1) * 100 + Math.random() * 50,
      }));
      
      setLargeDataset(dataset);
      setCalculationResult(calculation);
      setChartData(chart);
      setIsLoading(false);
      
      // 测量从页面导航开始到首屏内容完全加载的时间
      requestAnimationFrame(() => {
        const navigationStart = performance.timing?.navigationStart || performance.timeOrigin;
        const currentTime = performance.now() + (performance.timing?.navigationStart || performance.timeOrigin);
        const firstScreenTime = currentTime - navigationStart;
        setRenderTime(firstScreenTime);
      });
    }, 100); // 模拟网络延迟
  }, [pageStartTime]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            CSR 加载中...
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            正在客户端生成数据和执行计算
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 头部区域 */}
      <header className="bg-white dark:bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image
                className="dark:invert"
                src="/next.svg"
                alt="Next.js logo"
                width={120}
                height={25}
                priority
              />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                CSR 性能测试页面
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  客户端渲染
                </span>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                渲染时间: {renderTime.toFixed(2)}ms
              </span>
            </div>
          </div>

          {/* 导航链接 */}
          <div className="mt-4 flex space-x-4">
            <a
              href="/"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              SSR 版本
            </a>
            <a
              href="/csr"
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              CSR 版本 (当前)
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 统计面板 */}
        <StatsPanel data={largeDataset} calculationResult={calculationResult} />

        {/* 图表区域 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            数据可视化
          </h2>
          <div className="h-64 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900 dark:to-red-900 rounded-lg flex items-center justify-center relative overflow-hidden">
            {/* 模拟图表 */}
            <svg width="100%" height="100%" className="absolute inset-0">
              {chartData.map((point, index) => (
                <g key={index}>
                  <circle
                    cx={`${(point.x / 50) * 100}%`}
                    cy={`${50 + point.y / 4}%`}
                    r="3"
                    fill="#F97316"
                    className="animate-pulse"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  />
                  <circle
                    cx={`${(point.x / 50) * 100}%`}
                    cy={`${50 + point.z / 4}%`}
                    r="2"
                    fill="#DC2626"
                    className="animate-bounce"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  />
                </g>
              ))}
            </svg>
            <div className="text-center z-10">
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                实时数据图表 ({chartData.length} 个数据点)
              </p>
            </div>
          </div>
        </div>

        {/* 用户列表 */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            用户列表 ({largeDataset.length.toLocaleString()} 个用户)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {largeDataset.slice(0, 100).map((user, index) => (
              <UserCard key={user.id} user={user} index={index} />
            ))}
          </div>

          {largeDataset.length > 100 && (
            <div className="text-center mt-8">
              <p className="text-gray-600 dark:text-gray-400">
                显示前 100 个用户，共 {largeDataset.length.toLocaleString()}{" "}
                个用户
              </p>
              <div className="mt-4 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-orange-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${(100 / largeDataset.length) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* 性能指标 */}
        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-200 mb-4">
            🔥 CSR 性能测试指标
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <strong className="text-orange-700 dark:text-orange-300">
                渲染模式:
              </strong>
              <p className="text-orange-600 dark:text-orange-400">
                客户端渲染 (CSR)
              </p>
            </div>
            <div>
              <strong className="text-orange-700 dark:text-orange-300">
                数据量:
              </strong>
              <p className="text-orange-600 dark:text-orange-400">
                {largeDataset.length.toLocaleString()} 个用户对象
              </p>
            </div>
            <div>
              <strong className="text-orange-700 dark:text-orange-300">
                DOM 节点:
              </strong>
              <p className="text-orange-600 dark:text-orange-400">
                约 {(largeDataset.slice(0, 100).length * 15).toLocaleString()}{" "}
                个节点
              </p>
            </div>
          </div>

          <div className="mt-4 p-4 bg-orange-100 dark:bg-orange-900/40 rounded-lg">
            <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">
              CSR vs SSR 对比:
            </h4>
            <ul className="text-sm text-orange-700 dark:text-orange-300 space-y-1">
              <li>• CSR: 首屏显示快，但需要等待 JavaScript 加载和执行</li>
              <li>• CSR: 数据在客户端生成，可能有网络延迟</li>
              <li>• CSR: 对 SEO 不友好，搜索引擎难以索引内容</li>
              <li>• CSR: 适合交互性强的应用</li>
            </ul>
          </div>
        </div>
      </main>

      {/* 底部 */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p>
              Next.js CSR 性能测试页面 - 客户端渲染时间: {renderTime.toFixed(2)}
              ms
            </p>
            <p className="mt-2 text-sm">
              此页面使用客户端渲染，所有数据和计算都在浏览器中执行
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
