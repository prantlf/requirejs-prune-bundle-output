const { readdirSync, unlinkSync } = require('fs')
const { join } = require('path')

function pruneBundleOutput (outputDirectory, bundlePath) {
  const bundleParts = bundlePath.split('/')
  const bundleDirectory = bundleParts[bundleParts.length - 2] || '.'
  const bundleFile = bundleParts[bundleParts.length - 1]
  const directory = join(outputDirectory, bundleDirectory)
  console.log('Cleaning', directory)
  const files = readdirSync(directory)
  files.forEach(function (file) {
    const path = join(directory, file)
    if (!file.startsWith(bundleFile)) {
      console.log('  Deleting', path)
      unlinkSync(path)
    } else {
      console.log('  Keeping', path)
    }
  })
}

module.exports = pruneBundleOutput
