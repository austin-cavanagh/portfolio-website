import { useMemo } from 'react';
import { BufferGeometry, LineBasicMaterial, Vector3, Line } from 'three';

function generateEllipseVertices(
  semiMajorAxis: number,
  eccentricity: number,
  segments: number,
) {
  const c = semiMajorAxis * eccentricity;
  const points = [];

  for (let i = 0; i <= segments; i++) {
    const angle = (i * 2 * Math.PI) / segments;
    const x = semiMajorAxis * Math.cos(angle) - c;
    const y =
      semiMajorAxis *
      Math.sqrt(1 - eccentricity * eccentricity) *
      Math.sin(angle);
    points.push(new Vector3(x, 0, y));
  }

  return points;
}

type OrbitPathProps = {
  semiMajorAxis: number;
  eccentricity: number;
  segments?: number;
};

function OrbitPath({
  semiMajorAxis,
  eccentricity,
  segments = 64,
}: OrbitPathProps) {
  const points = useMemo(
    () => generateEllipseVertices(semiMajorAxis, eccentricity, segments),
    [semiMajorAxis, eccentricity, segments],
  );

  const lineGeometry = useMemo(
    () => new BufferGeometry().setFromPoints(points),
    [points],
  );
  const lineMaterial = useMemo(
    () => new LineBasicMaterial({ color: 0xffffff }),
    [],
  );

  return <primitive object={new Line(lineGeometry, lineMaterial)} />;
}

export default OrbitPath;
