import { prisma } from "@/lib/db";
import type { CreateMenuItemInput, UpdateMenuItemInput } from "@/types";

export async function getCategories() {
  return prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: { menuItems: { orderBy: { sortOrder: "asc" } } },
  });
}

export async function getMenuItems(categoryId?: number) {
  return prisma.menuItem.findMany({
    where: categoryId ? { categoryId } : undefined,
    orderBy: { sortOrder: "asc" },
    include: { category: true },
  });
}

export async function getMenuItem(id: number) {
  return prisma.menuItem.findUnique({
    where: { id },
    include: { category: true },
  });
}

export async function createMenuItem(data: CreateMenuItemInput) {
  return prisma.menuItem.create({
    data: {
      name: data.name,
      price: data.price,
      description: data.description,
      categoryId: data.categoryId,
      sortOrder: data.sortOrder ?? 0,
    },
    include: { category: true },
  });
}

export async function updateMenuItem(id: number, data: UpdateMenuItemInput) {
  return prisma.menuItem.update({
    where: { id },
    data,
    include: { category: true },
  });
}

export async function deleteMenuItem(id: number) {
  return prisma.menuItem.delete({ where: { id } });
}

export async function reorderMenuItems(items: { id: number; sortOrder: number }[]) {
  await prisma.$transaction(
    items.map((item) =>
      prisma.menuItem.update({
        where: { id: item.id },
        data: { sortOrder: item.sortOrder },
      }),
    ),
  );
}
