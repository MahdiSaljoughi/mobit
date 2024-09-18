import MainFooter from "@/components/Footer/MainFooter";
import Product from "@/components/Product/Product";
import Prisma from "@/lib/prisma";

export default async function ProducstPage() {
  const products = await Prisma.product.findMany();

  return (
    <>
      <div className="min-h-screen contain">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-6">
          {products.map((product, index) => (
            <div key={index} className="border-b lg:border-none">
              <Product item={product} />
            </div>
          ))}
        </div>
      </div>
      <MainFooter />
    </>
  );
}
