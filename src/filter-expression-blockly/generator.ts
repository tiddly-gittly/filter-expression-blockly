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
  const statements = [];
  let current = block.getInputTargetBlock(name);
  while (current !== null) {
    statements.push(filterGenerator.blockToCode(current));
    current = current.getNextBlock();
  }
  return statements;
}

filterGenerator.forBlock.filter_run = function(block, generator) {
  const steps = getAllStatements(block, 'FILTER_STEPS').join('');
  const nextExpression = generator.valueToCode(block, 'NEXT_EXPRESSION', 0);
  return `[${steps}] ${nextExpression}`;
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
