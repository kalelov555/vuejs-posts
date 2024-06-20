<template>
  <div v-show="posts.length > 0">
    <h4>Список постов</h4>
    <transition-group name="post-list">
      <post-item
        :key="post.id"
        :post="post"
        v-for="post in posts"
        @remove="$emit('remove', post)"
      />
    </transition-group>
  </div>
  <h4 v-show="posts.length === 0" style="color: red">Этот список пуст</h4>
</template>

<script>
import PostItem from "./PostItem.vue";
export default {
  components: {
    PostItem,
  },
  props: {
    posts: {
      type: Array,
      requred: true,
    },
  },
};
</script>

<style scoped lang="scss">
.post-list {
  &-move,
  &-enter-active,
  &-leave-active {
    transition: all 0.5s ease;
  }
  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
  &-leave-active {
    position: absolute;
  }
}
</style>
