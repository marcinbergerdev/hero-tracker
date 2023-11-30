<template>
  <BaseButton class="hamburger">
    <span class="hamburger__box">
      <span class="hamburger__box-line"></span>
    </span>
  </BaseButton>
</template>

<script setup lang="ts">
import BaseButton from '../cards/BaseButton.vue';
</script>

<style scoped lang="scss">
.hamburger {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem 0;
  background-color: transparent;
  border: 0;

  &__box {
    position: relative;
    display: block;
    width: 2.5rem;
    height: 2rem;

    &-line {
      position: absolute;
      top: 0;
      left: 0;

      display: block;
      width: 100%;
      height: 0.2rem;
      background-color: var(--text-clr);
      transition: all 0.3s ease-in-out;

      &::before,
      &::after {
        content: "";
        position: absolute;
        display: block;
        width: 100%;
        height: 0.2rem;
        background-color: inherit;
        transition: all 0.3s ease-in-out;
      }

      &::before {
        top: 9px;
        right: 0;
      }

      &::after {
        top: 18px;
        left: 0;
      }
    }
  }

  @media (min-width: 768px) {
    display: none;
  }
}

.isActive {
  .hamburger {
    &__box {
      &-line {
        transform: translateY(9px) rotate(-45deg);
        transition: all 0.3s 0.1s ease-in-out;

        &::before {
          opacity: 0;
          transition: all 0.3s ease-in-out;
        }

        &::after {
          transform: translateY(-18px) rotate(-90deg);
          transition: all 0.3s ease-in-out;
        }
      }
    }
  }
}
</style>
