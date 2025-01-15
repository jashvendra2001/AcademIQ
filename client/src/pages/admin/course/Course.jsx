import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useGetCreatorCoursesQuery } from "@/features/api/courseApi";
import { useSelector } from "react-redux";
import { BiPencil } from "react-icons/bi";

const Course = () => {
  const [data12, setData] = useState([
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
  ]);
  const navigate = useNavigate();

  const { data, isSuccess, isLoading, isError, error, refetch } =
    useGetCreatorCoursesQuery();

  const invoicesData = useSelector(
    (item) => item?.courses?.courseData?.courses
  );

  console.log(invoicesData);

  useEffect(() => {
    if (invoicesData) {
      setData(invoicesData);
    }
  }, [invoicesData]);

  const handleCreateNewCourse = () => {
    navigate("/Admin/Admin/CreateCourse");
  };

  console.log(data);

  if (isLoading) {
    <p>loading...</p>;
  }

  const handleEdit = (route) => {
    navigate(`/Admin/Admin/course/${route}`);
  };
  return (
    <div className="w-full py-2  h-screen overflow-y-scroll">
      <Button onClick={handleCreateNewCourse}>Create new Courses</Button>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data12?.map((invoice) => (
            <TableRow key={invoice?._id}>
              <TableCell className="font-medium">
                {invoice.invoice || invoice.courseTitle}
              </TableCell>
              <TableCell>
                {invoice.paymentStatus || invoice.coursePrice}
              </TableCell>
              <TableCell>{invoice?.isPublished ? "true" : "false"}</TableCell>
              <TableCell
                className="text-right flex justify-end"
                onClick={() => handleEdit(invoice._id)}
              >
                <BiPencil size={24} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default Course;
