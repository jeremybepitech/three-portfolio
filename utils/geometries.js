// Geometries.js
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';




class Geometries {
    static createFlatArrow(length = 1, width = 0.3, headLength = 0.2, headWidth = 0.4) {
        // Créer la géométrie du corps (rectangle)
        const bodyGeometry = new THREE.BoxGeometry(
            length - headLength, // longueur
            width,              // largeur
            0.01                // épaisseur (très fine pour être plate)
        );

        // Décaler le corps pour que l'origine soit à la base de la flèche
        bodyGeometry.translate((length - headLength) / 2, 0, 0);
        bodyGeometry.rotateX(Math.PI / 2); // Tourner le rectangle pour qu'il soit plat

        // Créer la géométrie du triangle
        const shape = new THREE.Shape();
        shape.moveTo(0, 1);    // Sommet 1
        shape.lineTo(-1, -1);  // Sommet 2
        shape.lineTo(1, -1);   // Sommet 3
        shape.closePath();     // Fermer le chemin

        // Options pour l'extrusion
        const extrudeSettings = {
        depth: 0.5, // Épaisseur du triangle
        bevelEnabled: false, // Pas de chanfrein
        };

        // Créer une géométrie extrudée
        const headGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        headGeometry.rotateX(Math.PI / 2); // Tourner le triangle pour qu'il soit plat
        headGeometry.rotateY(Math.PI / 2); // Tourner le triangle pour qu'il soit dans le bon sens
        headGeometry.translate(length - headLength / 2, 0, 0);

        const nonIndexedBody = bodyGeometry.toNonIndexed();
        const nonIndexedHead = headGeometry.toNonIndexed();

        // Fusionner les deux géométries
        const mergedGeometry = mergeGeometries([nonIndexedBody, nonIndexedHead], false);


        return mergedGeometry;
    }


    // Pas sûr que ça fonctionne
    static mergeBufferGeometries(geometries) {
        // Calculer la taille totale des attributs
        let verticesCount = 0;
        let indexCount = 0;
        
        geometries.forEach(geometry => {
            verticesCount += geometry.attributes.position.count;
            if (geometry.index) {
                indexCount += geometry.index.count;
            }
        });

        // Créer les tableaux pour la nouvelle géométrie
        const mergedPositions = new Float32Array(verticesCount * 3);
        const mergedNormals = new Float32Array(verticesCount * 3);
        const mergedUvs = new Float32Array(verticesCount * 2);
        const mergedIndices = new Uint32Array(indexCount);

        let vertexOffset = 0;
        let indexOffset = 0;

        // Fusionner les géométries
        geometries.forEach(geometry => {
            // Copier les positions
            mergedPositions.set(geometry.attributes.position.array, vertexOffset * 3);
            
            // Copier les normales s'il y en a
            if (geometry.attributes.normal) {
                mergedNormals.set(geometry.attributes.normal.array, vertexOffset * 3);
            }
            
            // Copier les UVs s'il y en a
            if (geometry.attributes.uv) {
                mergedUvs.set(geometry.attributes.uv.array, vertexOffset * 2);
            }
            
            // Copier et décaler les indices
            if (geometry.index) {
                const indices = geometry.index.array;
                for (let i = 0; i < indices.length; i++) {
                    mergedIndices[indexOffset + i] = indices[i] + vertexOffset;
                }
                indexOffset += indices.length;
            }
            
            vertexOffset += geometry.attributes.position.count;
        });

        // Créer la nouvelle géométrie
        const mergedGeometry = new THREE.BufferGeometry();
        mergedGeometry.setAttribute('position', new THREE.BufferAttribute(mergedPositions, 3));
        mergedGeometry.setAttribute('normal', new THREE.BufferAttribute(mergedNormals, 3));
        mergedGeometry.setAttribute('uv', new THREE.BufferAttribute(mergedUvs, 2));
        mergedGeometry.setIndex(new THREE.BufferAttribute(mergedIndices, 1));

        return mergedGeometry;
    }
}

export default Geometries;