import minimist from "minimist"
import chalk from "chalk"
import { build as _build } from "esbuild"
import { rm } from "node:fs/promises"
import { execa } from "execa"
import { Extractor, ExtractorConfig } from "@microsoft/api-extractor"
import { print, success, resolve } from "./helper.js"
import { minify } from "terser"
import { readFileSync, writeFileSync } from "node:fs"

const { mod = "prod" } = minimist(process.argv.slice(2))
const PROD = mod === "prod"

async function build() {
  print("pre build...")
  await rm(resolve("./dist"), {
    recursive: true,
    force: true
  })
  success("pre build success")

  print("start code build...")
  const formats = ["esm", "cjs"]
  await Promise.all(
    formats.map(format => _build(createConfig({ format, prod: false })))
  )
  if (PROD) {
    await Promise.all(formats.map(format => {
      if (format === "esm") return Promise.resolve()
      return _build(createConfig({ format, prod: true })).then(async () => {
        const filePath = resolve(`./dist/shared${resolveFormatExt({ format, prod: true })}`)
        const code = await minify(readFileSync(filePath, "utf-8"), {
          ecma: "es2018",
          module: true,
          toplevel: false,
        })
        writeFileSync(filePath, code.code, "utf-8")
      })
    }))
  }
  success("code build success")

  print("start type build...")
  await buildType()
  success("type build success")
}

function createConfig({ format, prod }) {
  return {
    outfile: `./dist/shared${resolveFormatExt({ format, prod })}`,
    entryPoints: [resolve("./src/main.ts")],
    bundle: true,
    platform: "browser",
    allowOverwrite: true,
    charset: "utf8",
    incremental: false,
    format,
    minify: false,
    target: "es2018",
    treeShaking: true
  }
}

function resolveFormatExt({ format, prod }) {
  let ext = "_.js"

  if (format === "cjs") {
    ext = "_.cjs"
  }

  return ext.replace("_", prod ? ".prod" : "")
}

async function buildType() {
  const temp = resolve("./dist/temp")
  await execa("tsc", ["-p", "./tsconfig.prod.json"], {
    stdio: "inherit"
  })

  const extractorConfig = ExtractorConfig.loadFileAndPrepare(
    resolve("./api-extractor.json")
  )
  const extractorResult = Extractor.invoke(extractorConfig, {
    localBuild: true,
    showVerboseMessages: true
  })
  if (!extractorResult.succeeded) {
    throw "merge .d.ts failed"
  }

  await rm(temp, { force: true, recursive: true })
}

build()
  .catch(err => {
    console.log()
    console.log()
    console.clear()
    console.log(chalk.red(`build failed: \n\n`), err)
    console.log()
  })
  .finally(() => process.exit(0))
