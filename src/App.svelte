<script>
	import Rain from './components/RainVisualisation.svelte';
	import Sun from './components/SunVisualisation.svelte';
	import Wind from './components/WindVisualisation.svelte';
	export let name;

	const fetchData = (async () => {
		const response = await fetch('data.json')
		return await response.json()
	})();
</script>

<main>
	<h1>Dublin Rain in 2019</h1>

	<article>
		{#await fetchData}
			<!-- fetching -->
		{:then data}
			<Rain data={data} />
		{:catch error}
			{error}
		{/await}
	</article>
</main>

<style>
	main {
		overflow: hidden;
		width: 100%;
		height: 100%;
	}

	h1 {
		position: absolute;
		bottom: 36px;
		width: 100%;
		margin: 0;
		text-align: center;
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