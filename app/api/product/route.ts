import { NextResponse } from "next/server";
import Prisma from "@/lib/prisma";

export async function GET() {
  try {
    const products = await Prisma.product.findMany();
    return NextResponse.json({
      products: JSON.stringify(products),
      msg: "Product Api GET",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      msg: "Error fetching products",
      status: 500,
    });
  }
}

export async function POST(request: Request) {
  try {
    const {
      title,
      slug,
      price,
      count,
      description,
      cat,
      image,
      createdBy,
      titleEng,
    } = await request.json();

    const newProduct = await Prisma.product.create({
      data: {
        title,
        slug,
        price,
        count,
        description,
        cat,
        image,
        createdBy,
        titleEng,
      },
    });

    return NextResponse.json({
      message: `Product ${newProduct.title} with price ${newProduct.price} created successfully!`,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await Prisma.$disconnect();
  }
}

export async function PUT(request: Request) {
  try {
    const { id, title, titleEng, slug, count, price, cat, description, image } =
      await request.json();

    if (!id) {
      return NextResponse.json({
        message: "آیدی الزامی است",
        messageEng: "ID is required",
        status: 400,
      });
    }

    if (
      !title ||
      !titleEng ||
      !slug ||
      !price ||
      !cat ||
      !description ||
      !image
    ) {
      return NextResponse.json({
        message: "لطفا تمام فیلد ها را پر کنید",
        messageEng: "Please fill in all fields",
        status: 400,
      });
    }

    const updatedProduct = await Prisma.product.update({
      where: {
        id,
      },
      data: {
        title,
        titleEng,
        slug,
        price,
        count,
        description,
        cat,
        image,
      },
    });

    if (updatedProduct) {
      return NextResponse.json({
        message: "با موفقیت ویرایش شد",
        messageEng: "updatedProduct sucsses",
        status: 200,
      });
    } else {
      return NextResponse.json({
        message: "این محصول یافت نشد",
        messageEng: "Product not found",
        status: 404,
      });
    }
  } catch (error) {
    console.error("Error updating product:", error);

    return NextResponse.json({
      message: "خطای سرور",
      messageEng: "Internal Server Error",
      status: 500,
    });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({
        message: "آیدی الزامی است",
        messageEng: "ID is required",
        status: 400,
      });
    }

    const result = await Prisma.product.delete({
      where: {
        id,
      },
    });

    if (result) {
      return NextResponse.json({
        message: "کالا با موفقیت حذف شد",
        messageEng: "Product deleted successfully",
        status: 200,
      });
    } else {
      return NextResponse.json({
        message: "کالا یافت نشد",
        messageEng: "Product not found",
        status: 404,
      });
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({
      message: "خطای سرور",
      messageEng: "Internal Server Error",
      status: 500,
    });
  }
}
