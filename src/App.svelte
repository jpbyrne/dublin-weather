<script>
	import Rain from './components/RainVisualisation.svelte';
	import Sun from './components/SunVisualisation.svelte';
	import Wind from './components/WindVisualisation.svelte';
	import { getFormattedDateString } from './utils';

	const fetchData = (async () => {
		const response = await fetch('data.json');
		return await response.json();
	})();

	let dateString = '';
	const handleDayEnter = day => dateString = getFormattedDateString(new Date(day));
	const handleDayLeave = () => dateString = '';
</script>

<main>
	<aside>{dateString}</aside>

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

	<h1>Dublin Rain in 2019</h1>
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

	aside {
		top: 48px;
	}

	h1 {
		bottom: 36px;
	}

	article {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 480px;
		height: 480px;
		border-radius: 24px;
		box-shadow: 0px 0px 24px var(--shadow-color);
	}
</style>