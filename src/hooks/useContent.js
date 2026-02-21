import { useLang } from './useLang';

// English content
import aboutEn from '../content/aboutme.json';
import itEn from '../content/it.json';
import actorEn from '../content/actor.json';
import photographyEn from '../content/photography.json';
import itExpEn from '../content/it-experience.json';
import itSkillsEn from '../content/it-skills.json';
import itEduEn from '../content/it-education.json';
import actorAvEn from '../content/actor-av.json';
import actorTheatreEn from '../content/actor-theatre.json';
import blogIndexData from '../content/blog-index.json';

// Blog posts (English)
const blogPostsEn = import.meta.glob('../content/blog/*.json', { eager: true, import: 'default' });
// Blog posts (Finnish)
const blogPostsFi = import.meta.glob('../content/blog/fi/*.json', { eager: true, import: 'default' });

function indexPosts(modules) {
  const posts = {};
  for (const [, data] of Object.entries(modules)) {
    if (data && data.slug) posts[data.slug] = data;
  }
  return posts;
}

// Finnish content
import aboutFi from '../content/fi/aboutme.json';
import itFi from '../content/fi/it.json';
import actorFi from '../content/fi/actor.json';
import photographyFi from '../content/fi/photography.json';
import itExpFi from '../content/fi/it-experience.json';
import itSkillsFi from '../content/fi/it-skills.json';
import itEduFi from '../content/fi/it-education.json';
import actorAvFi from '../content/fi/actor-av.json';
import actorTheatreFi from '../content/fi/actor-theatre.json';

// UI strings
import uiStrings from '../content/ui-strings.json';

const content = {
  en: {
    about: aboutEn,
    it: itEn,
    actor: actorEn,
    photography: photographyEn,
    tables: {
      it: [itExpEn, itSkillsEn, itEduEn],
      actor: [actorAvEn, actorTheatreEn],
    },
    blog: {
      index: blogIndexData.en,
      posts: indexPosts(blogPostsEn),
    },
  },
  fi: {
    about: aboutFi,
    it: itFi,
    actor: actorFi,
    photography: photographyFi,
    tables: {
      it: [itExpFi, itSkillsFi, itEduFi],
      actor: [actorAvFi, actorTheatreFi],
    },
    blog: {
      index: blogIndexData.fi,
      posts: indexPosts(blogPostsFi),
    },
  },
};

export function useContent() {
  const { lang } = useLang();
  return content[lang] || content.en;
}

export function useUI() {
  const { lang } = useLang();
  return uiStrings[lang] || uiStrings.en;
}
