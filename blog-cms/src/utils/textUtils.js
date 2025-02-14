const settings = require('@/settings')

/**
 * 检查字符是否是特殊内容的开始
 * @param {string} content - 内容
 * @param {number} pos - 当前位置
 * @returns {{isStart: boolean, type: string}} 是否是特殊内容的开始及类型
 */
function checkSpecialContentStart(content, pos) {
    if (pos + 1 < content.length && content[pos] === '!' && content[pos + 1] === '[') {
        return { isStart: true, type: 'image' };
    }
    if (content[pos] === '[') return { isStart: true, type: 'link' };
    if (content[pos] === '#') return { isStart: true, type: 'header' };
    if (content[pos] === '`') return { isStart: true, type: 'code' };
    if (content[pos] === '*') return { isStart: true, type: 'format' };
    if (content[pos] === '_') return { isStart: true, type: 'format' };
    if (content[pos] === '~') return { isStart: true, type: 'format' };
    return { isStart: false, type: null };
}

/**
 * 检查字符是否是特殊内容的结束
 * @param {string} char - 当前字符
 * @returns {boolean} 是否是特殊内容的结束
 */
function isSpecialContentEnd(char) {
    return char === ')' ||  // 链接/图片结束
        char === '\n' || // 标题结束
        char === '`' ||  // 代码结束
        char === '*' ||  // 加粗/斜体结束
        char === '_' ||  // 下划线结束
        char === '~';    // 删除线结束
}

/**
 * 计算文本的实际字数（不包括特殊内容）
 * @param {string} content - 要计算字数的内容
 * @returns {number} 字数统计结果
 */
export function countWords(content) {
    if (!content) return 0;

    let textLength = 0;
    let currentPos = 0;
    let inSpecialContent = false;
    let inImageLink = false;

    while (currentPos < content.length) {
        const { isStart, type } = checkSpecialContentStart(content, currentPos);

        if (type === 'image') {
            inImageLink = true;
            currentPos += 2;  // 跳过 ![ 
            continue;
        }

        if (inImageLink) {
            if (content[currentPos] === ')') {
                inImageLink = false;
            }
            currentPos++;
            continue;
        }

        if (isStart) {
            inSpecialContent = true;
        }

        if (inSpecialContent && isSpecialContentEnd(content[currentPos])) {
            inSpecialContent = false;
        }

        if (!inSpecialContent && !inImageLink && !(/\s/.test(content[currentPos]))) {
            textLength++;
        }

        currentPos++;
    }

    return textLength;
}

/**
 * 从文本中截取描述（保留特殊格式但不计入长度）
 * @param {string} content - 要截取描述的内容
 * @returns {string} 截取后的描述
 */
export function extractDescription(content) {
    if (!content) return '';

    const maxLength = settings.blog.descriptionLength;
    let textLength = 0;
    let currentPos = 0;
    let result = '';
    let inSpecialContent = false;

    while (currentPos < content.length) {
        const { isStart } = checkSpecialContentStart(content, currentPos);

        if (isStart) {
            inSpecialContent = true;
        }

        result += content[currentPos];

        if (inSpecialContent && isSpecialContentEnd(content[currentPos])) {
            inSpecialContent = false;
        }

        if (!inSpecialContent) {
            textLength++;
        }

        if (textLength >= maxLength) {
            break;
        }

        currentPos++;
    }

    if (currentPos < content.length) {
        result += '...';
    }

    return result;
} 