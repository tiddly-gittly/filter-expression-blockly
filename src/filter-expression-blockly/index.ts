import { widget as Widget } from '$:/core/modules/widgets/widget.js';
import { IChangedTiddlers } from 'tiddlywiki';
import './index.css';

import * as Blockly from 'blockly/core';

import * as En from 'blockly/msg/en';
import * as ZhHans from 'blockly/msg/zh-hans';

class FilterExpressionBlocklyWidget extends Widget {
  refresh(_changedTiddlers: IChangedTiddlers) {
    return false;
  }

  private editTitle: string | undefined;
  private editField: string | undefined;

  render(parent: Element, nextSibling: Element) {
    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();
    const containerElement = $tw.utils.domMaker('div', {
      class: 'tc-filter-expression-blockly-widget',
    });
    parent.insertBefore(containerElement, nextSibling);
    const languageCode = this.wiki.filterTiddlers('[[$:/language]get[text]get[name]else[en-GB]]')?.[0];
    if (languageCode === 'zh-Hans') {
      Blockly.setLocale(ZhHans);
    } else {
      Blockly.setLocale(En);
    }

    Blockly.defineBlocksWithJsonArray([
      {
        type: 'filter_expression',
        message0: '[%1]',
        args0: [
          {
            type: 'input_statement',
            name: 'FILTER_STEPS',
          },
        ],
        output: null,
        colour: 230,
        tooltip: 'Construct TiddlyWiki filter expression',
        helpUrl: '',
      },
      {
        type: 'filter_step',
        message0: '%1[%2]',
        args0: [
          {
            type: 'input_value',
            name: 'NAME',
          },
          {
            type: 'input_value',
            name: 'PARAM',
          },
        ],
        output: null,
        colour: 160,
        tooltip: 'A step in the filter expression',
        helpUrl: '',
      },
    ]);

    const toolbox = {
      // There are two kinds of toolboxes. The simpler one is a flyout toolbox.
      kind: 'flyoutToolbox',
      // The contents is the blocks and other items that exist in your toolbox.
      contents: [
        {
          kind: 'block',
          type: 'filter_expression',
        },
        {
          kind: 'block',
          type: 'filter_step',
        },
        // You can add more blocks to this array.
      ],
    };

    const workspace = Blockly.inject(containerElement, { horizontalLayout: true, toolbox });
    this.domNodes.push(containerElement);
  }

  onSave = (newText: string): void => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!this.editTitle) {
      return;
    }
    const field = this.editField ?? 'text';
    const previousText = $tw.wiki.getTiddler(this.editTitle)?.fields?.[field] as string | undefined ?? '';
    // prevent useless call to addTiddler
    if (previousText === newText) {
      return;
    }
    $tw.wiki.setText(this.editTitle, field, undefined, newText);
  };

  execute() {
    this.editTitle = this.getAttribute('tiddler', this.getVariable('currentTiddler'));
    this.editField = this.getAttribute('field', 'text');
  }
}

declare let exports: {
  FilterExpressionBlockly: typeof FilterExpressionBlocklyWidget;
};
exports.FilterExpressionBlockly = FilterExpressionBlocklyWidget;
