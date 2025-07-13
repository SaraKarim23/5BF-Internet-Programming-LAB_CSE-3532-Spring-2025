import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetCreatorCourseQuery } from "@/features/api/courseApi";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Edit } from "lucide-react";



const CourseTable = () => {
  const { data, isLoading } = useGetCreatorCourseQuery();
  const navigate = useNavigate();

  const courseList = Array.isArray(data)
    ? data
    : data?.courses || [];

  const rows = courseList.map((course) => ({
    id: course._id,
    title: course.courseTitle,
    price: course.coursePrice || 0,
    status: course.isPublished ? "Published" : "Draft",
  }));

  // ✅ Define columns *inside* the component so you can use `navigate`
  const columns = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: (info) => `$${info.getValue() ?? 0}`,
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      header: "Action",
      id: "action",
      cell: ({ row }) => (
        <Button
          variant="outline"
          size="sm"
          className="text-white hover:text-white"
          onClick={() => navigate(`course._${row.original.id}`)}
        >
          Edit
        </Button>
      ),
    },
  ];

  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return (
      <div className="p-4">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Button className="mb-4" onClick={() => navigate("create")}>
        Create a new course
      </Button>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center"
              >
                No courses found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CourseTable;
