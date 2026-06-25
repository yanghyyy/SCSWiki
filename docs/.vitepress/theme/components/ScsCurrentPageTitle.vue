<script setup lang="ts">
import { computed } from 'vue';
import { useData } from 'vitepress';

const { frontmatter, page, site } = useData();

const currentTitle = computed(() => {
  const title = frontmatter.value.title || page.value.title;

  if (!title) {
    return site.value.title;
  }

  for (const separator of [' | ', '｜', ' - ']) {
    const suffix = `${separator}${site.value.title}`;

    if (title.endsWith(suffix)) {
      return title.slice(0, -suffix.length);
    }
  }

  return title;
});
</script>

<template>
  <span class="scs-current-page-title">{{ currentTitle }}</span>
</template>
