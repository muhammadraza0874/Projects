import React from "react";
import ChatInterface from "@/components/ChatInterface";
import { cn } from "@/lib/utils";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex flex-col">
      {/* Header */}
      <header className="w-full py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold tracking-tight">
              Super<span className="text-primary">Car</span>
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div
          className={cn(
            "h-[calc(100vh-180px)] min-h-[500px]",
            "animate-fade-in"
          )}
        >
          <ChatInterface />
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
        <div className="max-w-7xl mx-auto">
          <p>© {new Date().getFullYear()} SuperCar. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
