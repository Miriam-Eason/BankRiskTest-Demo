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

type UserCardProps = {
  user: User;
  isExpanded: boolean;
  onToggle: () => void;
  hideToggle?: boolean;
};

const fieldItems: Array<{ key: keyof User; label: string }> = [
  { key: '用户', label: '用户编号' },
  { key: '身份证号', label: '身份证号' },
  { key: '性别', label: '性别' },
  { key: '出生年份', label: '出生年份' },
  { key: '学历', label: '学历' },
  { key: '年收入', label: '年收入（万元）' },
  { key: '工作领域', label: '工作领域' },
  { key: '工作机构', label: '工作机构' },
  { key: '账户状态', label: '账户状态' },
  { key: '账户金额', label: '账户金额（元）' },
];

function formatValue(key: keyof User, value: User[keyof User]) {
  if (key === '账户金额' && typeof value === 'number') {
    return value.toLocaleString('zh-CN');
  }

  if (key === '年收入' && typeof value === 'number') {
    return `${value} 万`;
  }

  return String(value);
}

function UserCard({ user, isExpanded, onToggle, hideToggle = false }: UserCardProps) {
  return (
    <article className="rounded-lg border border-[#d7e1ea] bg-white p-4 shadow-sm transition hover:border-[#bfd0e3]">
      <div className={`flex items-start justify-between gap-3 ${isExpanded ? 'border-b border-slate-100 pb-3' : ''}`}>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--bank-muted)]">用户档案</p>
          <h2 className="mt-2 text-xl font-semibold text-[color:var(--bank-navy)]">{user.姓名}</h2>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[color:var(--bank-muted)]">
            <span>用户编号：{user.用户}</span>
            <span>性别：{user.性别}</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="rounded-full bg-[#fffaf0] px-3 py-1 text-xs font-medium text-[color:var(--bank-gold)]">
            {user.账户状态}
          </div>
          {hideToggle ? null : (
            <button
              type="button"
              onClick={onToggle}
              className="inline-flex min-h-10 items-center rounded-full border border-[#d7e1ea] bg-[#f8fbff] px-3 text-xs font-medium text-[color:var(--bank-blue)] transition hover:border-[color:var(--bank-blue)]"
            >
              {isExpanded ? '收起' : '展开'}
            </button>
          )}
        </div>
      </div>

      {isExpanded ? (
        <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-4">
          {fieldItems.map((item) => (
            <div key={item.key} className={item.key === '身份证号' ? 'col-span-2' : ''}>
              <p className="text-xs text-[color:var(--bank-muted)]">{item.label}</p>
              <p className="mt-1 break-all text-sm font-medium leading-6 text-[color:var(--bank-text)]">
                {formatValue(item.key, user[item.key])}
              </p>
            </div>
          ))}
        </div>
      ) : null}
    </article>
  );
}

export default UserCard;
