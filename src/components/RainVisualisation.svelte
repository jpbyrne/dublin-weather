<script>
  export let data = [];
  export let onDayEnter = () => {};
  export let onDayLeave = () => {};

  const columns = 19;
  const diameter = 1 / columns;
  const radius = diameter / 2;
  const strokeWidth = 0.004;
  const scale = 4;

  let rain = data.map(datum => datum.rain);
  const min = Math.min(...rain);
  const max = Math.max(...rain);
  rain = rain.map((drop, index) => ({
    x: index * diameter % 1 + radius,
    y: Math.floor(index / columns) * diameter + radius,
    size: ((drop - min) / (max - min)) * (radius - (strokeWidth * 2)) * scale,
    handleEnter: () => onDayEnter(data[index]),
    handleLeave: () => onDayLeave(data[index]),
  }));
</script>

<svg viewBox="0 0 1 1">
  {#each rain as drop}
    <circle
      cx={drop.x}
      cy={drop.y}
      r={drop.size}
      stroke-width={strokeWidth}
      style="transform-origin: {drop.x * 100 + '%'} {drop.y * 100 + '%'}"
      on:mouseenter={drop.handleEnter}
	    on:mouseleave={drop.handleLeave}
    />
  {/each}
</svg>

<style>
  svg {
    width: 100%;
    height: 100%;
    animation: appear 2s linear;
    border-radius: 24px;
		box-shadow: 0px 0px 24px var(--shadow-color);
  }

  circle {
    fill: transparent;
    stroke: #4FACFE;
    animation: scale-up 2s ease-in-out;
  }

  @keyframes appear {
    0% {
      opacity: 0;
      transform: scale(0.9);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes scale-up {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
