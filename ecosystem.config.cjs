module.exports = {
  apps: [
    {
      name: 'PdfToPic-Nuxt',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs',
      env: {
        NITRO_PORT: 4040,
        NITRO_HOST: '192.168.68.71'
      }
    }
  ]
}