<script setup lang="ts">
import i18n from '@/i18n';
import { ref, type Ref } from 'vue';
import { useDarkModeStore } from '@/stores/darkMode';

const { tm } = i18n.global;

type Link = {
  name: string;
  url: string;
}

type Project = {
  title: string;
  description: string;
  details: string[];
  tags: string[];
  tech: string[];
  image: string;
  links: Link[];
}

const loadImages = (projects: Array<Project>) => {
  projects[0].image = useDarkModeStore().isDark ? 'portfolio-dark.png' : 'portfolio.png'
  projects[1].image = 'popsell.png';
  projects[2].image = useDarkModeStore().isDark ? 'aizy-dark.gif' : 'aizy.gif';
  projects[3].image = 'yogamarine.png';
  projects[4].image = 'r-type.png';
  projects[5].image = 'ifttt.png';
  projects[6].image = 'zodio.png';
}

const loadLinks = (i: string): Array<Link> => {
  const links = Array<Link>();
  for (let j in tm(`projects.list[${i}].links`) as unknown as Array<Object>) {
    links.push({
      name: `projects.list[${i}].links[${j}].name`,
      url: `projects.list[${i}].links[${j}].url`
    });
  }
  return links;
}

const loadArray = (arrayName: string, i: string): Array<string> => {
  const tags = Array<string>();
  for (let j in tm(`projects.list[${i}].${arrayName}`) as unknown as Array<Object>) {
    tags.push(`projects.list[${i}].${arrayName}[${j}]`);
  }
  return tags;
}

const loadProjects = (): Array<Project> => {
  const projects = Array<Project>();
  for (let i in tm('projects.list') as unknown as Array<Object>) {
    projects.push({
      title: `projects.list[${i}].title`,
      description: `projects.list[${i}].description`,
      details: loadArray('details', i),
      tags: loadArray('tags', i),
      tech: loadArray('tech', i),
      image: '',
      links: loadLinks(i)
    });
    console.log(projects);
  }
  loadImages(projects);
  return projects;
}

const projects: Ref<Array<Project>> = ref(loadProjects());

import { watch } from 'vue';

watch(() => useDarkModeStore().isDark, () => {
  loadImages(projects.value);
});
</script>

<template>
  <h2>{{ $t('projects.title') }}</h2>

  <div class="projects">
    <div class="project" v-for="project in projects">
      <div class="info-container">
        <h2>{{ $t(project.title) }}</h2>
        <div class="tags">
          <span v-for="tag in project.tags">{{ $t(tag) }}</span>
        </div>
        <p>{{ $t(project.description) }}</p>
        <ul>
          <li v-for="detail in project.details">{{ $t(detail) }}</li>
        </ul>
        <div class="tech">
          <span v-for="tech in project.tech">{{ $t(tech) }}</span>
        </div>
        <div class="links">
          <a class="button" v-for="link in project.links" :href="$t(link.url)" target="_blank">{{ $t(link.name) }}</a>
        </div>
      </div>
      <img :src="`/logos/${(project.image)}`" :alt="$t(project.title)" />
    </div>
  </div>
</template>

<style scoped lang="scss">
h2 {
  margin: 2rem 0;
  text-align: center;
}

.projects {
  display: flex;
  flex-direction: column;

  .project {
    display: flex;
    margin: 1rem;
    padding: 1.5rem 2rem;
    border: 1px solid var(--color-border);
    border-radius: 1rem;
    box-shadow: 0 0 0.5rem var(--color-border);
    text-align: justify;
    width: 80%;

    &:nth-child(odd) {
      align-self: flex-start;
    }

    &:nth-child(even) {
      align-self: flex-end;
      flex-direction: row-reverse;
    }

    @media screen and (max-width: 767px) {
      flex-direction: column-reverse !important;
      width: 100%;
      margin: 1rem auto;
      padding: 1.5rem;

      h2 {
        text-align: center;
        margin: auto !important;
      }

      .tags,
      .tech,
      .links {
        justify-content: center !important;
      }
    }

    .info-container {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      align-items: flex-start;

      h2 {
        margin: 0;
      }

      .tags {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        gap: 0.5rem;
        color: var(--color-heading);
        margin: 0.5rem 0;
        width: 100%;

        span {
          padding: 0.25rem 0.5rem;
          border: 1px solid var(--color-border-hover);
          border-radius: 0.5rem;
        }
      }

      .tech {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        gap: 0.5rem;
        width: 100%;

        span {
          padding: 0.25rem 0.5rem;
          border: 1px solid var(--color-border);
          border-radius: 0.5rem;
        }
      }

      .links {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        gap: 0.5rem;
        width: 100%;
        margin-top: 0.5rem;

        @media screen and (max-width: 767px) {
          margin-top: 1rem;
        }

        a {
          text-decoration: none;
          margin: 0;
        }
      }
    }

    img {
      height: auto;
      width: 35rem;
      object-fit: contain;
      max-width: 100%;
      max-height: 20rem;
      border-radius: 0.5rem;
      margin: auto;
      padding: 2rem 4rem;
    }
  }
}
</style>