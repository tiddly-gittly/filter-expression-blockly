import { widget as Widget } from '$:/core/modules/widgets/widget.js';
import { IChangedTiddlers } from 'tiddlywiki';
import './index.css';

import * as Blockly from 'blockly/core';

import * as En from 'blockly/msg/en';
import * as ZhHans from 'blockly/msg/zh-hans';
import { getBlocks } from './blocks';

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

    const workspace = Blockly.inject(containerElement, { horizontalLayout: true, toolbox: getBlocks() });
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
