<template>
  <select @change="changeOptions">
    <option value="" :disabled="modelValue !== ''">
      Выберите фильтр из списка
    </option>
    <option :key="option.value" :value="option.value" v-for="option in options">
      {{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: "my-select",
  props: {
    modelValue: {
      type: String,
    },
    options: {
      type: Array,
      default: () => [],
      requred: true,
    },
  },
  methods: {
    changeOptions(e) {
      this.$emit("update:modelValue", e.target.value);
    },
  },
};
</script>

<style></style>
