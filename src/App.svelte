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
	{#await fetchData}
		<p>fetching</p>
	{:then data}
		<Rain data={data} />
	{:catch error}
		{error}
	{/await}
</main>

<style>

</style>