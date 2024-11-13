import { Link } from 'react-router-dom';
import './NotFoundPage.scss'; 

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you're looking for does not exist.</p>
      <Link to="/">Go back to Home</Link>
    </div>
  );
};

export default NotFoundPage;
