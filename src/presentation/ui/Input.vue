<script setup lang="ts">
import { computed, toRefs } from 'vue';

export interface InputProps {
    label?: string;
    placeholder?: string;
    modelValue?: string;
}
const emit = defineEmits(['update:modelValue']);
const props = defineProps<InputProps>();
const { label } = toRefs(props);

const value = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
})

</script>

<template>
    <span class="flex flex-col w-full">
        <label v-if="label" class="w-full">{{ label }}</label>
        <input 
        v-model="value"
        :placeholder="placeholder" 
        type="text"
        class="w-full py-2 px-3 rounded-md border border-terciary/30 focus:-outline-offset-4 focus:outline focus:outline-secondary-400/40 focus:border-secondary-400"
        >
    </span>
</template>