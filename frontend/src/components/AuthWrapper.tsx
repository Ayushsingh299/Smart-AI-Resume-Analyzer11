"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Only paths allowed without auth
    const publicPaths = ["/login", "/register"];
    
    // Allow login to pass through
    if (publicPaths.includes(pathname)) {
      setIsChecking(false);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setIsChecking(false);
    }
  }, [pathname, router]);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
          <p className="text-slate-500 font-medium">Checking authorization...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
