import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // 관리자 계정 생성
  const adminPassword = await bcrypt.hash("admin1234", 10);
  await prisma.admin.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: adminPassword,
    },
  });
  console.log("✅ Admin account created (username: admin, password: admin1234)");

  // 기본 카테고리 생성
  const mainCategory = await prisma.category.upsert({
    where: { name: "메인 메뉴" },
    update: {},
    create: { name: "메인 메뉴", sortOrder: 1 },
  });

  const sideCategory = await prisma.category.upsert({
    where: { name: "사이드 메뉴" },
    update: {},
    create: { name: "사이드 메뉴", sortOrder: 2 },
  });

  const drinkCategory = await prisma.category.upsert({
    where: { name: "음료" },
    update: {},
    create: { name: "음료", sortOrder: 3 },
  });
  console.log("✅ Default categories created");

  // 샘플 메뉴 아이템 생성
  const menuItems = [
    // 메인 메뉴
    { name: "불고기 버거", price: 8500, description: "한국식 불고기 패티 버거", categoryId: mainCategory.id, sortOrder: 1 },
    { name: "치즈 버거", price: 7500, description: "더블 치즈 버거", categoryId: mainCategory.id, sortOrder: 2 },
    { name: "베이컨 버거", price: 9000, description: "베이컨 듬뿍 버거", categoryId: mainCategory.id, sortOrder: 3 },
    { name: "새우 버거", price: 8000, description: "통새우 패티 버거", categoryId: mainCategory.id, sortOrder: 4 },
    
    // 사이드 메뉴
    { name: "감자튀김", price: 3000, description: "바삭한 감자튀김", categoryId: sideCategory.id, sortOrder: 1 },
    { name: "치즈스틱", price: 4000, description: "모짜렐라 치즈스틱", categoryId: sideCategory.id, sortOrder: 2 },
    { name: "양파링", price: 3500, description: "바삭한 양파링", categoryId: sideCategory.id, sortOrder: 3 },
    { name: "너겟", price: 4500, description: "치킨 너겟 6조각", categoryId: sideCategory.id, sortOrder: 4 },
    
    // 음료
    { name: "콜라", price: 2000, description: "시원한 콜라", categoryId: drinkCategory.id, sortOrder: 1 },
    { name: "사이다", price: 2000, description: "상큼한 사이다", categoryId: drinkCategory.id, sortOrder: 2 },
    { name: "아메리카노", price: 3000, description: "진한 아메리카노", categoryId: drinkCategory.id, sortOrder: 3 },
    { name: "오렌지 주스", price: 3500, description: "생과일 오렌지 주스", categoryId: drinkCategory.id, sortOrder: 4 },
  ];

  for (const item of menuItems) {
    await prisma.menuItem.upsert({
      where: { 
        name_categoryId: { 
          name: item.name, 
          categoryId: item.categoryId 
        } 
      },
      update: {},
      create: item,
    });
  }
  console.log("✅ Sample menu items created");

  // 샘플 테이블 생성 (5개) - 비밀번호 최소 8자 이상
  for (let i = 1; i <= 5; i++) {
    const tablePassword = await bcrypt.hash(`table${i}pw`, 10);
    await prisma.table.upsert({
      where: { tableNumber: i },
      update: {},
      create: {
        tableNumber: i,
        password: tablePassword,
      },
    });
  }
  console.log("✅ Sample tables created (1-5, password: table{number}pw)");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
