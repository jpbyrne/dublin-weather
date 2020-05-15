<script>
	import Rain from './components/RainVisualisation.svelte';
	import Sun from './components/SunVisualisation.svelte';
	import Wind from './components/WindVisualisation.svelte';
	import { getFormattedDateString } from './utils';

	const fetchData = (async () => {
		const response = await fetch('data.json');
		return await response.json();
	})();

	let dateHover = false;
	let dateString = '';
	const handleDayEnter = date => {
		dateHover = true;
		dateString = `${date.rain}mm | ${getFormattedDateString(new Date(date.date))}`;
	}
	const handleDayLeave = () => dateHover = false;
</script>

<main>
	<h1>Dublin Rain in 2019</h1>

	<article>
		{#await fetchData}
			<!-- fetching -->
		{:then data}
			<Rain
				data={data}
				onDayEnter={handleDayEnter}
				onDayLeave={handleDayLeave}
			/>
		{:catch error}
			{error}
		{/await}
	</article>

	<aside class:active={dateHover}>
		{dateString}
	</aside>
</main>

<style>
	main {
		overflow: hidden;
		width: 100%;
		height: 100%;
	}

	h1, aside {
		position: absolute;
		width: 100%;
		text-align: center;
	}

	h1 {
		bottom: 36px;
		animation: appear 2s;
		font-size: 32px;
	}

	aside {
		top: 48px;
		opacity: 0;
		transition: opacity 1s;
		font-size: 21px;
	}

	aside.active {
		opacity: 1;
		transition: opacity 1s;
	}

	article {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 480px;
		height: 480px;
		transition-property: width, height;
		transition-duration: 350ms;
	}

	@media(max-width: 500px) {
		article {
			width: 320px;
			height: 320px;
		}
  }

	@keyframes appear {
		0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
	}
</style>