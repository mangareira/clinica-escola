import { Sidebar } from "@/components/sideBar";
import { headers } from "next/headers";
import { ReactNode } from "react";

export default async function DashLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const headersList = await headers();
  const userRole = headersList.get('x-user-role') || 'user';

  return (
    <>
      <Sidebar role={userRole} />
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* <Header /> */}
        <main className="flex-1 overflow-y-auto bg-muted/30 p-6">{children}</main>
      </div>
    </>
  );
}