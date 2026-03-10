// Quick unauthorized page (add this as src/pages/Unauthorized.jsx)
import { Link } from "react-router-dom";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-danger">Unauthorized Access</h1>
        <p className="text-muted">
          You don't have permission to view this page.
        </p>
        <Link to="/portal" className="text-primary underline">
          Go to Login
        </Link>
      </div>
    </div>
  );
}
