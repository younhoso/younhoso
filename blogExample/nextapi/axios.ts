import axios from "axios";

const instance = axios.create();

instance.interceptors.request.use(async (request) => {
  console.log(request)
  if (typeof window === "undefined") {
    if (request.url && request.url.startsWith("/api/")) {
      request.baseURL = (window as any).location.origin;
    }
  }

  return request;
});

export default instance;
