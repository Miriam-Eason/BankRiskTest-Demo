import userData from './data/data.json';

console.log('Excel JSON data:', userData);

function App() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto flex min-h-[60vh] max-w-md items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-blue-800">
            Bank Risk Assessment
          </p>
          <h1 className="mt-4 text-4xl font-bold text-slate-900">Hello World</h1>
          <p className="mt-3 text-sm text-slate-600">
            已静态导入 {userData.length} 条用户数据，请打开控制台查看 JSON。
          </p>
        </div>
      </div>
    </main>
  );
}

export default App;
