import { defineStackbitConfig, SiteMapEntry } from "@stackbit/types";
import { GitContentSource } from "@stackbit/cms-git";

export default defineStackbitConfig({
  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ["content"],
      models: [
        {
          name: "HomePage",
          type: "page",
          urlPath: "/",
          filePath: "content/site.json",
          fields: [
            {
              name: "hero",
              type: "object",
              fields: [
                { name: "tagline", type: "string" },
                { name: "headline", type: "string" },
                { name: "copy", type: "string" }
              ]
            },
            {
              name: "ctas",
              type: "object",
              fields: [
                { name: "portfolio_label", type: "string" },
                { name: "portfolio_url", type: "string" },
                { name: "start_label", type: "string" },
                { name: "start_url", type: "string" }
              ]
            },
            {
              name: "links",
              type: "object",
              fields: [
                { name: "behance", type: "string" },
                { name: "instagram", type: "string" },
                { name: "linkedin", type: "string" },
                { name: "email", type: "string" }
              ]
            },
            {
              name: "services",
              type: "list",
              items: {
                type: "object",
                fields: [
                  { name: "title", type: "string" },
                  { name: "desc", type: "string" }
                ]
              }
            },
            {
              name: "studio",
              type: "object",
              fields: [
                { name: "title", type: "string" },
                { name: "blurb", type: "string" },
                { name: "sectors", type: "list", items: { type: "string" } }
              ]
            },
            {
              name: "instagram",
              type: "object",
              fields: [{ name: "label", type: "string" }]
            },
            { name: "sections", type: "list", items: { type: "string" } }
          ]
        },
        {
          name: "Projects",
          type: "data",
          file: "content/projects.json",
          fields: [
            {
              name: "items",
              type: "list",
              items: {
                type: "object",
                fields: [
                  { name: "title", type: "string" },
                  { name: "caption", type: "string", required: false },
                  { name: "href", type: "string", required: false },
                  { name: "image", type: "string", required: false }
                ]
              }
            }
          ]
        }
      ]
    })
  ],
  siteMap: ({ documents }) => {
    const entries = [];
    const home = documents.find((d) => d.modelName === "HomePage" && d.filePath === "content/site.json");
    if (home) {
      entries.push({
        stableId: home.id,
        urlPath: "/",
        document: home,
        isHomePage: true
      });
    }
    return entries;
  }
});
