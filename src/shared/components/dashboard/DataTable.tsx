import { ReactNode } from "react";

type Column = {
  label: string;
  className?: string;
};

interface DataTableProps {
  columns: Column[];
  children: ReactNode;
  emptyMessage?: string;
}

export default function DataTable({
  columns,
  children,
  emptyMessage = "No data found.",
}: DataTableProps) {
  const hasData = Array.isArray(children) ? children.length > 0 : !!children;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500 border-b border-gray-200">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  className={`px-6 py-4 font-medium ${col.className || ""}`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {hasData ? (
              children
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-8 text-center text-gray-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
