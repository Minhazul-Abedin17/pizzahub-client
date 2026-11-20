
const Loading = () => {
  return (
    <main className="min-h-screen bg-[#FFF9F0] px-5 py-12 md:px-10">
      <div className="mx-auto grid max-w-6xl animate-pulse overflow-hidden rounded-2xl bg-white md:grid-cols-2">
        <div className="min-h-[300px] bg-orange-100 md:min-h-[500px]" />

        <div className="space-y-5 p-8 md:p-10">
          <div className="h-7 w-24 rounded bg-orange-100" />
          <div className="h-10 w-3/4 rounded bg-gray-100" />
          <div className="h-20 rounded bg-gray-100" />
          <div className="h-8 w-32 rounded bg-orange-100" />
          <div className="h-12 rounded bg-gray-100" />
        </div>
      </div>
    </main>
  );
};

export default Loading;
