type DataQueryProps = {
  onBack: () => void;
};

function DataQuery({ onBack }: DataQueryProps) {
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
            Step 8 将在这里接入身份证号精确查询与姓名模糊检索。
          </p>
        </div>

        <div className="px-5 py-6">
          <div className="rounded-2xl border border-[#d7e1ea] bg-[#f8fbff] p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--bank-blue)]">
              Query Module
            </p>
            <p className="mt-3 text-lg font-semibold text-[color:var(--bank-navy)]">
              全局用户检索功能待接入
            </p>
            <p className="mt-2 text-sm leading-6 text-[color:var(--bank-muted)]">
              后续会根据输入内容自动判断按身份证号精确查询，或按姓名进行模糊匹配。
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default DataQuery;
