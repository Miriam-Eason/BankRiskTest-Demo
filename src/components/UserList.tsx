import { useEffect, useState } from 'react';
import UserCard from './UserCard';

type User = {
  用户: string;
  身份证号: string;
  性别: string;
  姓名: string;
  出生年份: number;
  学历: string;
  年收入: number;
  工作领域: string;
  工作机构: string;
  账户状态: string;
  账户金额: number;
};

type UserListProps = {
  onBack: () => void;
  totalUsers: number;
  users: User[];
};

const ITEMS_PER_PAGE = 10;

function UserList({ onBack, totalUsers, users }: UserListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = users.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  useEffect(() => {
    setExpandedIds(currentItems[0] ? [currentItems[0].身份证号] : []);
  }, [currentPage]);

  const toggleCard = (id: string) => {
    setExpandedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="bank-page-shell">
      <div className="bank-page-card">
        <div className="border-b border-[#d7e1ea] bg-[color:var(--bank-navy)] px-5 py-5 text-white">
          <button
            type="button"
            onClick={onBack}
            className="mb-4 inline-flex min-h-12 items-center rounded-lg border border-white/20 px-4 text-sm font-medium text-white transition duration-200 hover:bg-white/10"
          >
            ← 返回主页
          </button>
          <h1 className="text-[24px] font-semibold">查看用户</h1>
          <p className="mt-2 text-sm leading-6 text-white/80">
            浏览全部用户信息，支持按页查看完整档案数据。
          </p>
        </div>

        <div className="px-5 py-6">
          <div className="bank-subpanel">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--bank-muted)]">
                  User Records
                </p>
                <p className="mt-3 text-lg font-semibold text-[color:var(--bank-navy)]">
                  共 {totalUsers} 条记录
                </p>
              </div>
              <div className="rounded-full border border-[#d7e1ea] bg-white px-3 py-1 text-sm font-medium text-[color:var(--bank-blue)]">
                第 {currentPage}/{totalPages} 页
              </div>
            </div>
            <p className="mt-3 text-sm leading-6 text-[color:var(--bank-muted)]">
              点击卡片可展开查看完整档案
            </p>
          </div>

          <div className="mt-5 space-y-4">
            {currentItems.map((user) => (
              <UserCard
                key={user.身份证号}
                user={user}
                isExpanded={expandedIds.includes(user.身份证号)}
                onToggle={() => toggleCard(user.身份证号)}
              />
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={currentPage === 1}
              className="bank-secondary-button flex-1 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
            >
              上一页
            </button>
            <div className="min-w-24 text-center text-sm font-medium text-[color:var(--bank-muted)]">
              第 {currentPage}/{totalPages} 页
            </div>
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
              disabled={currentPage === totalPages}
              className="bank-primary-button flex-1 bg-[color:var(--bank-navy)] hover:bg-[#244a79] disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              下一页
            </button>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={scrollToTop}
        aria-label="返回顶部"
        className="bank-top-button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M12 19V5" />
          <path d="m5 12 7-7 7 7" />
        </svg>
      </button>
    </main>
  );
}

export default UserList;
