"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Leaf, Search, SquarePen, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ComboBox } from "./ComboBox";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Plants = {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string | null;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};

interface TableInventoryProps {
  plants: Plants[];
  isSuccess?: boolean;
}

export default function TableInventory({ plants }: TableInventoryProps) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const filteredPlants = plants?.filter((plant) => {
    const matchesSearch = plant.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "" || plant.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-4">
      <div className="w-full flex items-center gap-3">
        <div className="flex items-center relative py-4 flex-1">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Plants..."
            className="pl-8"
          />
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 transform text-foreground" />
        </div>
        <ComboBox
          value={selectedCategory}
          onChange={(val) => setSelectedCategory(val)}
        />
      </div>
      {plants.length === 0 ? (
        // Empty State - No plants at all
        <div className="text-center py-16">
          <div className="flex justify-center mb-4">
            <div className="bg-gray-100 rounded-full p-6">
              <Leaf className="h-12 w-12 text-gray-400" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            You Have No Plants
          </h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Start building your plant inventory by adding your first plant.
            Track your plants, manage stock, and grow your collection.
          </p>
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            Add Your First Plant
          </button>
        </div>
      ) : filteredPlants.length === 0 ? (
        // No results from search/filter
        <div className="text-center py-12">
          <Search className="h-8 w-8 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No plants found
          </h3>
          <p className="text-gray-500">
            {searchTerm || selectedCategory
              ? "Try adjusting your search or filter criteria"
              : "No plants match your current search"}
          </p>
          {(searchTerm || selectedCategory) && (
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("");
              }}
              className="mt-3 text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        // Table with data
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plant ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPlants.map((plant, idx) => {
                const slugifiedName = plant.name
                  .toLowerCase()
                  .replace(/\s+/g, "-");
                const slug = `${plant.id}-${slugifiedName}`;
                const plantUrl = `/plants/${slug}`;
                return (
                  <TableRow
                    key={plant.id}
                    onClick={() => router.push(plantUrl)}
                    style={{ cursor: "pointer" }}
                  >
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell className="font-medium">{plant.name}</TableCell>
                    <TableCell>{plant.category}</TableCell>
                    <TableCell>${plant.price}</TableCell>
                    <TableCell className="font-bold">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          plant.stock > 10
                            ? "bg-green-100 text-green-800"
                            : plant.stock > 0
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {plant.stock}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end space-x-3">
                        <SquarePen
                          className="cursor-pointer text-blue-600 hover:text-blue-800 transition-colors"
                          size={16}
                        />
                        <Trash2
                          className="text-red-500 hover:text-red-700 cursor-pointer transition-colors"
                          size={16}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          {/* Results summary */}
          <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing {filteredPlants.length} of {plants.length} plant
              {plants.length !== 1 ? "s" : ""}
              {searchTerm && ` matching "${searchTerm}"`}
              {selectedCategory && ` in "${selectedCategory}" category`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
