import * as Blockly from 'blockly/core';

export function getBlocks() {
  Blockly.defineBlocksWithJsonArray([
    {
      type: 'filter_run',
      message0: '%1[%2]',
      args0: [
        {
          type: 'field_dropdown',
          name: 'PREFIX',
          options: [
            ['', ''],
            ['ALL', ':all'],
            ['CASCADE', ':cascade'],
            ['ELSE', ':else'],
            ['FILTER', ':filter'],
            ['INTERSECTION', ':intersection'],
            ['MAP', ':map'],
            ['REDUCE', ':reduce'],
            ['SORT', ':sort'],
            ['THEN', ':then'],
          ],
        },
        {
          type: 'input_statement',
          name: 'FILTER_STEPS',
          check: ['filter_step', 'filter_step_all'],
        },
      ],
      previousStatement: 'filter_run',
      nextStatement: 'filter_run',
      // output: 'filter_run',
      colour: 230,
      tooltip: 'A filter run that is part of an expression',
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
            ['CURRENT', 'current'],
            ['MISSING', 'missing'],
            ['ORPHANS', 'orphans'],
            ['SHADOWS', 'shadows'],
            ['TAGS', 'tags'],
            ['TIDDLERS', 'tiddlers'],
          ],
        },
      ],
      previousStatement: 'filter_step',
      nextStatement: 'filter_step',
      colour: 160,
      tooltip: 'A step that retrieves all items in a category',
      helpUrl: '',
    },
    {
      type: 'filter_step',
      message0: '%1[%2]',
      args0: [
        {
          type: 'field_input',
          name: 'OPERATOR',
          // Default text for the input field
          text: 'operator',
        },
        {
          type: 'field_input',
          name: 'PARAM',
        },
      ],
      inputsInline: true,
      previousStatement: 'filter_step',
      nextStatement: 'filter_step',
      colour: 160,
      tooltip: 'Any custom filter operator for a filter step',
      helpUrl: '',
    },
  ]);

  const toolbox = {
    kind: 'flyoutToolbox',
    contents: [
      { kind: 'block', type: 'filter_run' },
      { kind: 'block', type: 'filter_step_all' },
      { kind: 'block', type: 'filter_step' },
    ],
  };

  return toolbox;
}
