<script setup lang="ts">
import i18n from '@/i18n';
import { ref, type Ref } from 'vue';

const { tm } = i18n.global;

type Project = {
  title: string;
  description: string;
  tags: string[];
  tech: string[];
  image: string;
}

const loadArray = (arrayName: string, i: string): Array<string> => {
  const tags = Array<string>();
  for (let j in tm(`projects.list[${i}].${arrayName}`) as unknown as Array<Object>) {
    tags.push(`projects.list[${i}].${arrayName}[${j}]`);
  }
  return tags;
}

const loadProjects = (): Array<Object> => {
  const projects = Array<Project>();
  for (let i in tm('projects.list') as unknown as Array<Object>) {
    projects.push({
      title: `projects.list[${i}].title`,
      description: `projects.list[${i}].description`,
      tags: loadArray('tags', i),
      tech: loadArray('tech', i),
      image: `projects.list[${i}].image`
    });
    console.log(projects);
  }
  return projects;
}

const projects: Ref<Array<Object>> = ref(loadProjects());
</script>

<template>
  <h2>{{ $t('projects.title') }}</h2>

  <div class="projects">
    <div class="project" v-for="project in projects">
      <div class="info-container">
        <h2>{{ $t((project as Project).title) }}</h2>
        <p>{{ $t((project as Project).description) }}</p>
        <div class="tags">
          <span v-for="tag in (project as Project).tags">{{ $t(tag) }}</span>
        </div>
        <div class="tech">
          <span v-for="tech in (project as Project).tech">{{ $t(tech) }}</span>
        </div>
      </div>
      <img :src="`/logos/${$t((project as Project).image)}`" :alt="$t((project as Project).title)" />
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
    width: 80%;

    &:nth-child(odd) {
      align-self: flex-start;
    }

    &:nth-child(even) {
      align-self: flex-end;
      flex-direction: row-reverse;
    }

    @media screen and (max-width: 767px) {
      flex-direction: column !important;
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
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        gap: 0.5rem;
        margin-top: 0.5rem;

        span {
          padding: 0.25rem 0.5rem;
          border: 1px solid var(--color-border);
          border-radius: 0.25rem;
        }
      }

      .tech {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        gap: 0.5rem;
        margin-top: 0.5rem;

        span {
          padding: 0.25rem 0.5rem;
          border: 1px solid var(--color-border);
          border-radius: 0.25rem;
        }
      }
    }

    img {
      width: 35rem;
      object-fit: cover;
      max-width: 100%;
      max-height: 20rem;
      border-radius: 0.5rem;
      margin: auto;
    }
  }
}
</style>