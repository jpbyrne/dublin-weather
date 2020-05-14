<script>
  export let data = [];

  const columns = 19;
  const diameter = 1 / columns;
  const radius = diameter / 2;
  const strokeWidth = 0.001;
  const scale = 4;

  let rain = data.map(datum => datum.rain);
  const min = Math.min(...rain);
  const max = Math.max(...rain);
  rain = rain.map((drop, index) => ({
    x: index * diameter % 1 + radius,
    y: Math.floor(index / columns) * diameter + radius,
    size: ((drop - min) / (max - min)) * (radius - (strokeWidth * 2)) * scale ,
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
    />
  {/each}
</svg>

<style>
  svg {
    width: 100%;
    height: 100%;
  }

  circle {
    fill: transparent;
    stroke: #4FACFE;
    animation: scale-up 2s ease-in-out;
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
