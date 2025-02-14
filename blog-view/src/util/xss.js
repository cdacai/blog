import xss from 'xss'

const options = {
  whiteList: {
    a: ['href', 'title', 'target', 'rel'],
    img: ['src', 'alt'],
    p: [],
    div: [],
    span: [],
    br: [],
    strong: [],
    em: [],
    i: [],
    b: []
  },
  stripIgnoreTag: true,
  stripIgnoreTagBody: ['script']
}

export function filterXSS(content) {
  return xss(content, options)
} 