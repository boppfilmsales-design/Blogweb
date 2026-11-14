'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiLock, FiLogIn } from 'react-icons/fi';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Already signed in? The session cookie is HttpOnly, so only the server can
  // tell — ask it instead of keeping a copy in sessionStorage.
  useEffect(() => {
    let cancelled = false;
    fetch('/api/admin/auth', { cache: 'no-store' })
      .then(async (res) => {
        const data: any = await res.json().catch(() => ({}));
        if (!cancelled && res.ok && data?.authenticated) router.replace('/admin');
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        // The server set the HttpOnly aec_admin_session cookie; nothing to keep
        // on the client.
        setPassword('');
        router.replace('/admin');
        return;
      }

      if (res.status === 503) {
        setError('后台尚未配置 ADMIN_PASSWORD，暂时无法登录');
      } else {
        setError('密码错误，请重试');
      }
    } catch {
      setError('验证失败，请重试');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiLock className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">后台登录</h1>
            <p className="text-gray-500 text-sm mt-2">请输入管理员密码</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                密码
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="请输入密码"
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <FiLogIn className="w-5 h-5 mr-2" />
                  登录
                </>
              )}
            </button>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 text-center">
              请输入管理员密码登录后台
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
