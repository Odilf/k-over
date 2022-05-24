struct Grid {
	int size;
	float distance;
	float thickness;
};

uniform float interpolation;
uniform int gridSize;
uniform vec2 center;
uniform Grid grid;
uniform vec2 resolution;

bool isGrid(vec2 pos) {
	for (int i = -grid.size; i < grid.size; i++) {
		float d = grid.distance * float(i);
		if (pos.x < d + grid.thickness && pos.x > d - grid.thickness) {
			return true;
		}

		if (pos.y < d + grid.thickness && pos.y > d - grid.thickness) {
			return true;
		}
	}

	return false;
}

bool isCircle(vec2 pos, vec2 center, float r, float thickness) {
	float d = distance(pos, center);

	return d < r + thickness/2.0 && d > r - thickness/2.0;
}

vec2 invert(vec2 pos) {
	float d = length(pos);
	float factor = 1.0 / d;
	// float factor = d;	

	return mix(pos, normalize(pos) * factor, interpolation);
}

void main() {
	vec2 st = gl_FragCoord.xy/resolution;

	vec2 pos = st - center;

	pos = invert(pos);


	// Main circle
	if (isCircle(pos, vec2(0.0, 0.0), 1.0, 0.01)) {
		gl_FragColor = vec4(0.0, 0.5, 1.0, 1.0);
	} else

	// Inner green circle
	if (isCircle(pos, vec2(0.5, 0.0), 0.2, 0.01)) {
		gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
	} else 
	// Outer red circle
	if (isCircle(pos, vec2(1.5, 0.0), 0.2, 0.01)) {
		gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
	} else

	// Origin circle
	if (isCircle(pos, vec2(0.0, 1.0), 1.0, 0.01)) {
		gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
	} else

	// Grid
	if (isGrid(pos)) {
		gl_FragColor = vec4(0.0, sin(pos.y)/2.0 + 0.5, cos(pos.x)/2.0 + 0.5, 0.5);
	} else {
		gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
	}
}