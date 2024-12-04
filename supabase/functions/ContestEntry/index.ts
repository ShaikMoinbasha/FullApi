import { routeMatching } from "../RouteMapping/routeMatching.ts";
import { AllRouters } from "../RouteMapping/routes.ts";

Deno.serve(async (req) => {
  try {
    const method = req.method;
    const url = new URL(req.url);
    const path = url.pathname;

    const matchedRoute = routeMatching(path, AllRouters);

    if (matchedRoute) {
      const { route, params } = matchedRoute;
      const handler = route[method];

      if (handler) {
        // Pass `params` to the handler if necessary
        return await handler(req);
      } else {
        return new Response("Method Not Allowed", {
          status: 405,
          headers: { "Content-Type": "text/plain" }
        });
      }
    }

    // If no route matches, return 404
    return new Response("Not Found", {
      status: 404,
      headers: { "Content-Type": "text/plain" }
    });
  } catch (error) {
    console.error("Error in request handling:", error);

    return new Response("Internal Server Error", {
      status: 500,
      headers: { "Content-Type": "text/plain" }
    });
  }
});
