<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    svgIcon: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title, svgIcon } = context.props
    const vnodes = []

    if (icon) {
      if (icon === 'svg-icon' && svgIcon) {
        vnodes.push(<svg-icon icon-class={svgIcon}/>)
      } else if (icon.includes('el-icon')) {
        vnodes.push(<i class={[icon, 'sub-el-icon']} />)
      } else {
        vnodes.push(<svg-icon icon-class={icon}/>)
      }
    }

    if (title) {
      vnodes.push(<span slot='title'>{(title)}</span>)
    }
    return vnodes
  }
}
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em !important;
  height: 1em;
}
</style>
