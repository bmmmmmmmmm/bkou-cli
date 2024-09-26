import { _log } from '../../utils';

const _countWords = (text = process.argv[3] || '') => {
  /**
   * 截至 2023-10-14 日报计数规则如下：
   * 1. 字符不算
   * 2. 中文按字数计算
   * 3. 英文与数字混合计算，以空格分割
   */

  try {
    // 统计中文字数
    let chineseCount = 0;
    const chinesePattern = /[\u4e00-\u9fa5]/g;
    const chineseMatches = text.match(chinesePattern);
    if (chineseMatches) {
      chineseCount = chineseMatches.length;
    }

    // 统计英文与数字
    let englishCount = 0;
    const englishPattern = /[a-zA-Z0-9]+/g;
    const englishMatches = text.match(englishPattern);
    if (englishMatches) {
      englishCount = englishMatches.length;
    }

    const count = chineseCount + englishCount;

    return count
  } catch (err) {
    throw new Error(`>> Failed to count <<\n${err}\nEND__: >> Failed to count <<`);
  }
}

const countWords = (params) => {
  try {
    const count = _countWords(params);
    _log(`Total words: ${count}`);
  } catch (err) {
    _log(err, 'red');
  }
}

export { _countWords, countWords }
