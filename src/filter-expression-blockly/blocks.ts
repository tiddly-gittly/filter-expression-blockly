import * as Blockly from 'blockly/core';
import '@blockly/toolbox-search';

export function getBlocks() {
  Blockly.defineBlocksWithJsonArray([
    {
      type: 'filter_run',
      message0: 'Run %1[\n%2]',
      args0: [
        {
          type: 'field_dropdown',
          name: 'PREFIX',
          options: [
            ['', ''],
            [':all', ':all'],
            [':cascade', ':cascade'],
            [':else', ':else'],
            [':filter', ':filter'],
            [':intersection', ':intersection'],
            [':map', ':map'],
            [':reduce', ':reduce'],
            [':sort', ':sort'],
            [':then', ':then'],
          ],
        },
        {
          type: 'input_statement',
          name: 'FILTER_STEPS',
          check: ['filter_step', 'all_filter_step'],
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
      type: 'all_filter_step',
      message0: 'all [%1]',
      args0: [
        {
          type: 'field_dropdown',
          name: 'CATEGORY',
          options: [
            ['current', 'current'],
            ['missing', 'missing'],
            ['orphans', 'orphans'],
            ['shadows', 'shadows'],
            ['tags', 'tags'],
            ['tiddlers', 'tiddlers'],
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
    {
      type: 'list_widget',
      message0: '<$list\nfilter=%1\n',
      args0: [
        {
          type: 'input_statement',
          name: 'FILTER_RUNS',
          check: 'filter_run',
        },
      ],
      message1: 'limit=%1\ntemplate=%2\neditTemplate=%3\njoin=%4\nvariable=%5\ncounter=%6\nemptyMessage=%7\nstoryview=%8\nhistory=%9\n>',
      args1: [
        {
          type: 'field_number',
          name: 'LIMIT',
          value: 10, // Default value
        },
        {
          type: 'field_input',
          name: 'TEMPLATE',
          text: '',
        },
        {
          type: 'field_input',
          name: 'EDIT_TEMPLATE',
          text: '',
        },
        {
          type: 'field_input',
          name: 'JOIN',
          text: '',
        },
        {
          type: 'field_input',
          name: 'VARIABLE',
          text: 'currentTiddler', // Default variable name
        },
        {
          type: 'field_input',
          name: 'COUNTER',
          text: '',
        },
        {
          type: 'field_input',
          name: 'EMPTY_MESSAGE',
          text: 'No items found', // Default message
        },
        {
          type: 'field_input',
          name: 'STORYVIEW',
          text: '',
        },
        {
          type: 'field_input',
          name: 'HISTORY',
          text: '',
        },
      ],
      inputsInline: true,
      previousStatement: ['widget'],
      nextStatement: ['widget'],
      colour: 160,
      tooltip: 'The list widget displays a sequence of tiddlers that match a tiddler filter',
      helpUrl: '',
    },
  ]);

  const toolbox = {
    kind: 'categoryToolbox',
    contents: [
      {
        kind: 'category',
        name: 'General',
        expanded: true,
        contents: [
          { kind: 'block', type: 'filter_run' },
          { kind: 'block', type: 'filter_step' },
        ],
      },
      {
        kind: 'category',
        name: 'Filter Steps',
        contents: [
          { kind: 'block', type: 'all_filter_step' },
        ],
      },
      {
        kind: 'category',
        name: 'Widgets',
        contents: [
          { kind: 'block', type: 'list_widget' },
        ],
      },
      {
        kind: 'search',
        name: 'Search',
        contents: [],
      },
    ],
  };

  return toolbox;
}
