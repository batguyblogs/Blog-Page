import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Batguy's Blog",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "batguyblogs.github.io/Blog-Page",
    ignorePatterns: ["private", "Templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Bitcount Prop Double",
        body: "Montserrat",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#f8fbdc",
          lightgray: "#c4cd49",
          gray: "#b5b79a",
          darkgray: "#8c8c8c",
          dark: "#4a4a4a",
          secondary: "#d97366",
          tertiary: "#a6517d",
          highlight: "rgba(114, 173, 159, 0.2)",
          textHighlight: "rgba(217, 115, 102, 0.25)",
        },
        darkMode: {
          light: "#40406f",
          lightgray: "#999b1b",
          gray: "#b7f4f5",
          darkgray: "#fFEBBc",
          dark: "#f9e8bc",
          secondary: "#ffbdae",
          tertiary: "#cd6ea1",
          highlight: "rgba(114, 173, 159, 0.2)",
          textHighlight: "rgba(114, 173, 159, 0.2)",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
      Plugin.HardLineBreaks()
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
