import * as React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export function Herocart() {
  return (
    <Card className="w-full  bg-white shadow-lg rounded-xl border border-gray-200 hover:shadow-2xl transition-transform hover:scale-105 overflow-hidden">
      {/* Header Section */}

      {/* Image Section */}
      <div className="mt-4 px-2">
        <img
          src="https://images.ctfassets.net/23aumh6u8s0i/6pjUKboBuFLvCKkE3esaFA/5f2101d6d2add5c615db5e98a553fc44/nextjs.jpeg"
          alt="Project Image"
          className="w-full h-33 object-cover rounded-md"
        />
      </div>

      {/* Content Section */}
      <CardContent className="p-4">
        <div className="grid gap-3">
          <div>
            <Label htmlFor="name" className="text-sm font-medium text-gray-600">
              Name
            </Label>
          </div>
          <div className="w-64">
            <p className="truncate text-gray-500 text-sm max-w-full overflow-hidden whitespace-nowrap">
              Framework: wjkdjf jdw iducbwd cwiubwed wiuwdewbi and it contains
              additional content to test truncation behavior.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
