
import {
  deepMerge,
  createContentDomStyle,
  isIE,
  isFF
} from "../util";
// scrollContent
export default  {
  name: "scrollContent",
  functional: true,
  render(h, {props, slots}) {
    let style = deepMerge(props.state.style, {});
    style.position = "relative";
    style.minHeight = "100%";
    style.minWidth = "100%";
    if(isIE) {
      style.display = "inline-block";
    } else if (isFF) {
      style.width = "-moz-fit-content";
    } else {
      style.width = "fit-content";
    }
    if(props.ops.padding) {
      style[props.ops.paddPos] =  props.ops.paddValue;
    }
    // create style in <style> level
    createContentDomStyle();

    return h(props.ops.tag, {
      style: style,
      ref: "scrollContent",
      class: "vuescroll-content",
      props: props.ops.props,
      attrs: props.ops.attrs
    }, slots().default);
  },
  props: {
    ops: {
      default() {
        /* istanbul ignore next */
        return {

        };
      }
    },
    state: {
      default() {
        /* istanbul ignore next */
        return {

        };
      }
    }
  }
};

/**
 * create scroll content
 * 
 * @param {any} size 
 * @param {any} vm 
 * @returns 
 */
export function createContent(h, vm) {
  // scrollContent data
  const scrollContentData = {
    props: {
      ops: vm.mergedOptions.scrollContent,
    }
  };
  return (
    <scrollContent
      {...scrollContentData}
    >
      {[vm.$slots.default]}
    </scrollContent>
  );
}