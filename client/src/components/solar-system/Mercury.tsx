import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader, Mesh } from 'three';
import mercuryColor from '../../assets/planets/mercury/mercury-color.jpg';
import mercuryBump from '../../assets/planets/mercury/mercury-bump.jpg';

function Mercury() {
  const planetRef = useRef<Mesh>(null!);
  const colorTexture = useLoader(TextureLoader, mercuryColor);
  const bumpTexture = useLoader(TextureLoader, mercuryBump);

  const orbitRadius = 0;
  const orbitSpeed = 0;
  const position: [number, number, number] = [0, 0, 0];

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    if (planetRef.current) {
      planetRef.current.position.x =
        Math.cos(elapsedTime * orbitSpeed) * orbitRadius;
      planetRef.current.position.z =
        Math.sin(elapsedTime * orbitSpeed) * orbitRadius;
    }
  });

  return (
    <mesh ref={planetRef} position={position}>
      <sphereGeometry args={[10, 50, 50]} />
      <meshStandardMaterial
        map={colorTexture}
        bumpMap={bumpTexture}
        bumpScale={1}
      />
    </mesh>
  );
}

export default Mercury;
