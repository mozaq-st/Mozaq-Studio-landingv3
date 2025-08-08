export default {
  contentSources: [
    {
      name: "git",
      type: "git",
      models: [
        {
          name: "site",
          type: "data",
          file: "content/site.json",
          label: "Site Settings",
          fields: [
            { name: "hero", type: "object", fields: [
              { name: "tagline", type: "string" },
              { name: "headline", type: "string" },
              { name: "copy", type: "string" }
            ]},
            { name: "ctas", type: "object", fields: [
              { name: "portfolio_label", type: "string" },
              { name: "portfolio_url", type: "string" },
              { name: "start_label", type: "string" },
              { name: "start_url", type: "string" }
            ]},
            { name: "links", type: "object", fields: [
              { name: "behance", type: "string" },
              { name: "instagram", type: "string" },
              { name: "linkedin", type: "string" },
              { name: "email", type: "string" }
            ]},
            { name: "services", type: "list", items: {
              type: "object", fields: [
                { name: "title", type: "string" },
                { name: "desc", type: "string" }
              ]
            }},
            { name: "studio", type: "object", fields: [
              { name: "title", type: "string" },
              { name: "blurb", type: "string" },
              { name: "sectors", type: "list", items: { type: "string" } }
            ]},
            { name: "instagram", type: "object", fields: [
              { name: "label", type: "string" }
            ]},
            { name: "sections", type: "list", items: { type: "string" } }
          ]
        },
        {
          name: "projects",
          type: "data",
          file: "content/projects.json",
          label: "Projects",
          fields: [
            { name: "items", type: "list", items: {
              type: "object", fields: [
                { name: "title", type: "string" },
                { name: "caption", type: "string" },
                { name: "href", type: "string" },
                { name: "image", type: "string" }
              ]
            }}
          ]
        },
        { name: "home", type: "page", urlPath: "/", label: "Home" }
      ],
      siteMap: () => [{ model: "home", urlPath: "/" }]
    }
  ]
};
