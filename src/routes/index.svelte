<script lang='ts'>
	import { Canvas, OrthographicCamera } from 'svelte-cubed';
	import Shader from '$lib/Shader.svelte';
	import { Vector2 } from 'three';
import { onMount } from 'svelte';
import { browser } from '$app/env';

	let interpolation = 0

	const start = new Date().getTime()
	setInterval(() => {
		interpolation = Math.sin((new Date().getTime() - start)/1000)/2 + 0.5
	}, 10)

	let innerHeight: number
	let innerWidth: number

	let zoom = 0.2

	$: resolution = { value: new Vector2(
		innerWidth * zoom,
		innerHeight * zoom,
	)}
	
	$: center = { value: new Vector2(0.5 / zoom, 0.5 / zoom) }

	$: console.log({
		resolution, center
	});
</script>

<svelte:head>
	<title> k over </title>
</svelte:head>

<svelte:window bind:innerHeight bind:innerWidth/>

<Canvas pixelRatio={window.devicePixelRatio}>
	<OrthographicCamera position={[0, 0, 1]} />

	<Shader fragmentShaderPath='inversions.frag' uniforms={{
		interpolation: { value: interpolation },
		grid: { value: {
			size: 120,
			distance: 0.2,
			thickness: 0.002,
		}},
		center,
		resolution
	}}/>
</Canvas>

<input type='range' bind:value={interpolation} max=1 min=0 step={0.001}>

<style>
	input {
		position: absolute;
	}
</style>