import useSWR from "swr";
import Cookies from "js-cookie";
import axios from "axios";

const ssrurl = "http://localhost:4000";

// Fetcher function with potential token refresh handling
const fetcher = async (url, accessToken) => {
  let res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
    credentials: "include", // Include cookies in the request
  });

  if (res.status === 401) {
    // Token expired, refresh the token
    try {
      const refreshResponse = await axios.get(`${ssrurl}/api/auth/refresh-token`, { 
        withCredentials: true // Send cookies with the request
      });

      // Check if we got a new access token
      const newAccessToken = refreshResponse.data.accessToken;
      if (newAccessToken) {
        // Update the access token in cookies
        Cookies.set("access_token", newAccessToken);

        // Retry the original request with the new token
        res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${newAccessToken}`,
          },
          credentials: "include",
        });
      }
    } catch (refreshError) {
      throw new Error("Token refresh failed. Please log in again.");
    }
  }

  if (!res.ok) {
    const errorDetails = await res.json();
    throw new Error(errorDetails.message || "Something went wrong");
  }

  return res.json();
};

// useFetch hook for making authenticated requests
const useFetch = (endPoint) => {
  const accessToken = Cookies.get("access_token");

  const { data, error } = useSWR(
    `${ssrurl}${endPoint}`,
    (url) => fetcher(url, accessToken) // Pass the token to the fetcher
  );

  const isLoading = !data && !error;
  return { data, isLoading, error };
};

export default useFetch;
