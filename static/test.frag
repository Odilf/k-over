uniform float time;
uniform vec2 resolution;

void main() {
	vec2 st = gl_FragCoord.xy/resolution;

	gl_FragColor = vec4(st.x, st.y, 0.0, 1.0);
}