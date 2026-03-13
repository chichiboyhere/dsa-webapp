import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://dynamicsuccessacademy.com"; // Replace with your actual domain

  // Define your static routes
  const routes = [
    "",
    "/about",
    "/contact",
    "/register/student",
    "/gallery",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  return [...routes];
}
