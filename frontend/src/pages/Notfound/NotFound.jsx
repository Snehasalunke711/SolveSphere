import { Link } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import "./NotFound.css";

function NotFound() {
  return (
    <main className="not-found-page">
      <Navbar />

      <section className="not-found-content">
        <h1>404</h1>

        <h2>Page Not Found</h2>

        <p>
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        <Link to="/" className="home-button">
          Go Back Home
        </Link>
      </section>
    </main>
  );
}

export default NotFound;