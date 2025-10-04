import { ArrowLeft, Bell, Settings, User } from "lucide-react";

export default async function DashboardOrgLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgName = "Organization 1";
  const organization = {
    role: "Admin",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-full mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Back & Org Info */}
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-600 hover:bg-gray-100 transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div className="h-px w-6 bg-gray-300"></div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-green-50 flex items-center justify-center text-2xl">
                  {/* {organization.logo} */}
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">
                    {/* {organization.name} */}
                  </h1>
                  <span
                    className={`inline-block px-2 py-0.5 text-xs font-medium ${
                      organization.role === "Admin"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {organization.role}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>

              {organization.role === "Admin" ? (
                <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-medium hover:bg-green-700 transition-colors">
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">Settings</span>
                </button>
              ) : (
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Profile</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      {children}
    </div>
  );
}
