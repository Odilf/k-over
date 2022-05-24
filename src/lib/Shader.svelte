<script lang="ts">
	import { Vector2, ShaderMaterial, PlaneGeometry } from 'three'
	import { Mesh } from 'svelte-cubed'
	import { browser } from '$app/env';
import type { IUniform } from 'three';

	async function getFile(filename: string): Promise<string> {
		if (!browser || !filename) return ''
		const response = await fetch(filename)
		return await response.text()
	}

	export let fragmentShaderPath: string

	export let uniforms: { [uniform: string]: IUniform<any> } | undefined = undefined; 

	export let interpolation: number = 0

	$: fragmentShaderPromise = getFile(fragmentShaderPath)

	let time = 0.0

	setInterval(() => time += 0.01, 10)
	
</script>

{#await fragmentShaderPromise}
	Loading
{:then fragmentShader} 
	<Mesh geometry={new PlaneGeometry(2, 2)} material={new ShaderMaterial({
		uniforms,

		fragmentShader,
	})}/>
{/await}