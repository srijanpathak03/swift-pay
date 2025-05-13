export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div className="p-6 bg-dark-100 rounded-xl card-shadow">
      <h1 className="text-xl font-semibold border-b border-dark-300 pb-2">{title}</h1>
      <div className="mt-4">{children}</div>
    </div>
  );
}
