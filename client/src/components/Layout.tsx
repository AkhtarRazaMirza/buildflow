"use client";

import React, { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { ActivityPanel } from "./ActivityPanel";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col border-l border-gray-200">
        {children}
      </div>

      {/* Activity Panel */}
      <ActivityPanel />
    </div>
  );
}
