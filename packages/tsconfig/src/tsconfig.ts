import tsconfig from "./tsconfig.build.json"

export type TsConfig = {
  outDir: string
  include: string[]
}

const generateTsConfig = (config: TsConfig) => {
  const { outDir, include } = config

  const finalTsConfig: any = {
    ...tsconfig,
    compilerOptions: {
      outDir,
    },
    include,
  }

  return finalTsConfig
}

export { generateTsConfig }
