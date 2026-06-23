<script setup lang="ts">
import { computed } from 'vue';
import { useData } from 'vitepress';

type Source = {
  name: string;
  url: string;
};

const { frontmatter } = useData();

const contentTypeLabels: Record<string, string> = {
  'official-source': '公开正式来源整理',
  verified: '维护者核验',
  experience: '学生经验',
  archived: '历史归档',
};

const statusLabels: Record<string, string> = {
  draft: '草稿',
  active: '有效',
  'needs-review': '待核验',
  archived: '已归档',
};

const today = new Date().toISOString().slice(0, 10);

const contentType = computed(() => String(frontmatter.value.content_type ?? ''));
const status = computed(() => String(frontmatter.value.status ?? ''));
const sources = computed<Source[]>(() => {
  const value = frontmatter.value.sources;
  return Array.isArray(value) ? value : [];
});
const maintainers = computed(() => {
  const value = frontmatter.value.maintainers;
  return Array.isArray(value) ? value.join('、') : '未填写';
});
const isOutdated = computed(() => {
  const reviewAfter = frontmatter.value.review_after;
  return typeof reviewAfter === 'string' && today > reviewAfter;
});
const needsStatusWarning = computed(() => ['draft', 'needs-review'].includes(status.value));
const isExperience = computed(() => contentType.value === 'experience');
</script>

<template>
  <section class="content-meta" aria-label="内容可信度信息">
    <div class="content-meta__header">
      <span class="content-meta__badge">
        {{ contentTypeLabels[contentType] ?? contentType }}
      </span>
      <span class="content-meta__badge">
        {{ statusLabels[status] ?? status }}
      </span>
    </div>
    <div class="content-meta__body">
      <div class="content-meta__item">
        <strong>最后核验</strong>
        {{ frontmatter.last_verified ?? '未填写' }}
      </div>
      <div class="content-meta__item">
        <strong>建议复核</strong>
        {{ frontmatter.review_after ?? '未填写' }}
      </div>
      <div class="content-meta__item">
        <strong>维护者</strong>
        {{ maintainers }}
      </div>
      <div class="content-meta__item">
        <strong>来源</strong>
        <template v-if="sources.length > 0">
          <a v-for="source in sources" :key="source.url" :href="source.url" rel="noreferrer">
            {{ source.name }}
          </a>
        </template>
        <template v-else>暂无公开来源，需补充核验</template>
      </div>
    </div>
    <div v-if="isOutdated" class="content-meta__warning">
      内容可能已经过期，请优先查看学校或学院最新正式通知。
    </div>
    <div v-if="isExperience" class="content-meta__warning">
      本页属于学生经验，不应视为学校正式规定。
    </div>
    <div v-if="needsStatusWarning" class="content-meta__warning">
      本页处于{{ statusLabels[status] }}状态，内容尚未完成充分核验。
    </div>
  </section>
</template>
