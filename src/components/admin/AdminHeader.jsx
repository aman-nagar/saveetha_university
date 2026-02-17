import logo2 from "../../assets/images/logo2.png";

export default function AdminHeader() {
  return (
    <header className="bg-surface border-b border-border px-6 py-2 flex items-center justify-between">
      <h1 className="text-xl font-heading font-semibold text-primary">
        Admin Panel
      </h1>
      {/* <img src={logo2} className="h-15" /> */}

      <div className="text-muted text-sm">Logged in as Admin</div>
    </header>
  );
}
