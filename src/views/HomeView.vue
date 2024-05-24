<script setup lang="ts">
import AnimatedRouterLink from '@/components/AnimatedRouterLink.vue';
</script>

<template>
  <div class="home">
    <div class="presentation">
      <img class="photo-cv" src="@/assets/images/photo_cv.png" alt="Antoine Podvin" />
      <div class="title-text">
        <h2>{{ $t('home.presentation.title') }}</h2>
        <h4>{{ $t('home.presentation.subtitle') }}</h4>
      </div>
    </div>
    <h4 class="welcome-text" v-html="$t('home.welcome-to-my-portfolio')"></h4>
    <div class="details">
      <div class="about-me">
        <h3>{{ $t('home.about-me.title') }}</h3>
        <p>{{ $t('home.about-me.description') }}</p>
        <div class="view-more">
          <font-awesome-icon class="info-icon" icon="circle-info" />
          <AnimatedRouterLink class="router-link" to="/about">{{ $t('buttons.view-more') }}</AnimatedRouterLink>
        </div>
      </div>
      <div class="projects">
        <h3>{{ $t('home.projects.title') }}</h3>
        <p>{{ $t('home.projects.description') }}</p>
        <div class="view-more">
          <font-awesome-icon class="info-icon" icon="circle-info" />
          <AnimatedRouterLink class="router-link" to="/projects">
            {{ $t('buttons.view-more') }}
          </AnimatedRouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  .presentation {
    display: flex;
    justify-content: center;
    align-items: center;

    .photo-cv {
      width: 50dvw;
      max-width: 30rem;
      border-radius: 10%;
      object-fit: cover;
      margin: auto 2rem;
    }

    .title-text {
      width: 33dvw;
      text-align: left;

      h4 {
        margin: 2rem 0;
        color: var(--color-text);
        text-align: right;
      }
    }

    @media screen and (max-width: 767px) {
      flex-direction: column-reverse;

      .photo-cv {
        margin: 0 15dvw;
        margin-top: 2rem;
      }

      .title-text {
        width: 90dvw;

        h4 {
          margin: 1rem 0;
        }
      }
    }
  }

  .welcome-text {
    margin: 4rem 0;

    @media screen and (max-width: 767px) {
      margin: 2rem 0;
    }
  }

  .details {
    display: flex;
    justify-content: space-between;
    width: 80%;
    margin: 1rem auto;
    text-align: justify;

    .about-me,
    .projects {
      width: 45%;
    }

    .view-more {
      float: right;
      margin-right: 0.5rem;

      .info-icon {
        margin-right: 0.3rem;
        color: var(--color-heading);
      }

      .router-link {
        font-size: larger;
        color: var(--color-heading);
      }
    }

    @media screen and (max-width: 767px) {
      flex-direction: column;
      width: 90%;

      .about-me {
        width: 100%;
        margin-bottom: 2rem;
      }

      .projects {
        width: 100%;
      }
    }
  }
}
</style>
