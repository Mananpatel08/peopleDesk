"use client";

import React, { useState } from "react";
import { Search, Eye, Trash, FileX } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";

import { Input } from "../ui";
import { useGetForms } from "@/hooks/useForm";
import { formatDate } from "@/helpers/date";
import { Pagination } from "../ui/pagination";
import { FilterDropdown } from "../user-list/filter-dropdown";
import { FormDeleteModal } from "./form-delete-modal";

export default function FormTable() {
  const router = useRouter();

  const [deleteForm, setDeleteForm] = useState<any>();

  const [params, setParams] = useState({
    page: 1,
    search: "",
    pageSize: 10,
    status: [] as string[],
  });

  const [debouncedSearch] = useDebounce(params.search, 300);

  const { data, isLoading } = useGetForms({
    ...params,
    search: debouncedSearch,
  });

  const forms = data?.data || [];

  const currentPage = params.page;
  const pageSize = data?.pagination.page_size || 10;
  const totalItems = data?.pagination.total_items || 0;

  const start = totalItems > 0 ? (currentPage - 1) * pageSize + 1 : 0;

  const end = Math.min(currentPage * pageSize, totalItems);

  const handleChangePage = (direction: "next" | "prev", newPage: number) => {
    setParams((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  const goToPage = (pageNum: number) => {
    setParams((prev) => ({
      ...prev,
      page: pageNum,
    }));
  };

  return (
    <>
      <FormDeleteModal
        data={deleteForm}
        isOpen={!!deleteForm}
        onClose={() => setDeleteForm(undefined)}
      />

      <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-200">
        {/* Search & Filters */}
        <div className="flex items-center justify-between p-5">
          <div className="w-1/4">
            <Input
              name="search"
              type="text"
              placeholder="Search..."
              className="focus:border-gray-300"
              icon={<Search className="h-5 w-5" />}
              value={params.search}
              onChange={(e) =>
                setParams({
                  ...params,
                  search: e.target.value,
                  page: 1,
                })
              }
            />
          </div>

          <FilterDropdown setParams={setParams} params={params} />
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="overflow-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-100 text-gray-600 text-sm">
                <tr>
                  <th className="py-3 px-5 font-normal">FORM ID</th>
                  <th className="py-3 px-5 font-normal">CURRENT STEP</th>
                  <th className="py-3 px-5 font-normal">COMPLETED DATE</th>
                  <th className="py-3 px-5 font-normal">STATUS</th>
                  <th className="py-3 px-5 font-normal">ACTION</th>
                </tr>
              </thead>

              <tbody>
                {Array(10)
                  .fill(0)
                  .map((_, i) => (
                    <tr
                      key={i}
                      className="border-b border-gray-100 animate-pulse"
                    >
                      <td className="py-3 px-5">
                        <div className="h-4 w-40 bg-gray-200 rounded" />
                      </td>

                      <td className="py-3 px-5">
                        <div className="h-4 w-20 bg-gray-200 rounded" />
                      </td>

                      <td className="py-3 px-5">
                        <div className="h-4 w-24 bg-gray-200 rounded" />
                      </td>

                      <td className="py-3 px-5">
                        <div className="h-4 w-24 bg-gray-200 rounded" />
                      </td>

                      <td className="py-3 px-5">
                        <div className="flex gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gray-200" />
                          <div className="w-10 h-10 rounded-lg bg-gray-200" />
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Empty State - Outside Table */}
        {!isLoading && forms.length === 0 && (
          <div className="flex min-h-[300px] flex-col items-center justify-center border-t border-gray-100">
            <FileX className="h-10 w-10 text-gray-400 mb-3" />

            <h3 className="text-sm font-medium text-gray-700">
              No Forms Found
            </h3>

            <p className="mt-1 text-sm text-gray-400">
              {params.search
                ? "Try adjusting your search."
                : "There are no forms available yet."}
            </p>
          </div>
        )}

        {/* Forms Table */}
        {!isLoading && forms.length > 0 && (
          <div className="overflow-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-100 text-gray-600 text-sm">
                <tr>
                  <th className="py-3 px-5 font-normal">FORM ID</th>

                  <th className="py-3 px-5 font-normal">CURRENT STEP</th>

                  <th className="py-3 px-5 font-normal">COMPLETED DATE</th>

                  <th className="py-3 px-5 font-normal">STATUS</th>

                  <th className="py-3 px-5 font-normal">ACTION</th>
                </tr>
              </thead>

              <tbody className="text-sm">
                {forms.map((form) => (
                  <tr
                    key={form.id}
                    onClick={() => router.push(`/forms/${form.id}`)}
                    className="border-b border-gray-100 bg-white hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="py-3 px-5">{form.form_number}</td>

                    <td className="py-3 px-5">{form.current_step}</td>

                    <td className="py-3 px-5">
                      {formatDate(form.completed_at ?? "")}
                    </td>

                    <td className="py-3 px-5">
                      {form.status === "completed" ? (
                        <span className="px-3 py-1 rounded-lg text-sm bg-green-200/50 text-green-800 border border-green-800">
                          Completed
                        </span>
                      ) : form.status === "in_progress" ? (
                        <span className="px-3 py-1 rounded-lg text-sm bg-yellow-100/50 text-yellow-600 border border-yellow-600">
                          In Progress
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-lg text-sm bg-gray-100/50 text-gray-600 border border-gray-600">
                          Not Started
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-5 flex gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();

                          router.push(`/forms/${form.id}`);
                        }}
                        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-200"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteForm(form);
                        }}
                        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-200"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {!isLoading && forms.length > 0 && (
          <div className="flex items-center justify-between p-5 py-3">
            <p className="text-sm text-gray-600">
              {start} – {end} of {totalItems} entries
            </p>

            {(data?.pagination?.total_pages ?? 0) > 1 && (
              <Pagination
                page={currentPage}
                total={data?.pagination?.total_pages || 1}
                onPageChange={goToPage}
                handleChangePage={handleChangePage}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}
