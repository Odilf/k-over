<script lang='ts'>
	import { Canvas, OrthographicCamera } from 'svelte-cubed';
	import Shader from '$lib/Shader.svelte';
	import { Vector2 } from 'three';

	let interpolation = 0

	const start = new Date().getTime()
	setInterval(() => {
		interpolation = Math.sin((new Date().getTime() - start)/1000)/2 + 0.5
	}, 10)
</script>

<svelte:head>
	<title> k over </title>
</svelte:head>

<Canvas>
	<OrthographicCamera position={[0, 0, 1]} />
	<Shader fragmentShaderPath='inversions.frag' uniforms={{
		interpolation: { value: interpolation },
		grid: { value: {
			size: 120,
			distance: 0.1,
			thickness: 0.002,
		}},
		center: { value: new Vector2(2.2, 1.5) },
		resolution: { value: new Vector2(300, 300)}
	}}/>
</Canvas>

<input type='range' bind:value={interpolation} max=1 min=0 step={0.001}>

<style>
	input {
		position: absolute;
	}
</style>