module.exports = {
  presets: [
    ["@babel/preset-env", {
      "modules": false
    }]
  ],
  plugins: [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}