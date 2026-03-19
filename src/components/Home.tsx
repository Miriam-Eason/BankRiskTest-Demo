import type { ViewType } from '../App';

type HomeProps = {
  totalUsers: number;
  onNavigate: (view: ViewType) => void;
};

const heroImageUrl =
  'https://cdn.pixabay.com/photo/2018/12/28/12/43/china-3899509_1280.jpg';

const featureItems = [
  {
    id: 'userList',
    icon: '📋',
    title: '查看用户',
    description: '分页浏览全部用户信息与账户概况',
  },
  {
    id: 'riskAssessment',
    icon: '🔍',
    title: '开启风险评估',
    description: '按年龄与性别规则筛选风险用户',
  },
  {
    id: 'dataQuery',
    icon: '🔎',
    title: '查询数据',
    description: '通过身份证号或姓名快速检索数据',
  },
] as const satisfies ReadonlyArray<{
  id: ViewType;
  icon: string;
  title: string;
  description: string;
}>;

function Home({ totalUsers, onNavigate }: HomeProps) {
  return (
    <main className="min-h-screen px-4 py-6 text-[color:var(--bank-text)]">
      <div className="mx-auto max-w-md">
        <section className="overflow-hidden rounded-[28px] border border-[#d7e1ea] bg-[color:var(--bank-card)] shadow-[0_14px_40px_rgba(26,54,93,0.08)]">
          <div className="border-b border-[#d7e1ea] bg-[color:var(--bank-navy)] px-5 py-5 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.34em] text-white/70">Risk Control</p>
                <h1 className="mt-2 text-[24px] font-semibold leading-tight">
                  银行证券风险智能评估系统
                </h1>
              </div>
              <div className="rounded-full border border-[color:var(--bank-gold)] px-3 py-1 text-xs font-medium text-[color:var(--bank-gold)]">
                2026
              </div>
            </div>
          </div>

          <div className="px-5 pb-6 pt-5">
            <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-slate-900 shadow-sm">
              <div className="relative h-[248px]">
                <img
                  src={heroImageUrl}
                  alt="银行金融建筑外观"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-[rgba(10,25,47,0.42)]" />

                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <div className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[11px] tracking-[0.2em] text-white/80 backdrop-blur-sm">
                    BANKING RISK INSIGHT
                  </div>
                  <h2 className="mt-3 text-[26px] font-semibold leading-tight">
                    用户风险画像与智能评估入口
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-white/85">
                    聚合用户档案、账户信息与年龄风险规则，为内部演示提供清晰直观的浏览入口。
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-[#d7e1ea] bg-[#f8fbff] px-3 py-3">
                <p className="text-[11px] text-[color:var(--bank-muted)]">数据总量</p>
                <p className="mt-2 text-xl font-semibold text-[color:var(--bank-navy)]">
                  {totalUsers}
                </p>
              </div>
              <div className="rounded-2xl border border-[#d7e1ea] bg-[#fffaf0] px-3 py-3">
                <p className="text-[11px] text-[color:var(--bank-muted)]">核心能力</p>
                <p className="mt-2 text-base font-semibold text-[color:var(--bank-navy)]">智能风控</p>
              </div>
              <div className="rounded-2xl border border-[#d7e1ea] bg-[#f5fbf7] px-3 py-3">
                <p className="text-[11px] text-[color:var(--bank-muted)]">系统架构</p>
                <p className="mt-2 text-base font-semibold text-[color:var(--bank-navy)]">轻量化部署</p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {featureItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  className="group flex min-h-12 w-full items-center justify-between rounded-2xl border border-[#d7e1ea] bg-white px-4 py-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-[color:var(--bank-blue)] hover:shadow-[0_12px_24px_rgba(43,108,176,0.12)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[color:var(--bank-navy)] text-xl text-white shadow-inner">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-base font-semibold text-[color:var(--bank-navy)]">{item.title}</p>
                      <p className="mt-1 text-xs leading-5 text-[color:var(--bank-muted)]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <span className="text-lg text-[color:var(--bank-gold)] transition group-hover:translate-x-0.5">
                    →
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-[#ead9a5] bg-[#fffaf0] px-4 py-3">
              <p className="text-sm font-medium text-[color:var(--bank-navy)]">系统公告</p>
              <p className="mt-1 text-sm leading-6 text-[color:var(--bank-muted)]">
                系统提示：数据已于 2026-03-19 更新，评估规则版本 v2.1
              </p>
            </div>

            <div className="mt-5 rounded-2xl border border-[#d7e1ea] bg-[#f8fbff] px-4 py-3 text-xs leading-5 text-[color:var(--bank-muted)]">
              © 2026 风控演示系统 · 仅供内部评估使用
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Home;
