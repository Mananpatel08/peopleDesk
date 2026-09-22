"use client";

import React, { useState } from "react";
import { Search, UserRoundX, Edit, Trash } from "lucide-react";

import { Input } from "../ui";
import { useGetUser } from "@/hooks/useUser";
import { formatDate } from "@/helpers/date";
import { Avatar } from "../ui/avatar";
import { Pagination } from "../ui/pagination";
import { useDebounce } from "use-debounce";
import { UserDeleteModal } from "./user-delete-modal";
import { User } from "@/types";

export default function UserTable() {
  const [deleteUser, setDeleteUser] = useState<User>();

  const [params, setParams] = useState({
    page: 1,
    search: "",
    role: "",
    sort: "",
    pageSize: 10,
  });

  const [debouncedSearch] = useDebounce(params.search, 300);

  const { data, isLoading } = useGetUser({
    ...params,
    search: debouncedSearch,
  });

  const users = data?.data || [];

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
      <UserDeleteModal
        isOpen={deleteUser !== undefined}
        onClose={() => setDeleteUser(undefined)}
        data={deleteUser}
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
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="overflow-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-100 text-gray-600 text-sm">
                <tr>
                  <th className="py-3 px-5 font-normal">NAME</th>
                  <th className="py-3 px-5 font-normal">EMAIL</th>
                  <th className="py-3 px-5 font-normal">FORM STATUS</th>
                  <th className="py-3 px-5 font-normal">DATE JOINED</th>
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
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gray-200" />
                          <div className="h-4 w-24 rounded bg-gray-200" />
                        </div>
                      </td>

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
        {!isLoading && users.length === 0 && (
          <div className="flex min-h-[300px] flex-col items-center justify-center border-t border-gray-100">
            <UserRoundX className="h-10 w-10 text-gray-400 mb-3" />

            <h3 className="text-sm font-medium text-gray-700">
              No Users Found
            </h3>

            <p className="mt-1 text-sm text-gray-400">
              {params.search
                ? "Try adjusting your search."
                : "There are no users available yet."}
            </p>
          </div>
        )}

        {/* User Table */}
        {!isLoading && users.length > 0 && (
          <div className="overflow-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-100 text-gray-600 text-sm">
                <tr>
                  <th className="py-3 px-5 font-normal">NAME</th>
                  <th className="py-3 px-5 font-normal">EMAIL</th>
                  <th className="py-3 px-5 font-normal">FORM STATUS</th>
                  <th className="py-3 px-5 font-normal">DATE JOINED</th>
                  <th className="py-3 px-5 font-normal">ACTION</th>
                </tr>
              </thead>

              <tbody className="text-sm">
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-100 bg-white hover:bg-gray-50"
                  >
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-2">
                        <Avatar
                          name={user.first_name}
                          size={30}
                          shape="circle"
                        />

                        {user.first_name}
                      </div>
                    </td>

                    <td className="py-3 px-5">{user.email}</td>

                    <td className="py-3 px-5">
                      {user.form_id === "" ? "Not Fill" : "Fill"}
                    </td>

                    <td className="py-3 px-5">
                      {formatDate(user.date_joined)}
                    </td>

                    <td className="py-3 px-5 flex gap-3">
                      <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-200">
                        <Edit className="w-4 h-4" />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteUser(user);
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
        {!isLoading && users.length > 0 && (
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
