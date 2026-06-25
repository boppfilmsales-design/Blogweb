'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiUsers, FiTrash2, FiRefreshCw, FiMonitor, FiSmartphone, FiTablet, FiGlobe, FiCalendar } from 'react-icons/fi';

interface Visitor {
  id: string;
  ip: string;
  userAgent: string;
  referer: string;
  page: string;
  timestamp: string;
  browser?: string;
  os?: string;
  device?: string;
}

export default function VisitorsPage() {
  const router = useRouter();
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loggedIn = sessionStorage.getItem('admin_logged_in');
    if (loggedIn === 'true') {
      setIsAuthenticated(true);
      loadVisitors();
    } else {
      router.push('/admin/login');
    }
  }, [router]);

  const loadVisitors = async () => {
    try {
      const res = await fetch('/api/visitors');
      const data = await res.json();
      setVisitors(data);
    } catch (error) {
      console.error('Failed to load visitors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = async () => {
    if (!confirm('Are you sure you want to clear all visitor logs?')) return;
    try {
      await fetch('/api/visitors', { method: 'DELETE' });
      setVisitors([]);
    } catch (error) {
      alert('Failed to clear visitor logs');
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getDeviceIcon = (device?: string) => {
    switch (device) {
      case 'Mobile': return <FiSmartphone className="w-4 h-4" />;
      case 'Tablet': return <FiTablet className="w-4 h-4" />;
      default: return <FiMonitor className="w-4 h-4" />;
    }
  };

  if (!isAuthenticated) return null;

  const stats = {
    total: visitors.length,
    today: visitors.filter(v => new Date(v.timestamp).toDateString() === new Date().toDateString()).length,
    mobile: visitors.filter(v => v.device === 'Mobile').length,
    desktop: visitors.filter(v => v.device === 'Desktop').length,
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                <FiUsers className="inline w-6 h-6 mr-2" />
                访问者统计
              </h1>
              <p className="text-gray-600 text-sm">查看谁浏览了你的网站</p>
            </div>
            <div className="flex items-center space-x-4">
              <button type="button" onClick={loadVisitors} className="inline-flex items-center px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg">
                <FiRefreshCw className="w-4 h-4 mr-1" /> 刷新
              </button>
              <button type="button" onClick={handleClear} className="inline-flex items-center px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg">
                <FiTrash2 className="w-4 h-4 mr-1" /> 清空记录
              </button>
              <a href="/admin" className="text-gray-600 hover:text-gray-800 text-sm">← 返回后台</a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-gray-500 text-sm">总访问数</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-2xl font-bold text-green-600">{stats.today}</div>
            <div className="text-gray-500 text-sm">今日访问</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-2xl font-bold text-purple-600">{stats.desktop}</div>
            <div className="text-gray-500 text-sm">桌面端</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-2xl font-bold text-orange-600">{stats.mobile}</div>
            <div className="text-gray-500 text-sm">移动端</div>
          </div>
        </div>

        {/* Visitor List */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">访问记录</h2>
          </div>

          {loading ? (
            <div className="p-8 text-center text-gray-500">加载中...</div>
          ) : visitors.length === 0 ? (
            <div className="p-8 text-center text-gray-500">暂无访问记录</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">时间</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">IP地址</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">设备</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">浏览器</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">操作系统</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">访问页面</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {visitors.slice(0, 100).map((visitor) => (
                    <tr key={visitor.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <FiCalendar className="w-4 h-4 mr-2 text-gray-400" />
                          {formatDate(visitor.timestamp)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <FiGlobe className="w-4 h-4 mr-2 text-gray-400" />
                          {visitor.ip}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          {getDeviceIcon(visitor.device)}
                          <span className="ml-2">{visitor.device || 'Unknown'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {visitor.browser || 'Unknown'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {visitor.os || 'Unknown'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          {visitor.page}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {visitors.length > 100 && (
            <div className="p-4 text-center text-gray-500 text-sm border-t">
              显示最近100条记录，共{visitors.length}条
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
