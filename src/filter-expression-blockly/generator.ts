import * as Blockly from 'blockly/core';

export const filterGenerator = new Blockly.Generator('TiddlyWiki Filter');

filterGenerator.forBlock.filter_expression = function(block, generator) {
  const steps = generator.valueToCode(block, 'FILTER_STEPS', 0);
  const nextExpression = generator.valueToCode(block, 'NEXT_EXPRESSION', 0);
  return `[${steps}] ${nextExpression}`;
};

filterGenerator.forBlock.filter_step_all = function(block, generator) {
  const category = block.getFieldValue('CATEGORY') as string;
  const nextStep = generator.valueToCode(block, 'FILTER_STEPS', 0);
  return [`all[${category}]${nextStep}`, 0];
};

filterGenerator.forBlock.filter_step = function(block, generator) {
  const operator = block.getFieldValue('OPERATOR') as string;
  const parameter = block.getFieldValue('PARAM') as string;
  const nextStep = generator.valueToCode(block, 'FILTER_STEPS', 0);
  return [`${operator}[${parameter}]${nextStep}`, 0];
};
