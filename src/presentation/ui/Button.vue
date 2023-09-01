<script setup lang="ts">
import { computed, toRefs } from "vue";
export interface ButtonProps {
  label: string;
  disabled?: boolean;
  buttonStyle?: "main" | "secondary";
}

const props = withDefaults(defineProps<ButtonProps>(), {
  buttonStyle: "main",
});
const { label, buttonStyle, disabled } = toRefs(props);

const emit = defineEmits(["buttonClick"]);

const colorStyles = computed(() => {
  let style = "";
  style +=
    buttonStyle.value == "main"
      ? "bg-secondary-500 text-primary border-transparent "
      : "bg-primary text-secondary-500 border-secondary-500 ";

  if (!disabled.value) {
    style += buttonStyle.value == "main"
    ? "focus:outline-primary "
    : "focus:outline-secondary-500 focus:border-transparent ";
  }
  return style;
});

const disableTab = computed(() => {
  return disabled.value ? -1 : 0;
})
const disabledStyle = computed(() => {
  return disabled.value
    ? "opacity-40 cursor-default"
    : "hover:shadow-md hover:translate-y-[-2px] active:translate-y-[2px] active:shadow-none active:before:bg-black/20";
});

function onClick() {
  if (disabled.value) return;
  emit("buttonClick");
}
</script>
<template>
  <button
    :class="[colorStyles, disabledStyle]"
    class="relative rounded-md px-3 py-2 border shadow-sm overflow-hidden transition-[shadow,_transform,_color,_outline-color,_opacity] outline outline-2 -outline-offset-4 outline-transparent before:transition-[background-color] before:contents before:inset-0 before:absolute before:bg-transparent"
    @click="onClick"
    :tabindex="disableTab"
  >
    {{ label }}
  </button>
</template>
