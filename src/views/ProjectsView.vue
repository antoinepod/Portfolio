<script setup lang="ts">
import i18n from '@/i18n';
import { ref, type Ref } from 'vue';
import { useDarkModeStore } from '@/stores/darkMode';

const { tm } = i18n.global;

type Project = {
  title: string;
  description: string;
  tags: string[];
  tech: string[];
  image: string;
}

const loadImages = (projects: Array<Project>) => {
  projects[0].image = useDarkModeStore().isDark ? 'portfolio-dark.png' : 'portfolio.png'
  projects[1].image = 'popsell.png';
  projects[2].image = useDarkModeStore().isDark ? 'aizy-dark.gif' : 'aizy.gif';
  projects[3].image = 'yogamarine.png';
  projects[4].image = 'ifttt.png';
  projects[5].image = 'zodio.png';
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
      tags: loadArray('tags', i),
      tech: loadArray('tech', i),
      image: ''
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
        <div class="tech">
          <span v-for="tech in project.tech">{{ $t(tech) }}</span>
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
    margin: 1rem 0;
    padding: 1rem;
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;
    text-align: justify;
    width: 85%;

    &:nth-child(odd) {
      align-self: flex-start;
    }

    &:nth-child(even) {
      align-self: flex-end;
      flex-direction: row-reverse;

      .tech {
        justify-content: flex-end !important;
      }
    }

    @media screen and (max-width: 767px) {
      flex-direction: column-reverse !important;
      width: 100%;
    }

    .info-container {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      h2 {
        margin: 0;
      }

      .tags {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
        color: var(--color-heading);
        margin: 0.5rem;

        span {
          padding: 0.25rem 0.5rem;
          border: 1px solid var(--color-border-hover);
          border-radius: 0.25rem;
        }
      }

      .tech {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        gap: 0.5rem;

        span {
          padding: 0.25rem 0.5rem;
          border: 1px solid var(--color-border);
          border-radius: 0.25rem;
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