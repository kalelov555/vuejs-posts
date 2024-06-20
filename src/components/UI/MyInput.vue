<template>
  <input :value="modelValue" type="text" @input="updateValue" />
</template>

<script>
export default {
  name: "my-input",
  props: {
    modelValue: [String, Number],
  },
  methods: {
    updateValue(e) {
      this.$emit("update:modelValue", e.target.value);
    },
  },
};
</script>

<style></style>
