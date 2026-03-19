import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import FloatingBackButton from './FloatingBackButton';
import ScrollToTopButton from './ScrollToTopButton';
import UserCard from './UserCard';
import useFloatingBackButton from '../hooks/useFloatingBackButton';
import useScrollThreshold from '../hooks/useScrollThreshold';

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

type RiskAssessmentProps = {
  onBack: () => void;
  users: User[];
};

const ITEMS_PER_PAGE = 10;
const CURRENT_YEAR = 2026;

function RiskAssessment({ onBack, users }: RiskAssessmentProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchedQuery, setSearchedQuery] = useState('');
  const [searchMode, setSearchMode] = useState<'id' | 'name'>('id');
  const [searchMessage, setSearchMessage] = useState('');
  const headerRef = useRef<HTMLDivElement | null>(null);
  const showFloatingBackButton = useFloatingBackButton(headerRef);
  const showScrollToTopButton = useScrollThreshold(300);

  const riskUsers = useMemo(
    () =>
      users.filter((user) => {
        const age = CURRENT_YEAR - user.出生年份;
        return (user.性别 === '女' && age > 55) || (user.性别 === '男' && age > 60);
      }),
    [users],
  );

  const totalPages = Math.ceil(riskUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = riskUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  useEffect(() => {
    setExpandedIds(currentItems[0] ? [currentItems[0].身份证号] : []);
  }, [currentPage]);

  const toggleCard = (id: string) => {
    setExpandedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const searchResults = useMemo(() => {
    if (!searchedQuery) {
      return [];
    }

    return searchMode === 'id'
      ? riskUsers.filter((user) => user.身份证号.toUpperCase() === searchedQuery)
      : riskUsers.filter((user) => user.姓名.includes(searchedQuery));
  }, [riskUsers, searchedQuery, searchMode]);

  const hasSearched = searchedQuery !== '';

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalized = searchInput.trim();
    if (!normalized) {
      setSearchMessage('请输入身份证号或姓名后再进行查询。');
      return;
    }

    const isIdQuery = /^[0-9]+[0-9Xx]?$/.test(normalized);
    const nextMode: 'id' | 'name' = isIdQuery ? 'id' : 'name';
    const nextQuery = isIdQuery ? normalized.toUpperCase() : normalized;

    setSearchMessage('');
    setSearchMode(nextMode);
    setSearchedQuery(nextQuery);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setSearchedQuery('');
    setSearchMode('id');
    setSearchMessage('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="bank-page-shell">
      <div className="bank-page-card">
        <div
          ref={headerRef}
          className="border-b border-[#d7e1ea] bg-[color:var(--bank-navy)] px-5 py-5 text-white"
        >
          <button
            type="button"
            onClick={onBack}
            className="mb-4 inline-flex min-h-12 items-center rounded-lg border border-white/20 px-4 text-sm font-medium text-white transition hover:bg-white/10"
          >
            ← 返回主页
          </button>
          <h1 className="text-[24px] font-semibold">风险评估</h1>
          <p className="mt-2 text-sm leading-6 text-white/80">
            基于 2026 年年龄规则筛选风险用户，并按页浏览名单数据。
          </p>
        </div>

        {isLoading ? (
          <div className="flex min-h-[calc(100dvh-145px)] items-center justify-center px-5 py-6 md:min-h-[480px]">
            <div className="w-full rounded-[28px] border border-[#d7e1ea] bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-6 py-10 text-center shadow-[0_14px_40px_rgba(26,54,93,0.08)]">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[rgba(201,168,76,0.12)] shadow-inner">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-[rgba(201,168,76,0.28)] border-t-[#1a365d] border-r-[#c9a84c]" />
              </div>
              <p className="mt-6 text-[11px] uppercase tracking-[0.34em] text-[#c9a84c]">
                Screening
              </p>
              <h2 className="mt-3 text-xl font-semibold text-[color:var(--bank-navy)]">
                正在进行风险数据筛查...
              </h2>
              <p className="mt-3 text-sm leading-6 text-[color:var(--bank-muted)]">
                系统正在根据年龄规则检索高风险用户，并准备展示最新筛查结果。
              </p>
            </div>
          </div>
        ) : (
          <div className="px-5 py-6">
            <div className="rounded-2xl border border-[#fed7d7] bg-[#fff5f5] p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--bank-danger)]">
                    Risk Module
                  </p>
                  <p className="mt-3 text-lg font-semibold text-[color:var(--bank-navy)]">
                    共筛选出 {riskUsers.length} 名风险用户
                  </p>
                </div>
                <div className="rounded-full border border-[#f5b5b5] bg-white px-3 py-1 text-sm font-medium text-[color:var(--bank-danger)]">
                  第 {currentPage}/{totalPages} 页
                </div>
              </div>
              <p className="mt-3 text-sm leading-6 text-[color:var(--bank-muted)]">
                当前规则：女性年龄大于 55 岁，男性年龄大于 60 岁。每页默认仅展开第一张风险卡片。
              </p>
            </div>

            <form onSubmit={handleSearch} className="bank-subpanel mt-5">
              <label
                htmlFor="risk-search"
                className="text-xs uppercase tracking-[0.24em] text-[color:var(--bank-muted)]"
              >
                Risk Search
              </label>
              <div className="mt-3 flex gap-2">
                <input
                  id="risk-search"
                  type="text"
                  value={searchInput}
                  onChange={(event) => {
                    setSearchInput(event.target.value);
                    if (searchMessage) {
                      setSearchMessage('');
                    }
                  }}
                  placeholder="输入身份证号或姓名查询风险名单"
                  className="bank-input"
                />
                <button
                  type="submit"
                  className="bank-primary-button bg-[color:var(--bank-danger)] hover:bg-[#c53030]"
                >
                  搜索
                </button>
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="bank-secondary-button"
                >
                  清除
                </button>
              </div>
              {searchMessage ? (
                <p className="mt-3 text-sm font-medium text-[color:var(--bank-danger)]">{searchMessage}</p>
              ) : (
                <p className="mt-3 text-xs leading-5 text-[color:var(--bank-muted)]">
                  输入数字或尾号 X 将按身份证号精确匹配，其他输入将按姓名关键字检索风险名单。
                </p>
              )}
            </form>

            {hasSearched ? (
              <div className="mt-5">
                {searchResults.length > 0 ? (
                  <div>
                    <div className="rounded-2xl border border-[#feb2b2] bg-[#fff5f5] p-4 shadow-sm">
                      <p className="text-sm font-semibold text-[color:var(--bank-danger)]">
                        {searchMode === 'id' ? '⚠️ 该用户在风险名单中' : '⚠️ 已找到风险名单匹配用户'}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[color:var(--bank-muted)]">
                        {searchMode === 'id'
                          ? '已根据身份证号定位到风险用户，清除搜索后可恢复完整风险列表。'
                          : `已根据姓名关键字找到 ${searchResults.length} 条风险用户记录，清除搜索后可恢复完整风险列表。`}
                      </p>
                    </div>

                    <div className="mt-4 space-y-4">
                      {searchResults.map((user) => (
                        <div
                          key={user.身份证号}
                          className="rounded-xl border-l-4 border-[color:var(--bank-danger)] bg-[#fffaf9] pl-1"
                        >
                          <UserCard
                            user={user}
                            isExpanded
                            onToggle={() => undefined}
                            hideToggle
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="bank-fade-up rounded-2xl border border-[#9ae6b4] bg-[#f0fff4] p-4 shadow-sm">
                    <p className="text-sm font-semibold text-[color:var(--bank-success)]">
                      {searchMode === 'id' ? '✅ 未在风险名单中找到该用户' : '✅ 未找到匹配的风险用户'}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[color:var(--bank-muted)]">
                      {searchMode === 'id'
                        ? '当前输入的身份证号不在风险筛选结果中，可修改后再次搜索。'
                        : '当前输入的姓名关键字未匹配到风险名单中的用户，可修改后再次搜索。'}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-5 space-y-4">
                {currentItems.map((user) => (
                  <div
                    key={user.身份证号}
                    className="rounded-xl border-l-4 border-[color:var(--bank-danger)] bg-[#fffaf9] pl-1"
                  >
                    <UserCard
                      user={user}
                      isExpanded={expandedIds.includes(user.身份证号)}
                      onToggle={() => toggleCard(user.身份证号)}
                    />
                  </div>
                ))}
              </div>
            )}

            {!hasSearched ? (
              <div className="mt-6 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                  disabled={currentPage === 1}
                  className="bank-secondary-button flex-1 border-[#f5b5b5] text-[color:var(--bank-danger)] disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
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
                  className="bank-primary-button flex-1 bg-[color:var(--bank-danger)] hover:bg-[#c53030] disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  下一页
                </button>
              </div>
            ) : null}
          </div>
        )}
      </div>

      <FloatingBackButton isVisible={showFloatingBackButton} onClick={onBack} />
      <ScrollToTopButton isVisible={showScrollToTopButton} onClick={scrollToTop} />
    </main>
  );
}

export default RiskAssessment;
