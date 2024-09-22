import authRouter from './auth';
import itemRouter from './items';

export default function initializeRoutes() {
  const itemRoute = itemRouter();
  const authRoute = authRouter();
  // Initialize other router here

  const routes = { itemRoute, authRoute };

  return routes;
}
