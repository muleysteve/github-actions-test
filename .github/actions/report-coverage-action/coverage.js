const core = require("@actions/core")
const github = require("@actions/github")

const fs = require('fs')
const xpath = require("xpath")
const dom = require("xmldom").DOMParser

function parseCoverage(doc, key) {
  const covered = parseInt(xpath.select1("report/counter[@type='" + key + "']/@covered", doc).value)
  const missed = parseInt(xpath.select1("report/counter[@type='" + key + "']/@missed", doc).value)
  return {
    'total': (covered + missed),
    'covered': covered,
    'missed': missed,
    'coverage': (covered / (covered + missed)) * 100.0
  }
}

try {

  const output = {}

  const jacocoOutput = core.getInput("output-file")
  console.log("Reading coverage from " + jacocoOutput)

  const elements = core.getInput("elements").split(",")
  
  const xml = fs.readFileSync(jacocoOutput, "utf8").toString()
  console.debug(xml)
  const doc = new dom().parseFromString(xml)

  if (elements.includes("all") || elements.includes("instruction"))
    output.instructions = parseCoverage(doc, "INSTRUCTION")
  
  if (elements.includes("all") || elements.includes("line"))
    output.lines = parseCoverage(doc, "LINE")
  
  if (elements.includes("all") || elements.includes("branch"))
    output.branches = parseCoverage(doc, "COMPLEXITY")
  
  if (elements.includes("all") || elements.includes("method"))
    output.methods = parseCoverage(doc, "METHOD")

  console.log(output)
  core.setOutput("branchCoverage", output.branches.coverage.toFixed(3))

} catch (error) {
  core.setFailed(error.message)
}