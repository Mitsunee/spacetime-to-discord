import fs from "fs/promises";
import * as esbuild from "esbuild";

/**
 * Base config for esbuild
 */
const config = {
  /**
   * Entrypoints for your package.
   * If you are doing multiple exports list all their files here like:
   * `["src/index.ts", "src/foobar.ts"]
   */
  entryPoints: ["src/index.ts", "src/plugin.ts"],
  /**
   * Directory in which your build is created.
   * Should match values in .prettierignore, esbuild.config.js and package.json
   */
  outdir: "dist",
  /**
   * This option will bundle all of your code into a single file
   * (or multiple if you specified more entrypoints).
   * Disable this if you use multiple exports which share utils a lot.
   */
  bundle: false,
  /**
   * Builds modules for use with Node.js
   */
  platform: "node",
  /**
   * This option with the "external" value excludes dependencies
   * from the bundling process.
   */
  packages: "external",
  /**
   * Enable this if you prefer optimizing for package size and don't
   * care about readable code in packages.
   */
  minify: false,
  /**
   * This target should match the one set in ESLint and TypeScript
   */
  target: "es2022"
};

async function build() {
  // Clean dist directory
  console.log("Cleaning");
  await fs.rm(config.outdir, { recursive: true, force: true });

  // Build esm bundles
  console.log("Building esm bundles");
  await esbuild.build({
    ...config,
    format: "esm"
  });

  // Build cjs bundles
  console.log("Building cjs bundles");
  await esbuild.build({
    ...config,
    format: "cjs",
    outExtension: { ".js": ".cjs" },
    bundle: true, // imports are set as external by the plugin below
    plugins: [
      {
        name: "js-to-cjs",
        setup(build) {
          build.onResolve({ filter: /\.js$/ }, args => {
            if (args.importer)
              return {
                path: args.path.replace(/\.js$/, ".cjs"),
                external: true
              };
          });
        }
      }
    ]
  });

  // Copy README file
  console.log("Copying README.md");
  await fs.cp(
    /**
     * You can change this to a different file if you prefer a shortened
     * version of your README in npm packages
     */
    "./README.md",
    "dist/README.md",
    { force: true }
  );

  /**
   * Further Ideas:
   * - If you are not using TypeScript and still want d.ts files to be published
   *   you could use `await fs.readdir(".")` and `Array.prototype.filter` to
   *   find these files and also copy them
   */
}

build().then(() => {
  console.log("Completed build");
});
