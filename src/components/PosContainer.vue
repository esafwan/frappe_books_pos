<template>
  <div class="flex bg-gray-25 PosContainer">
    <div class="flex flex-1 flex-col">
      <!-- Page Header (Title, Buttons, etc) -->
      <PageHeader :title="title" :border="false" :searchborder="searchborder">
        <slot name="header" />
      </PageHeader>

      <!-- Invoice Form -->
      <div
        class="
          flex 
          flex-col 
          bg-white 
          pos_container
          PosContainer
        "
      >
        <slot name="body" />
      </div>
    </div>

    <!-- Invoice Quick Edit -->
    <slot name="quickedit" />
  </div>
</template>
<script>
import PageHeader from './PageHeader.vue';
export default {
  components: { PageHeader },
  props: {
    title: { type: String, default: '' },
    searchborder: { type: Boolean, default: true },
  },
};
</script>
