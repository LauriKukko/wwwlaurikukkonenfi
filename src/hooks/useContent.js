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
