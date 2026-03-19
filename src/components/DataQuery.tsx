import { useState, type FormEvent } from 'react';
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

type DataQueryProps = {
  onBack: () => void;
  users: User[];
};

function DataQuery({ onBack, users }: DataQueryProps) {
  const [queryInput, setQueryInput] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [searchMode, setSearchMode] = useState<'id' | 'name'>('id');
  const [results, setResults] = useState<User[]>([]);
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalized = queryInput.trim();
    if (!normalized) {
      return;
    }

    const isIdQuery = /^[0-9]+[0-9Xx]?$/.test(normalized);
    const nextMode: 'id' | 'name' = isIdQuery ? 'id' : 'name';
    const normalizedQuery = isIdQuery ? normalized.toUpperCase() : normalized;

    const nextResults =
      nextMode === 'id'
        ? users.filter((user) => user.身份证号.toUpperCase() === normalizedQuery)
        : users.filter((user) => user.姓名.includes(normalizedQuery));

    setHasSearched(true);
    setSearchMode(nextMode);
    setResults(nextResults);
    setExpandedIds(nextResults[0] ? [nextResults[0].身份证号] : []);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClear = () => {
    setQueryInput('');
    setHasSearched(false);
    setResults([]);
    setExpandedIds([]);
  };

  const toggleCard = (id: string) => {
    setExpandedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen px-4 py-6 text-[color:var(--bank-text)]">
      <div className="mx-auto max-w-md rounded-[28px] border border-[#d7e1ea] bg-white shadow-[0_14px_40px_rgba(26,54,93,0.08)]">
        <div className="border-b border-[#d7e1ea] bg-[color:var(--bank-navy)] px-5 py-5 text-white">
          <button
            type="button"
            onClick={onBack}
            className="mb-4 inline-flex min-h-12 items-center rounded-lg border border-white/20 px-4 text-sm font-medium text-white transition hover:bg-white/10"
          >
            ← 返回主页
          </button>
          <h1 className="text-[24px] font-semibold">查询数据</h1>
          <p className="mt-2 text-sm leading-6 text-white/80">
            支持按身份证号精确查询，也支持按姓名进行模糊匹配。
          </p>
        </div>

        <div className="px-5 py-6">
          <form onSubmit={handleSearch} className="rounded-2xl border border-[#d7e1ea] bg-[#f8fbff] p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--bank-blue)]">
              Query Module
            </p>
            <p className="mt-3 text-lg font-semibold text-[color:var(--bank-navy)]">
              身份证号精确查询 / 姓名模糊检索
            </p>
            <p className="mt-2 text-sm leading-6 text-[color:var(--bank-muted)]">
              输入身份证号时进行精确匹配，输入姓名时支持包含匹配。
            </p>
            <div className="mt-4 flex gap-2">
              <input
                type="text"
                value={queryInput}
                onChange={(event) => setQueryInput(event.target.value)}
                placeholder="输入身份证号或姓名"
                className="min-h-12 flex-1 rounded-lg border border-[#d7e1ea] bg-white px-4 text-sm text-[color:var(--bank-text)] outline-none transition placeholder:text-slate-400 focus:border-[color:var(--bank-blue)]"
              />
              <button
                type="submit"
                className="min-h-12 rounded-lg bg-[color:var(--bank-navy)] px-4 text-sm font-medium text-white shadow-sm transition hover:bg-[#244a79]"
              >
                查询
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="min-h-12 rounded-lg border border-[#d7e1ea] bg-white px-4 text-sm font-medium text-[color:var(--bank-navy)] shadow-sm transition hover:border-[color:var(--bank-blue)]"
              >
                清除
              </button>
            </div>
          </form>

          {hasSearched ? (
            results.length > 0 ? (
              <div className="mt-5">
                <div className="rounded-2xl border border-[#d7e1ea] bg-white p-4 shadow-sm">
                  <p className="text-sm font-semibold text-[color:var(--bank-navy)]">
                    {searchMode === 'id' ? '身份证号精确匹配结果' : '姓名模糊匹配结果'}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--bank-muted)]">
                    共找到 {results.length} 条匹配记录。
                  </p>
                </div>

                <div className="mt-4 space-y-4">
                  {results.map((user) => (
                    <UserCard
                      key={user.身份证号}
                      user={user}
                      isExpanded={expandedIds.includes(user.身份证号)}
                      onToggle={() => toggleCard(user.身份证号)}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-5 rounded-2xl border border-[#d7e1ea] bg-white p-4 shadow-sm">
                <p className="text-sm font-semibold text-[color:var(--bank-navy)]">未找到匹配的用户</p>
                <p className="mt-2 text-sm leading-6 text-[color:var(--bank-muted)]">
                  请检查输入内容后重新查询，或尝试改用姓名关键字搜索。
                </p>
              </div>
            )
          ) : (
            <div className="mt-5 rounded-2xl border border-[#d7e1ea] bg-white p-4 shadow-sm">
              <p className="text-sm font-semibold text-[color:var(--bank-navy)]">查询说明</p>
              <p className="mt-2 text-sm leading-6 text-[color:var(--bank-muted)]">
                输入身份证号可进行精确匹配；输入中文姓名或姓名关键字时，会返回所有包含该关键字的用户。
              </p>
            </div>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={scrollToTop}
        aria-label="返回顶部"
        className="fixed bottom-6 right-6 z-20 flex h-14 w-14 items-center justify-center rounded-full border border-white/50 bg-[rgba(255,255,255,0.55)] text-[color:var(--bank-blue)] shadow-[0_10px_30px_rgba(43,108,176,0.22)] backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-[rgba(255,255,255,0.7)]"
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

export default DataQuery;
