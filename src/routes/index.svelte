<script lang="ts">
  import '../app.css';

  import { fly } from 'svelte/transition';
  import { quintInOut } from 'svelte/easing';
  import { alert } from '$lib/alert';
  import Modal from '$lib/Modal.svelte';
  import Nav from '$lib/Nav.svelte';
  import Toast from '$lib/Toast.svelte';
  import Box from '$lib/Box.svelte';
  import Cross from '$lib/Cross.svelte';

  let isNavOpen = false;
  let isModalOpen = false;
  let animateCubes = false;

  let y: number;
  let cubes = [...Array(10).keys()];

  function toggleNav() {
    isNavOpen = !isNavOpen;
  }

  function toggleModal() {
    isModalOpen = !isModalOpen;
  }

  function toggleAlert() {
    alert.set({
      isActive: true,
      text: 'Our new alert',
    });
  }
</script>

<!-- Fade - opacticy 0 - 1 -->
<!-- Blur - opacticy and blur -->
<!-- Fly - x and y along with opacity -->
<!-- Slide - height -->
<!-- Scale - start: scale, opactiy -->
<!-- Draw - draw svgs -->

<svelte:window bind:scrollY={y} />

{#if isNavOpen}
  <Nav {toggleNav} />
{/if}

<main>
  <button on:click={toggleNav}>Menu</button>
  <button on:click={toggleAlert}>Alert</button>
  <button on:click={toggleModal}>Modal</button>
  <button on:click={() => (animateCubes = !animateCubes)}>Animate Cubes</button>

  <Box />

  <Cross />
  {#if animateCubes}
    <div class="grid">
      {#each cubes as _cube, i}
        <div
          transition:fly={{
            y: 100,
            duration: 2000,
            delay: i * 100,
            easing: quintInOut,
          }}
          class="box"
        />
      {/each}
    </div>
  {/if}
</main>

<Toast />

{#if isModalOpen}
  <Modal {toggleModal}>
    <p>This is in the modal</p>
    <button>Do something</button>
  </Modal>
{/if}

<style>
  .hidden {
    opacity: 0;
    transition: 0.3s ease opacity;
  }

  .card {
    transition: 0.3s ease opacity;
  }

  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }

  .box {
    background: var(--primary);
    box-shadow: var(--level-2);
    height: 100px;
    width: 100px;
  }

  .grid {
    --gridCols: 5;
    gap: 20px;
  }
</style>
