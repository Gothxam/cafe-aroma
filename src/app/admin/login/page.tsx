"use client";

import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-sm rounded-xl border bg-card p-6">
        <h1 className="mb-6 text-xl font-semibold text-center">
          Admin Login
        </h1>

        <form className="space-y-4">
          <Input placeholder="Email" type="email" />
          <Input placeholder="Password" type="password" />

          <Button className="w-full">Login</Button>
        </form>
      </div>
    </div>
  );
}
