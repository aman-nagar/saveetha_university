<div
  className={`min-h-screen flex flex-col ${theme === "dark" ? "dark" : ""}`}
>
  <div className="flex flex-1 bg-bg text-text">
    {/* Sidebar - hidden on mobile, shown on desktop */}
    <div className="hidden lg:block lg:w-64 xl:w-72 border-r border-border">
      <AdminSidebar theme={theme} toggleTheme={toggleTheme} />
    </div>

    {/* Main area */}
    <div className="flex-1 flex flex-col min-w-0">
      <AdminHeader />

      {/* Main content – centered both ways when short */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-x-hidden">
        <div className="w-full max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  </div>
</div>