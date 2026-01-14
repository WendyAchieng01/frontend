<template>
  <div
    class="mt-15"
    style="background-color: #7e90b4; padding-top: 130px; padding-bottom: 130px"
  >
    <p class="text-h4 text-capitalize text-center text-white">
      Where skills meet hire
    </p>
    <p class="text-caption text-center mt-5 text-white">
      Do you need amazing talents for hire or are you a freelancer with <br />
      amazing skills to offer?
    </p>
    <div class="d-flex mt-5 justify-center">
      <v-btn
        text="Let's Get Started"
        size="x-large"
        variant="elevated"
        class="text-subtitle-1 font-weight-bold"
        width="250"
        :to="{ path: '/auth/register' }"
      />
    </div>
  </div>
</template>
