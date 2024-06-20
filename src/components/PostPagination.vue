<template>
  <div class="pagination__wrapper">
    <my-button @click="handlePrevPage" class="pagination__arrow">{{
      "<"
    }}</my-button>
    <h3>{{ modelValue }} / {{ totalPages }}</h3>
    <my-button @click="handleNextPage" class="pagination__arrow">{{
      ">"
    }}</my-button>
  </div>
</template>

<script>
import MyButton from "./UI/MyButton.vue";
export default {
  components: { MyButton },
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    totalPages: {
      type: String,
      default: 10,
    },
  },
  methods: {
    handlePrevPage() {
      this.$emit(
        "update:modelValue",
        this.modelValue === 1 ? 1 : this.modelValue - 1
      );
    },
    handleNextPage() {
      this.$emit(
        "update:modelValue",
        this.modelValue === this.totalPages
          ? this.totalPages
          : this.modelValue + 1
      );
    },
  },
};
</script>

<style scoped lang="scss">
.pagination {
  &__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
