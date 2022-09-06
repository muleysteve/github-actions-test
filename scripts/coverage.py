#!/usr/bin/python3
"""
Extracts overall coverage data from the Jacoco coverage
report and returns it as in a JSON format.
"""

import json
import xml.etree.ElementTree as ET

def __add_coverage_to_json(output, key, elem):
	covered = int(elem.get('covered'))
	missed = int(elem.get('missed'))
	output[key] = {
		'total': covered + missed,
		'covered': covered,
		'missed': missed,
		'coverage': covered / (covered + missed)
	}


# Create output object
output = {}

# Open the jacoco output
tree = ET.parse('target/site/jacoco/jacoco.xml')
root = tree.getroot()

# Overall instruction coverage
all_inst = root.find("counter[@type='INSTRUCTION']")
__add_coverage_to_json(output, 'instructions', all_inst)

# Overall line coverage
all_line = root.find("counter[@type='LINE']")
__add_coverage_to_json(output, 'lines', all_line)

# Overall branch coverage
all_branch = root.find("counter[@type='COMPLEXITY']")
__add_coverage_to_json(output, 'branches', all_branch)

# Overall method coverage
all_method = root.find("counter[@type='METHOD']")
__add_coverage_to_json(output, 'methods', all_method)

print(json.dumps(output))