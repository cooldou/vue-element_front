// 判断是否叶子节点
const isLeaf = (data, prop) => {
  return !(Array.isArray(data[prop]) && data[prop].length > 0)
}

// 创建 node 节点
export const renderNode = (h, data, context, number) => {
  const {props} = context
  const itemClass = props.itemClass ? props.itemClass + `-${number}` : ''
  const cls = ['org-tree-node', itemClass]
  const childNodes = []
  const children = data[props.props.children]

  if (isLeaf(data, props.props.children)) {
    cls.push('is-leaf')
  } else if (props.collapsable && !data[props.props.expand]) {
    cls.push('collapsed')
  }

  childNodes.push(renderLabel(h, data, context, number))

  if (!props.collapsable || data[props.props.expand]) {
    childNodes.push(renderChildren(h, children, context, number += 1))
  }

  return h('div', {
    domProps: {
      className: cls.join(' ')
    }
  }, childNodes)
}

// 创建 label 节点
export const renderLabel = (h, data, context, number) => {
  const {props} = context
  const label = data[props.props.label]
  const renderContent = props.renderContent
  const clickHandler = context.listeners['on-node-click']

  const childNodes = []
  if (typeof renderContent === 'function') {
    let vnode = renderContent(h, data)

    vnode && childNodes.push(vnode)
  } else {
    childNodes.push(label)
  }

  const pulicClass = props.itemClass ? props.itemClass : ''
  const itemClass = pulicClass + `-label-inner-${number}`
  const cls = ['org-tree-node-label-inner', pulicClass, itemClass]
  let {labelWidth, labelClassName} = props

  if (typeof labelWidth === 'number') {
    labelWidth += 'px'
  }
  if (typeof labelClassName === 'function') {
    labelClassName = labelClassName(data)
  }
  labelClassName && cls.push(labelClassName)

  let _this = context.parent
  let _header = _this.$slots.header

  return h('div', {
    domProps: {
      className: 'org-tree-node-label' + ' ' + `${pulicClass}-label-${number}`
    }
  }, [
      h(
        'div',
        {
          domProps: {
            className: cls.join(' ')
          },
          style: {width: labelWidth},
          on: {
            click: e => clickHandler && clickHandler(e, data)
          }
        },
        _header ? [
          _this.$slots.default,
          h('div', _header)
        ] : childNodes
      )
    ])
}

// 创建 node 子节点
export const renderChildren = (h, list, context, number) => {
  if (Array.isArray(list) && list.length) {
    const children = list.map(item => {
      return renderNode(h, item, context, number)
    })
    const {props} = context
    const itemClass = props.itemClass ? props.itemClass + `-children-${number}` : ''

    return h('div', {
      domProps: {
        className: 'org-tree-node-children' + ' ' + itemClass
      }
    }, children)
  }
  return ''
}

export const render = (h, context) => {
  const {props} = context

  return renderNode(h, props.data, context, 0)
}

export default render
