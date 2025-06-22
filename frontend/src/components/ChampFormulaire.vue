<template>
  <div>
    <label :for="name" class="block text-sm font-medium mb-1">{{
      label
    }}</label>
    <input
      :id="name"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :required="required"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="w-full border-2 border-black rounded-md px-3 py-2 focus:outline-none"
    />
  </div>
</template>

<script setup>
defineProps({
  modelValue: String,
  label: String,
  name: String,
  type: {
    type: String,
    default: "text",
  },
  placeholder: String,
  autocomplete: String,
  required: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["update:modelValue"]);
</script>
