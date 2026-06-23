import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';
import ContentMeta from './components/ContentMeta.vue';
import './custom.css';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ContentMeta', ContentMeta);
  },
} satisfies Theme;
