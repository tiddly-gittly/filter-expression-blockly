import * as Blockly from 'blockly/core';

export function getBlocks() {
  Blockly.defineBlocksWithJsonArray([
    {
      type: 'filter',
      message0: 'Filter %1',
      args0: [
        {
          type: 'input_statement',
          name: 'FILTER_EXPRESSIONS', // Can only hold filter_expression blocks
          check: 'filter_expression',
        },
      ],
      colour: 290,
      tooltip: 'Top level filter',
      helpUrl: '',
    },
    {
      type: 'filter_expression',
      message0: 'Expression [%1]',
      args0: [
        {
          type: 'input_statement',
          name: 'FILTER_RUNS',
          check: 'filter_run',
        },
      ],
      previousStatement: 'filter_expression',
      nextStatement: 'filter_expression',
      colour: 230,
      tooltip: 'A filter expression containing runs',
      helpUrl: '',
    },
    {
      type: 'filter_run',
      message0: 'Run [%1]',
      args0: [
        {
          type: 'input_statement',
          name: 'FILTER_STEPS',
          check: ['filter_step', 'filter_step_all'],
        },
      ],
      previousStatement: 'filter_run',
      nextStatement: 'filter_run',
      colour: 120,
      tooltip: 'A filter run containing steps',
      helpUrl: '',
    },
    {
      type: 'filter_step_all',
      message0: 'All [%1]',
      args0: [
        {
          type: 'field_dropdown',
          name: 'CATEGORY',
          options: [
            ['current', 'CURRENT'],
            ['missing', 'MISSING'],
            ['orphans', 'ORPHANS'],
            ['shadows', 'SHADOWS'],
            ['tags', 'TAGS'],
            ['tiddlers', 'TIDDLERS'],
          ],
        },
      ],
      previousStatement: 'filter_step',
      nextStatement: 'filter_step',
      colour: 160,
      tooltip: 'A step that retrieves all items in a category',
      helpUrl: '',
    },
  ]);

  const toolbox = {
    kind: 'flyoutToolbox',
    contents: [
      { kind: 'block', type: 'filter' },
      { kind: 'block', type: 'filter_expression' },
      { kind: 'block', type: 'filter_run' },
      { kind: 'block', type: 'filter_step_all' },
    ],
  };

  return toolbox;
}
