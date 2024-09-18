import AdminOrderList from "@/components/Admin/Order/OrderList";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function page() {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    if (session?.user.role === "ADMIN") {
      return (
        <>
          <div className="py-6 bg-blue-500 text-center text-white">
            <span>سفارشات</span>
          </div>
          <div className="min-h-screen p-4 lg:p-8 lg:pt-0 bg-zinc-900">
            <div className="p-4">
              <img
                src="/images/logos/mobit.png"
                alt="logo-mobit"
                className="w-40 mx-auto"
              />
            </div>
            <div className="flex items-center justify-end mb-4">
              <Link
                href={"/dashbord"}
                className="flex items-center gap-x-2 bg-green-500/20 text-green-500 px-6 py-2 rounded-xl hover:ring-4 ring-green-500/50 transition-all"
              >
                <span>بازگشت</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 12H4m0 0l6-6m-6 6l6 6"
                  />
                </svg>
              </Link>
            </div>
            <AdminOrderList />
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="min-h-[900px] flex flex-col gap-y-4 items-center justify-center">
            <span>سفارشات من</span>
            <Link href="/" className="block text-blue-500">
              بازگشت به صفحه اصلی
            </Link>
          </div>
        </>
      );
    }
  } else {
    return (
      <>
        <div className="min-h-screen flex flex-col justify-center items-center gap-y-10 contain fixed inset-0">
          <span className="block text-xl text-center">
            لطفا ابتدا به حساب کاربری خود وارد شوید.
          </span>
          <Link
            href="/sign-in"
            className="bg-blue-500 px-10 py-2 rounded-2xl inline-block text-white"
          >
            ورود
          </Link>
        </div>
      </>
    );
  }
}
