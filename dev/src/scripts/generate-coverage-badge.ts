#!/usr/bin/env bun

import { writeFile } from 'fs/promises';
import { join } from 'path';
import { spawn } from 'child_process';

async function runTestsAndParseCoverage(): Promise<{ functions: number; lines: number }> {
  return new Promise((resolve, reject) => {
    const testProcess = spawn('bun', ['test', '--coverage'], {
      stdio: ['inherit', 'pipe', 'pipe'],
      cwd: process.cwd()
    });

    let output = '';
    let errorOutput = '';

    testProcess.stdout?.on('data', (data) => {
      const text = data.toString();
      output += text;
    });

    testProcess.stderr?.on('data', (data) => {
      const text = data.toString();
      errorOutput += text;
      // Coverage table is printed to stderr, so we need to capture it there too
      output += text;
    });

    testProcess.on('close', (code) => {
      if (code !== 0) {
        console.error(`❌ Tests failed with exit code ${code}`);
        console.error('Error output:', errorOutput);
        reject(new Error(`Tests failed with exit code ${code}`));
        return;
      }

      try {
        // Parse test output to extract coverage data
        const lines = output.split('\n');
        
        // Look for "All files" line with coverage data
        const allFilesLine = lines.find(line => 
          line.includes('All files') && 
          line.includes('|')
        );

        if (!allFilesLine) {
          throw new Error('Could not find coverage summary in test output');
        }

        console.log('📊 Found coverage line:', allFilesLine);

        // Parse line format: "All files                              |   98.34 |   99.07 |"
        // Use regex to extract percentages
        const percentageMatches = allFilesLine.match(/All files\s+\|\s*(\d+\.?\d*)\s*\|\s*(\d+\.?\d*)\s*\|/);
        
        if (!percentageMatches || percentageMatches.length < 3) {
          throw new Error(`Could not parse coverage percentages from line: ${allFilesLine}`);
        }

        const functionsPercent = parseFloat(percentageMatches[1]);
        const linesPercent = parseFloat(percentageMatches[2]);

        if (isNaN(functionsPercent) || isNaN(linesPercent)) {
          throw new Error(`Invalid coverage percentages: functions=${functionsPercent}, lines=${linesPercent}`);
        }

        console.log(`✅ Parsed coverage: Functions: ${functionsPercent}%, Lines: ${linesPercent}%`);
        
        resolve({
          functions: functionsPercent,
          lines: linesPercent
        });
      } catch (parseError) {
        console.error('❌ Failed to parse coverage from test output');
        console.error('Parse error:', parseError);
        console.log('🔍 Full test output (last 50 lines):');
        console.log(output.split('\n').slice(-50).join('\n'));
        reject(parseError);
      }
    });

    testProcess.on('error', (error) => {
      console.error('❌ Failed to run tests:', error);
      reject(error);
    });
  });
}

async function generateCoverageBadge(): Promise<void> {
  try {
    console.log('🧪 Running tests with coverage...');
    const coverage = await runTestsAndParseCoverage();
    
    const functionsCoverage = coverage.functions;
    const linesCoverage = coverage.lines;
    
            // Calculate average coverage
    const averageCoverage = Math.round((functionsCoverage + linesCoverage) / 2);
    
            // Determine badge color based on coverage
    let color = 'red';
    if (averageCoverage >= 90) {
      color = 'brightgreen';
    } else if (averageCoverage >= 80) {
      color = 'green';
    } else if (averageCoverage >= 70) {
      color = 'yellowgreen';
    } else if (averageCoverage >= 60) {
      color = 'yellow';
    } else if (averageCoverage >= 50) {
      color = 'orange';
    }
    
            // Create SVG badge
    const badgeSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="20">
  <linearGradient id="b" x2="0" y2="100%">
    <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
    <stop offset="1" stop-opacity=".1"/>
  </linearGradient>
  <mask id="a">
    <rect width="120" height="20" rx="3" fill="#fff"/>
  </mask>
  <g mask="url(#a)">
    <path fill="#555" d="M0 0h67v20H0z"/>
    <path fill="${color}" d="M67 0h53v20H67z"/>
    <path fill="url(#b)" d="M0 0h120v20H0z"/>
  </g>
  <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11">
    <text x="33.5" y="15" fill="#010101" fill-opacity=".3">coverage</text>
    <text x="33.5" y="14">coverage</text>
    <text x="93.5" y="15" fill="#010101" fill-opacity=".3">${averageCoverage}%</text>
    <text x="93.5" y="14">${averageCoverage}%</text>
  </g>
</svg>`;
    
    // Save badge to docs/assets/
    const badgePath = join(process.cwd(), 'docs', 'assets', 'coverage-badge.svg');
    await writeFile(badgePath, badgeSvg, 'utf-8');
    
    console.log(`✅ Coverage badge generated: ${averageCoverage}% (${color})`);
    console.log(`📁 Badge saved to: ${badgePath}`);
    console.log(`📊 Functions: ${functionsCoverage}%, Lines: ${linesCoverage}%`);
    
  } catch (error) {
    console.error('❌ Failed to generate coverage badge:', error);
    process.exit(1);
  }
}

// Run script
generateCoverageBadge();
