import * as Blockly from 'blockly/core';
import type { Block } from 'blockly/core';

export const filterGenerator = new Blockly.Generator('TiddlyWiki Filter');

/**
 * Function to get all connected statements as an array. Blockly don't have a method to get statement input as array.
 * @param block Current block that has a statement input
 * @param name Name of statement input in current block.
 * @returns string of generated statements from statement input
 */
function getAllStatements(block: Block, name: string) {
  const statements: Array<string | [string, number]> = [];
  let current = block.getInputTargetBlock(name);
  while (current !== null) {
    statements.push(filterGenerator.blockToCode(current));
    current = current.getNextBlock();
  }
  return statements;
}

filterGenerator.forBlock.filter_run = function(block, _generator) {
  const prefix = block.getFieldValue('PREFIX') as string;
  const steps = getAllStatements(block, 'FILTER_STEPS').join('');
  return `${prefix}[${steps}]`;
};

filterGenerator.forBlock.filter_step_all = function(block, _generator) {
  const category = block.getFieldValue('CATEGORY') as string;
  return `all[${category}]`;
};

filterGenerator.forBlock.filter_step = function(block, _generator) {
  const operator = block.getFieldValue('OPERATOR') as string;
  const parameter = block.getFieldValue('PARAM') as string;
  return `${operator}[${parameter}]`;
};

/**
 * Serialize all top level filter runs to code.
 * Without this, it will only serialize the first filter run.
 */
const workspaceTopLevelFilterRunsToCode: typeof filterGenerator.workspaceToCode = (workspace) => {
  if (workspace === undefined) {
    return '';
  }
  const firstFilterRun = workspace.getBlocksByType('filter_run')?.[0];
  let currentBlock: Block | null | undefined = firstFilterRun;
  let code = '';
  while (currentBlock !== null && currentBlock !== undefined) {
    const currentCode = filterGenerator.blockToCode(currentBlock);
    if (typeof currentCode === 'string') {
      code += currentCode;
    } else {
      code += currentCode[0];
    }
    // Add space between filter runs to beautify the code
    code += ' ';
    currentBlock = currentBlock.getNextBlock();
  }
  return code;
};
filterGenerator.workspaceToCode = workspaceTopLevelFilterRunsToCode;
